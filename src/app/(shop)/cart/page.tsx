import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";




export default function CartPage() {



  // si no hay nada en el carrito 
  // redirect("/empty");

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">
        <Title title='Carrito' subtitle='Todos los productos' className='mb-2' />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continua comprando
            </Link>


            {/* items */}
            {/* aca si no hago esta condicion de loading al comienzo del componente ProductsInCart me da un error porque lo que se genera del lado del servidor no es lo mismo que se genera del lado del cliente */}
            <ProductsInCart />

          </div>

          {/* Checkout - Resumen del pedido */}

          <div className="bg-white  rounded-xl shadow-xl p-7 h-fit ">
            <h2>Resumen de orden</h2>
            <OrderSummary />

            <div className="mt-5 mb-2 w-full">
              <Link className="flex btn-primary justify-center" href="/checkout/address">Checkout</Link>
            </div>



          </div>

        </div>
      </div>

    </div>
  );
}