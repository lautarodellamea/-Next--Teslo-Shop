'use client'

import Link from 'next/link'
import { useCartStore, useUIStore } from '@/store'
import { titleFont } from '@/config/fonts'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  // aca ejecuto la funcion getTotalItems() del store
  const totalItemsInCart = useCartStore((state) => state.getTotalItems())

  // usaremos esto para evitar usar el skipHydration en el store
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
  }, [])


  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* Logo */}
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span className={`${titleFont.className} antialiased font-bold`}>
            | Shop
          </span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/men'
        >
          Hombres
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/women'
        >
          Mujeres
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/kid'
        >
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className='flex items-center'>
        <Link href='/search' className='mx-2'>
          <IoSearchOutline className='w-5 h5' />
        </Link>

        <Link href={(totalItemsInCart === 0) && isLoading ? '/empty' : '/cart'} className='mx-2'>
          <div className='relative'>
            {
              (isLoading && totalItemsInCart > 0) && (
                <span className='fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
                  {totalItemsInCart}
                </span>
              )
            }

          </div>
          <IoCartOutline className='w-5 h5' />
        </Link>

        <button
          onClick={openSideMenu}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Menú
        </button>
      </div>
    </nav>
  )
}
