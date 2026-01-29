'use client'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import SplitFaceHero from '@/components/sections/split-face-hero'
import ProjectsShowcase from '@/components/sections/projects-showcase'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <SplitFaceHero />
        <ProjectsShowcase />
      </main>
      <Footer />
    </>
  )
}
