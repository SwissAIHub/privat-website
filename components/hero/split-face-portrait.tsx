'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

interface SplitFacePortraitProps {
    imageSrc: string
    imageAlt: string
}

// Iron Man armor shader effect using CSS filters and canvas
export function SplitFacePortrait({ imageSrc, imageAlt }: SplitFacePortraitProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isReducedMotion, setIsReducedMotion] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [useFallback, setUseFallback] = useState(false)

    // Mouse tracking with spring physics for smooth parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 150 }
    const smoothMouseX = useSpring(mouseX, springConfig)
    const smoothMouseY = useSpring(mouseY, springConfig)

    // Transform values for parallax effects
    const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8])
    const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8])
    const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15])
    const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15])

    // Check for reduced motion preference and mobile
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setIsReducedMotion(mediaQuery.matches)

        const mobileQuery = window.matchMedia('(max-width: 768px) or (pointer: coarse)')
        setIsMobile(mobileQuery.matches)

        const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
        const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)

        mediaQuery.addEventListener('change', handleMotionChange)
        mobileQuery.addEventListener('change', handleMobileChange)

        return () => {
            mediaQuery.removeEventListener('change', handleMotionChange)
            mobileQuery.removeEventListener('change', handleMobileChange)
        }
    }, [])

    // Mouse move handler with throttling
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current || isReducedMotion || isMobile) return

        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const normalizedX = (e.clientX - centerX) / (rect.width / 2)
        const normalizedY = (e.clientY - centerY) / (rect.height / 2)

        mouseX.set(Math.max(-0.5, Math.min(0.5, normalizedX * 0.5)))
        mouseY.set(Math.max(-0.5, Math.min(0.5, normalizedY * 0.5)))
    }, [mouseX, mouseY, isReducedMotion, isMobile])

    // Reset mouse position on leave
    const handleMouseLeave = useCallback(() => {
        mouseX.set(0)
        mouseY.set(0)
    }, [mouseX, mouseY])

    useEffect(() => {
        if (isReducedMotion || isMobile) return

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [handleMouseMove, isReducedMotion, isMobile])

    // Canvas-based Iron Man armor effect
    useEffect(() => {
        if (!canvasRef.current || !imageLoaded || useFallback) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new window.Image()
        img.crossOrigin = 'anonymous'
        img.src = imageSrc

        img.onload = () => {
            try {
                canvas.width = 400
                canvas.height = 500

                // Draw the image
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

                // Get image data for the right half (Iron Man side)
                const imageData = ctx.getImageData(canvas.width / 2, 0, canvas.width / 2, canvas.height)
                const data = imageData.data

                // Apply Iron Man armor effect
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i]
                    const g = data[i + 1]
                    const b = data[i + 2]
                    const brightness = (r + g + b) / 3

                    // Create metallic red/gold armor effect
                    if (brightness > 180) {
                        // Highlights - gold
                        data[i] = Math.min(255, r * 1.3 + 40)     // More red
                        data[i + 1] = Math.min(255, g * 0.9 + 20) // Less green
                        data[i + 2] = Math.min(255, b * 0.3)      // Much less blue
                    } else if (brightness > 100) {
                        // Midtones - metallic red
                        data[i] = Math.min(255, r * 1.2 + 30)
                        data[i + 1] = Math.min(255, g * 0.6)
                        data[i + 2] = Math.min(255, b * 0.4)
                    } else {
                        // Shadows - dark metallic
                        data[i] = Math.min(255, r * 0.8 + 20)
                        data[i + 1] = Math.min(255, g * 0.5)
                        data[i + 2] = Math.min(255, b * 0.3)
                    }

                    // Add metallic sheen
                    const noise = (Math.random() - 0.5) * 15
                    data[i] = Math.max(0, Math.min(255, data[i] + noise))
                    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
                    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
                }

                ctx.putImageData(imageData, canvas.width / 2, 0)
            } catch (err) {
                console.warn('Canvas manipulation failed, using fallback:', err)
                setUseFallback(true)
            }
        }

        img.onerror = () => {
            setUseFallback(true)
        }
    }, [imageSrc, imageLoaded, useFallback])

    // Fallback effect using CSS filters
    const ironManFilter = useFallback
        ? 'contrast(1.3) saturate(1.5) hue-rotate(-15deg) brightness(1.1)'
        : 'none'

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full max-w-[400px] aspect-[4/5] mx-auto"
            style={{
                perspective: 1000,
                willChange: isReducedMotion ? 'auto' : 'transform',
            }}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative w-full h-full"
                style={{
                    rotateX: isReducedMotion ? 0 : rotateX,
                    rotateY: isReducedMotion ? 0 : rotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Glow effect behind portrait */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-red-500/10 to-blue-500/20 rounded-2xl blur-3xl"
                    style={{
                        x: isReducedMotion ? 0 : translateX,
                        y: isReducedMotion ? 0 : translateY,
                    }}
                />

                {/* Main portrait container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50 bg-bg-secondary">
                    {/* Left half - Human/Cyborg side */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 w-1/2 overflow-hidden">
                            <motion.div
                                className="absolute inset-0 w-[200%]"
                                style={{
                                    x: isReducedMotion ? 0 : useTransform(smoothMouseX, [-0.5, 0.5], [5, -5]),
                                }}
                            >
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover object-left"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    priority
                                    onLoad={() => setImageLoaded(true)}
                                />
                                {/* Cyborg overlay - subtle tech lines */}
                                <div
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                        background: `
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        rgba(6, 182, 212, 0.1) 2px,
                        rgba(6, 182, 212, 0.1) 4px
                      )
                    `,
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent" />
                            </motion.div>
                        </div>

                        {/* Right half - Iron Man side */}
                        <div className="absolute inset-0 left-1/2 overflow-hidden">
                            <motion.div
                                className="absolute inset-0 w-[200%] -left-full"
                                style={{
                                    x: isReducedMotion ? 0 : useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]),
                                }}
                            >
                                {useFallback ? (
                                    <>
                                        <Image
                                            src={imageSrc}
                                            alt=""
                                            fill
                                            className="object-cover object-right"
                                            style={{ filter: ironManFilter }}
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                        {/* Iron Man overlay effects */}
                                        <div className="absolute inset-0 bg-gradient-to-l from-red-600/20 via-amber-500/10 to-transparent mix-blend-overlay" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 via-transparent to-red-600/10" />
                                    </>
                                ) : (
                                    <canvas
                                        ref={canvasRef}
                                        className="absolute inset-0 w-full h-full object-cover object-right"
                                        style={{
                                            imageRendering: 'crisp-edges',
                                        }}
                                    />
                                )}

                                {/* Arc reactor glow effect */}
                                <div className="absolute top-1/2 left-1/4 w-16 h-16 -translate-x-1/2 -translate-y-1/2">
                                    <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl animate-pulse" />
                                    <div className="absolute inset-2 bg-cyan-300/50 rounded-full blur-md" />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Center dividing line with glow */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-accent to-transparent">
                        <div className="absolute inset-0 w-full bg-accent/50 blur-sm" />
                    </div>

                    {/* Tech overlay grid */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            backgroundImage: `
                linear-gradient(to right, rgba(200, 169, 126, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(200, 169, 126, 0.3) 1px, transparent 1px)
              `,
                            backgroundSize: '20px 20px',
                        }}
                    />

                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/50" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/50" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/50" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/50" />

                    {/* Scanning line animation */}
                    {!isReducedMotion && (
                        <motion.div
                            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                            animate={{
                                top: ['0%', '100%', '0%'],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    )}
                </div>

                {/* Floating tech elements */}
                {!isReducedMotion && (
                    <>
                        <motion.div
                            className="absolute -right-4 top-1/4 w-2 h-2 bg-accent rounded-full"
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="absolute -left-4 bottom-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full"
                            animate={{
                                y: [0, 10, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.5,
                            }}
                        />
                    </>
                )}
            </motion.div>

            {/* Labels */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-text-tertiary font-mono">
                <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    HUMAN
                </span>
                <span className="flex items-center gap-1">
                    ARMOR
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </span>
            </div>
        </motion.div>
    )
}

export default SplitFacePortrait
