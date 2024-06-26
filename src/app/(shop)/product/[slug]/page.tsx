export const revalidate = 604800 // 7 dias (60 * 60 * 24 * 7)

import { titleFont } from "@/config/fonts";
import { notFound, redirect } from 'next/navigation';
import { SizeSelector } from '../../../../components/product/size-selector/SizeSelector';
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";



interface Props {
  params: {
    slug: string
  }
}

// metadata dinamica
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: (product?.title ?? "Producto no encontrado"),
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      // images: [], //https://misitioweeb.com/products/prod-1/image.png
      images: [`/products/${product?.images[1]}`],
    },
  }
}


export default async function ProductBySlugPage({ params }: Props) {



  const { slug } = params
  const product = await getProductBySlug(slug)
  // console.log({ product })

  if (!product) {
    return notFound()
  }


  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">

        {/* Desktop Slideshow */}
        <ProductSlideshow title={product.title} images={product.images} className="hidden md:block" />

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow title={product.title} images={product.images} className="block md:hidden" />

      </div>




      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}</p>

        <AddToCart product={product} />

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>

    </div>
  );
}