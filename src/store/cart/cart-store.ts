import { create } from "zustand";
import { CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[]

  getTotalItems: () => number
  getSymmaryInformation: () => {
    itemsInCart: number;
    subsTotal: number;
    tax: number;
    total: number;
  }

  addProdcutToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
}

export const useCartStore = create<State>()(

  // el persist propiamente de zustand se encarga de persistir los datos en localStorage
  // el segundo parametro es el nombre de la persistencia en localStorage 
  persist(

    (set, get) => ({

      cart: [],

      // Methods


      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSymmaryInformation: () => {
        const { cart } = get()

        const subsTotal = cart.reduce((subTotal, product) => (product.quantity * product.price) + subTotal, 0)

        const taxRate = 0.15
        const tax = taxRate * subsTotal
        const total = tax + subsTotal
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

        return { itemsInCart, subsTotal, tax, total }

      },


      addProdcutToCart: (product: CartProduct) => {
        const { cart } = get()

        // aca estamos un paso atras antes de insertarlo
        // console.log({ cart })

        // 1. Revisar si el producto ya existe en el carrito con la talla seleccionada
        // el some verifica con que uno aunque sea exista y despues no evalua mas
        const productInCart = cart.some((
          (item) => (item.id === product.id && item.size === product.size)
        ))

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        // 2. Se que el producto existe por talla, tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity
            }
          }

          return item
        })

        set({ cart: updatedCartProducts })
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {

        const { cart } = get()

        const updatedCartProducts = cart.map((item) => {

          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: quantity
            }
          }
          return item
        })

        set({ cart: updatedCartProducts })

      },


      removeProduct: (product: CartProduct) => {

        const { cart } = get()

        const updatedCartProducts = cart.filter((item) => item.id !== product.id || item.size !== product.size)

        set({ cart: updatedCartProducts })
      }




    }),
    {
      name: 'shopping-cart',
      // podriamos solucionar problemas de hidratacion con esto, pero es tedioso ya que tenemos que mandar a guardar en el localStorage manualmente
      // skipHydration: true,
    }

  )

)
