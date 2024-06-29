'use client'

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { redirect, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const OrderSummary = () => {

  // const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const { itemsInCart, subsTotal, tax, total } = useCartStore(state => state.getSymmaryInformation())


  useEffect(() => {
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (itemsInCart === 0 && isLoading) {
      // router.replace('/empty')
      redirect('/empty')

    }


  }, [itemsInCart, isLoading])


  if (!isLoading) {
    return <p>Cargando...</p>
  }


  return (
    <>
      <div className="grid grid-cols-2">

        <span>No. Productos</span>
        <span className="text-right">{itemsInCart === 1 ? `1 artículo` : `${itemsInCart} artículos`}</span>


        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subsTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right">{`${currencyFormat(total)}`}</span>

      </div>
    </>
  )
}