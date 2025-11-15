'use client'

import { useCart } from '@/context/CartContext'
import { ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const CartDropdown = () => {
  const { items, removeItem, totalItems, totalPrice } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-black"
      >
        <ShoppingCart size={20} />
        <span className="text-xs font-bold">{totalItems}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-14 w-80 rounded-lg border border-white/20 bg-black p-4 text-blue-50 shadow-lg z-50">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-general text-sm uppercase">Carrinho</h3>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-sm opacity-60">Seu carrinho está vazio.</p>
          ) : (
            <>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} x{item.qty}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-white/20 pt-3 text-right">
                <p className="font-semibold">Total: R$ {totalPrice.toFixed(2)}</p>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                >
                  <button className="mt-2 w-full rounded bg-yellow-300 px-4 py-2 text-black">
                    Finalizar compra
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CartDropdown
