import { gsap } from 'gsap'
import { useState, useRef, useEffect, ReactNode } from 'react'

type VideoPreviewProps = {
  children: ReactNode
}

const VideoPreview = ({ children }: VideoPreviewProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: 'power1.out'
      })

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power1.out'
      })
    }
  }, [isHovering])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current || !contentRef.current || !isHovering) return

    const rect = sectionRef.current.getBoundingClientRect()
    const xOffset = e.clientX - (rect.left + rect.width / 2)
    const yOffset = e.clientY - (rect.top + rect.height / 2)

    gsap.to(sectionRef.current, {
      x: xOffset,
      y: yOffset,
      rotationY: xOffset / 2,
      rotationX: -yOffset / 2,
      transformPerspective: 500,
      duration: 1,
      ease: 'power1.out'
    })

    gsap.to(contentRef.current, {
      x: -xOffset,
      y: -yOffset,
      duration: 1,
      ease: 'power1.out'
    })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{ perspective: '500px' }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </section>
  )
}

export default VideoPreview
