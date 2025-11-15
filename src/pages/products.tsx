'use client'

import NavBar from '@/components/Navbar'
import { useCart } from '@/context/CartContext'

const products = [
  { id: '1', name: 'Mapping Pack 01', price: 129.9 },
  { id: '2', name: 'Loop Pack Psy', price: 89.9 },
  { id: '3', name: 'Visual Pack GOA', price: 149.9 }
]

const ProductsPage = () => {
  const { addItem } = useCart()

  return (
    <main className="min-h-screen bg-black text-blue-50 px-10 py-32">
      <NavBar />
      <h1 className="font-zentry text-5xl mb-10">Produtos</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border border-white/20 p-4"
          >
            <video
              src={`/videos/feature-${p.id}.mp4`}
              autoPlay
              loop
              muted
              playsInline
              className="rounded mb-4"
            />
            <h2 className="font-general text-xl">{p.name}</h2>
            <p className="mt-2">R$ {p.price.toFixed(2)}</p>
            <button
              onClick={() => addItem(p)}
              className="mt-4 w-full rounded bg-yellow-300 px-4 py-2 text-black"
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default ProductsPage
