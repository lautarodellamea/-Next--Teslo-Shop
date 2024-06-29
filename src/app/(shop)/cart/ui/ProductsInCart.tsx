'use client'

import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"


export const ProductsInCart = () => {

  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
  const removeProduct = useCartStore(state => state.removeProduct)
  const [isLoading, setIsLoading] = useState(false)
  const productsInCart = useCartStore(state => state.cart)

  useEffect(() => {
    setIsLoading(true)
  }, [])

  if (!isLoading) {
    return <p>Cargando...</p>
  }

  return (
    <>
      {
        productsInCart.map((product) => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <Image
              style={{ width: "100px", height: "100px", objectFit: 'cover' }}
              src={`/products/${product.image}`} alt={product.title} width={100} height={100} className="mr-5 rounded" />
            <div>
              <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}><span className="font-bold">{product.size}</span>- {product.title}</Link>
              {/* <p>{product.title}</p> */}
              <p>${product.price}</p>
              <QuantitySelector onQuantityChange={(quantity) => updateProductQuantity(product, quantity)} quantity={product.quantity} />

              <button onClick={() => removeProduct(product)} className="underline mt-3">Remover</button>
            </div>
          </div>
        ))
      }</>
  )
}