'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Transform for header background opacity
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const headerBorderOpacity = useTransform(scrollY, [0, 100], [0, 1])

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 50)
  })

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const navItems = [
    { href: '/journey', label: 'Journey' },
    { href: '/work', label: 'Work' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-bg-primary/80 backdrop-blur-xl"
        style={{ opacity: headerBgOpacity }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-border"
        style={{ opacity: headerBorderOpacity }}
      />

      {/* Glow Effect on Scroll */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <nav className="relative container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo with 3D hover effect */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/"
            className="text-lg font-serif text-text-primary hover:text-accent transition-colors relative group"
          >
            <span className="relative z-10">Florian Schatz</span>
            <motion.span
              className="absolute -inset-2 bg-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              layoutId="logoGlow"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation with hover effects */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm transition-colors rounded-lg hover:bg-bg-secondary',
                  pathname === item.href ? 'text-text-primary' : 'text-text-secondary hover:text-accent'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-bg-secondary rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4"
          >
            <Link
              href="/contact"
              className="px-4 py-2 text-sm bg-accent text-bg-primary font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              Let's talk
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button with animation */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden w-10 h-10 flex items-center justify-center text-text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded-lg relative"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.div
            animate={mobileMenuOpen ? 'open' : 'closed'}
            className="w-6 h-6 relative"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 },
              }}
              className="absolute top-1 left-0 w-6 h-0.5 bg-current origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="absolute top-3 left-0 w-6 h-0.5 bg-current"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 },
              }}
              className="absolute top-5 left-0 w-6 h-0.5 bg-current origin-center"
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.button>
      </nav>

      {/* Mobile Menu with stagger animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-bg-primary/98 backdrop-blur-xl z-40 md:hidden"
            style={{ top: '64px' }}
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'text-3xl font-serif transition-colors hover:text-accent',
                      pathname === item.href ? 'text-text-primary' : 'text-text-secondary'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="px-8 py-4 text-lg bg-accent text-bg-primary font-medium rounded-lg"
                >
                  Kontakt aufnehmen
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
