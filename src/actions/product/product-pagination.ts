'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client"


interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1


  try {
    // 1. Obtener los productos
    // aca decimos todos los productos con 2 imagenes y solo de las imagenes el url
    const products = await prisma.product.findMany({
      // cantidad de productos que trae
      take: take,
      // paginacion
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },

      where: {
        gender: gender
      }
    })

    // 2. Obtener total de paginas
    const totalCount = await prisma.product.count({
      where: {
        gender: gender
      }
    })

    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map(product => ({
        ...product,
        images: product.ProductImage.map(image => image.url)
      }))
    }




  } catch (error) {

    throw new Error('Error al obtener los productos')

  }
}