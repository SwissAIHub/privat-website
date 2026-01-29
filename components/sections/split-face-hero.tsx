'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import SplitFacePortrait from '@/components/hero/split-face-portrait'

export function SplitFaceHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isReducedMotion, setIsReducedMotion] = useState(false)

    // Scroll-based parallax
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300])

    // Mouse tracking for background parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 30, stiffness: 100 }
    const smoothMouseX = useSpring(mouseX, springConfig)
    const smoothMouseY = useSpring(mouseY, springConfig)

    const bgParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30])
    const bgParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [30, -30])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setIsReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    useEffect(() => {
        if (isReducedMotion) return

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5)
            const y = (e.clientY / window.innerHeight - 0.5)
            mouseX.set(x)
            mouseY.set(y)
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [isReducedMotion, mouseX, mouseY])

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <motion.section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32"
            style={{ opacity: heroOpacity, y: heroY }}
        >
            {/* Animated Background Grid */}
            <motion.div
                className="fixed inset-0 pointer-events-none"
                style={{ y: backgroundY }}
            >
                {/* Primary grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(200, 169, 126, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(200, 169, 126, 0.5) 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Secondary finer grid */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(200, 169, 126, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(200, 169, 126, 0.5) 1px, transparent 1px)
            `,
                        backgroundSize: '12px 12px',
                    }}
                />

                {/* Animated gradient orbs */}
                {!isReducedMotion && (
                    <>
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
                            style={{ x: bgParallaxX, y: bgParallaxY }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
                            style={{
                                x: useTransform(bgParallaxX, v => -v * 1.5),
                                y: useTransform(bgParallaxY, v => -v * 1.5)
                            }}
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </>
                )}

                {/* Radial vignette */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.8) 100%)',
                    }}
                />
            </motion.div>

            {/* Content Container */}
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">

                    {/* Left Column - Text Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.15 } },
                        }}
                        className="order-2 lg:order-1 text-center lg:text-left"
                    >
                        {/* Status Badge */}
                        <motion.div
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary/80 border border-border/50 mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-text-secondary font-mono">
                                Available for Projects
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            variants={fadeInUp}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary mb-6 tracking-tight"
                        >
                            <span className="block">Florian</span>
                            <span className="block text-accent">Schatz</span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl text-text-secondary mb-8 font-light"
                        >
                            AI Implementation
                            <span className="block text-accent/80">Engineering Excellence</span>
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-text-tertiary mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                        >
                            Building intelligent systems for regulated industries.
                            Specialized in compliance automation, AI integration, and
                            scalable architecture.
                        </motion.p>

                        {/* Key Points */}
                        <motion.div
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
                        >
                            {[
                                { label: '10+ Years', desc: 'Industry Experience' },
                                { label: 'AI/ML', desc: 'Implementation' },
                                { label: 'Compliance', desc: 'Regulated Finance' },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-3 bg-bg-secondary/50 rounded-lg border border-border/30"
                                >
                                    <div className="text-accent font-mono text-sm font-semibold">
                                        {item.label}
                                    </div>
                                    <div className="text-text-tertiary text-xs">
                                        {item.desc}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <motion.a
                                href="/work"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-primary font-medium rounded-lg hover:bg-accent/90 transition-colors"
                            >
                                <span>View Projects</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="/contact"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-border text-text-primary font-medium rounded-lg hover:border-accent/50 hover:bg-bg-secondary/50 transition-all"
                            >
                                <span>Get in Touch</span>
                            </motion.a>
                        </motion.div>

                        {/* Location */}
                        <motion.p
                            variants={fadeInUp}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-8 text-sm text-text-tertiary flex items-center gap-2 justify-center lg:justify-start"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Switzerland · Remote Worldwide
                        </motion.p>
                    </motion.div>

                    {/* Right Column - Split Face Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="order-1 lg:order-2 flex justify-center"
                    >
                        <SplitFacePortrait
                            imageSrc="/portrait.jpg"
                            imageAlt="Florian Schatz - AI Engineer Portrait"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {!isReducedMotion && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-2 text-text-tertiary"
                    >
                        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 5v14" />
                            <path d="m19 12-7 7-7-7" />
                        </svg>
                    </motion.div>
                </motion.div>
            )}
        </motion.section>
    )
}

export default SplitFaceHero
