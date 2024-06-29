'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number

  onQuantityChange: (value: number) => void
}



export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {

  // const [count, setCount] = useState(quantity)

  const onValueChange = (value: number) => {

    if (quantity + value < 1) return

    onQuantityChange(quantity + value)


    // if (count + value < 1) return

    // setCount(count + value)
  }




  return (
    <div className="flex">
      <button onClick={() => onValueChange(-1)}><IoRemoveCircleOutline siize={30} /></button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{quantity}</span>

      <button onClick={() => onValueChange(+1)}><IoAddCircleOutline siize={30} /></button>
    </div>
  )
}