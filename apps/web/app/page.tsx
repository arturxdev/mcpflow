import { Navigation } from '@/components/landing/Navigation'
import { Hero } from '@/components/landing/Hero'
import { PreviewSection } from '@/components/landing/PreviewSection'
import { Features } from '@/components/landing/Features'
import { MCPSection } from '@/components/landing/MCPSection'
import { Pricing } from '@/components/landing/Pricing'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <Hero />
      <PreviewSection />
      <Features />
      <MCPSection />
      <Pricing />
      <Footer />
    </div>
  )
}
