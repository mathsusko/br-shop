import { useState, useRef, ReactNode } from 'react'
import { TiLocationArrow } from 'react-icons/ti'

// Tipos
type BentoTiltProps = {
  children: ReactNode
  className?: string
}

type BentoCardProps = {
  src: string
  title: ReactNode
  description?: string
  isComingSoon?: boolean
}

// BentoTilt - SSR-safe
export const BentoTilt = ({ children, className = '' }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState('transform: none')
  const itemRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return

    const { left, top, width, height } = itemRef.current.getBoundingClientRect()
    const relativeX = (event.clientX - left) / width
    const relativeY = (event.clientY - top) / height

    const tiltX = (relativeY - 0.5) * 5
    const tiltY = (relativeX - 0.5) * -5

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    setTransformStyle('transform: none')
  }

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

// BentoCard - SSR-safe
export const BentoCard = ({ src, title, description, isComingSoon }: BentoCardProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [hoverOpacity, setHoverOpacity] = useState(0)
  const hoverButtonRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverButtonRef.current) return
    const rect = hoverButtonRef.current.getBoundingClientRect()
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    })
  }

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHoverOpacity(1)}
            onMouseLeave={() => setHoverOpacity(0)}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px transition-opacity duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">fale conosco</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Features - SSR-safe
const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">Processo de contratação</p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Para garantir a perfeição técnica e artística que nossos projetos exigem, todo o
          processo de contratação é centralizado diretamente conosco. Isso evita ruídos de
          comunicação e garante que todos os detalhes — desde especificações de projetores
          até demandas elétricas — sejam tratados com precisão. Agências são bem-vindas no
          processo, desde que sigam exatamente as orientações fornecidas. Nosso foco é
          eliminar erros e entregar uma experiência visual impecável.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={<>passo 1</>}
          description="descricao do processo 1"
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={<>passo 2</>}
            description="descricao do processo 2"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/hero-3.mp4"
            title={<>passo 3</>}
            description="descricao do processo 3"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/hero-2.mp4"
            title={<>passo 4</>}
            description="descricao do processo 4"
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              veja meu portifolio
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/hero-1.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
)

export default Features
