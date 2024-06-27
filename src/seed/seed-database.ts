// aca sembraremos la base de datos de acuerdo a mi seed

import { initialData } from "./seed";
import prisma from '../lib/prisma';




async function main() {

  // 1. borrar registros previos
  // ejecutamos todas de manera simultanea y esperamos el resultado 
  // Al final no lo hacemoso simultaneamente por que si intentamos eliminar primero las categoria antes de que los productos o imagenes hayan sido eliminadas, se lanzara un error porque un producto depende de una categoria entonces no puedo borrar las categorias porque este quedaria huerfano y la base de datos me diria que eso no se puede hacer
  // await Promise.all([
  await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany()
  // ])

  const { categories, products } = initialData

  // Categorias
  const categoriesData = categories.map(category => ({
    name: category
  }))

  await prisma.category.createMany({
    data: categoriesData
  })


  // obtengo todas las categorias de mi base de datos
  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);
  // el segundo argumento que se le pasa al reduce es el estado inicial <string=shirt, string=categoryID>
  // la primera iteracion el acumulador (map) es el objeto vacio, llega la otra iteracion tenemos la categoria con id y name de la base de datos crea la llave y valor, y asi por cada categoria que tenga
  // console.log(categoriesMap)

  // Productos
  const { images, type, ...product1 } = products[0]
  // await prisma.product.create({
  //   data: {
  //     ...product1,
  //     categoryId: categoriesMap['shirts']
  //   }
  // })


  // no hace falta que este codigo sea ultraeficiente ya que lo ejecutaremos una vez al momento de recrear la base de datos en modo desarrollo (NO EN PRODUCCION)
  products.forEach(async (product) => {
    const { images, type, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    // Images
    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })
  })








  console.log('Seed ejecutado correctamente');
}


(() => {

  // el script del seed es destrictuvo ya que borra la base de datos y la siembra por decirlo de una manera
  // por eso verificamos que si estamos en produccion no haga nada
  if (process.env.NODE_ENV === 'production') return



  main()
})()