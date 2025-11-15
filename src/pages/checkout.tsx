'use client'

import { useCart } from '@/context/CartContext'
import NavBar from '@/components/Navbar'
import { useState } from 'react'

const CheckoutPage = () => {
  const { items, totalPrice } = useCart()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      customer: form,
      items,
      total: totalPrice,
      status: 'pending'
    }

    // Enviar para Strapi (endpoint /orders)
    await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: payload })
    })

    alert('Pedido recebido! Em breve entraremos em contato.')
  }

  return (
    <main className="min-h-screen bg-black text-blue-50 px-10 py-32">
      <NavBar />
      <h1 className="font-zentry text-5xl mb-10">Checkout</h1>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Resumo do pedido */}
        <div>
          <h2 className="font-general text-2xl mb-4">Resumo do pedido</h2>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between"
              >
                <span>
                  {item.name} x{item.qty}
                </span>
                <span>R$ {(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total: R$ {totalPrice.toFixed(2)}</p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Nome completo"
            required
            className="w-full rounded border border-white/20 bg-transparent px-4 py-2"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            required
            className="w-full rounded border border-white/20 bg-transparent px-4 py-2"
            onChange={handleChange}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Telefone"
            required
            className="w-full rounded border border-white/20 bg-transparent px-4 py-2"
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Endereço"
            required
            className="w-full rounded border border-white/20 bg-transparent px-4 py-2"
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="city"
              placeholder="Cidade"
              required
              className="w-full rounded border border-white/20 bg-transparent px-4 py-2"
              onChange={handleChange}
            />
            <input
              name="zip"
              placeholder="CEP"
              required
              className="w-full rounded border border-white/20 bg-transparent px-4 py-2"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-yellow-300 px-6 py-3 text-black font-semibold"
          >
            Finalizar pedido
          </button>
        </form>
      </div>
    </main>
  )
}

export default CheckoutPage
