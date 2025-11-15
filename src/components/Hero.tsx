import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { TiLocationArrow } from 'react-icons/ti'
import { useEffect, useRef, useState } from 'react'

import Button from './Button'
import VideoPreview from './VideoPreview'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [hasClicked, setHasClicked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState(0)

  const totalVideos = 4
  const nextVdRef = useRef<HTMLVideoElement>(null)

  const handleVideoLoad = () => setLoadedVideos((p) => p + 1)

  useEffect(() => {
    if (loadedVideos >= totalVideos) setLoading(false)
  }, [loadedVideos])

  // Fallback: garante que o loader suma após 5 segundos
  useEffect(() => {
    const fallback = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(fallback)
  }, [])

  const handleMiniVdClick = () => {
    setHasClicked(true)
    setCurrentIndex((p) => (p % totalVideos) + 1)
  }

  useGSAP(
    () => {
      if (!hasClicked) return
      gsap.set('#next-video', { visibility: 'visible' })
      gsap.to('#next-video', {
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => nextVdRef.current?.play()
      })
      gsap.from('#current-video', {
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut'
      })
    },
    { dependencies: [hasClicked], revertOnUpdate: true }
  )

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
      borderRadius: '0% 0% 40% 10%'
    })
    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0% 0% 0% 0%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true
      }
    })
  })

  const getVideoSrc = (i: number) => `/videos/hero-${i}.mp4`

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <VideoPreview>
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVdRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                playsInline
                preload="auto"
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
                onError={handleVideoLoad}
              />
            </div>
          </VideoPreview>
        </div>

        <video
          ref={nextVdRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          playsInline
          preload="auto"
          id="next-video"
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
          onError={handleVideoLoad}
        />

        <video
          src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
          onError={handleVideoLoad}
        />

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          <b>A</b>GENCI<b>A</b>
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              VJ V<b>A</b>C<b>A</b>O
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              16 anos + <br /> Em projeções
            </p>
            <Button
              id="watch-trailer"
              title="Contratar"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        <b>A</b>GENCI<b>A</b>
      </h1>
    </div>
  )
}

export default Hero
