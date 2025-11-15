'use client'

import clsx from 'clsx'
import gsap from 'gsap'
import { useWindowScroll } from 'react-use'
import { useEffect, useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

import CartDropdown from './CartDropdown'

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Produtos', href: '/products' }
]

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isIndicatorActive, setIsIndicatorActive] = useState(false)

  const audioElementRef = useRef<HTMLAudioElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)

  const { y: currentScrollY } = useWindowScroll()
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev)
    setIsIndicatorActive((prev) => !prev)
  }

  useEffect(() => {
    if (!audioElementRef.current) return
    isAudioPlaying ? audioElementRef.current.play() : audioElementRef.current.pause()
  }, [isAudioPlaying])

  useEffect(() => {
    if (!navContainerRef.current) return

    if (currentScrollY === 0) {
      setIsNavVisible(true)
      navContainerRef.current.classList.remove('floating-nav')
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false)
      navContainerRef.current.classList.add('floating-nav')
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true)
      navContainerRef.current.classList.add('floating-nav')
    }

    setLastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    if (!navContainerRef.current) return
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2
    })
  }, [isNavVisible])

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Link href="/">
              <img
                src="/img/logo.png"
                alt="logo"
                className="w-10 cursor-pointer"
              />
            </Link>
          </div>

          <div className="flex h-full items-center gap-6">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-hover-btn"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <CartDropdown />

            <button
              onClick={toggleAudioIndicator}
              className="flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx('indicator-line', { active: isIndicatorActive })}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default NavBar
