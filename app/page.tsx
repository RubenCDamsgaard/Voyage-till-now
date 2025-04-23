import { Header } from "@/components/header"
import { WarpBackground } from "@/components/warp-background"
import { DirectionalFade } from "@/components/directional-fade"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { ParticlesBackground } from "@/components/magicui/particles-background"
import { TextAnimate } from "@/components/magicui/text-animate"
import Script from "next/script"
import Image from "next/image"
import Link from "next/link"
import { PartnersCarousel } from "@/components/partners-carousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {/* GSAP CDN Scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        strategy="beforeInteractive"
      />

      {/* WarpBackground with slower beams */}
      <WarpBackground
        className="border-none p-0 h-screen"
        gridColor="rgba(192, 192, 192, 0.3)"
        beamsPerSide={4}
        beamSize={5}
        beamDuration={10} // Increased from 3 to 10 for slower movement
        seed={123}
      >
        <div className="container mx-auto px-4">
          {/* Hero Section with centered content using flexbox */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full mb-7 border border-gray-800">
              <span>THE VOYAGE ARISE SITE LIVE NOW</span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>

            <h1 className="font-inter text-6xl md:text-7xl lg:text-8xl mb-12 leading-tight text-gray-100 normal-case font-bold">
              <TextAnimate duration={0.8} staggerDelay={0.03}>
                Transforming
              </TextAnimate>
              <br />
              <TextAnimate duration={0.8} staggerDelay={0.03} delay={0.5}>
                gaming with AI
              </TextAnimate>
            </h1>
          </section>
        </div>
      </WarpBackground>

      {/* Three Containers Section with Particles Background */}
      <section className="relative py-20 overflow-hidden">
        <ParticlesBackground
          className="z-0"
          color="rgba(0,0,0,0)"
          particleColor="rgba(192, 192, 192, 0.5)"
          quantity={50}
          speed={0.5}
          direction="topRight"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative">
            {/* Container 1 - The Voyage: Pathways to Power (Locked) - Fade from left */}
            <DirectionalFade direction="left" distance={100} duration={1.5} delay={0.1}>
              <div className="bgsilver mx-auto transform md:translate-x-8 md:translate-y-4">
                <div className="card flex flex-col items-center text-center relative">
                  <div className="w-24 h-24 bg-gray-800 rounded-full mb-6 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/20 animate-pulse rounded-full"></div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-300 group-hover:text-gray-100 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">The Voyage: Pathways to Power</h3>
                </div>
              </div>
            </DirectionalFade>

            {/* Container 2 with Voyage Arise Logo - Center and in front */}
            <DirectionalFade
              direction="center"
              duration={1.5}
              delay={0.2}
              className="relative"
            >
              <div className="bgsilver mx-auto relative z-20 shadow-2xl glow-effect md:transform md:-translate-y-4">
                <div className="card flex flex-col items-center justify-center text-center py-8">
                  <Image
                    src="/images/voyage-arise-logo.png"
                    alt="Voyage Arise"
                    width={200}
                    height={120}
                    className="max-w-full h-auto"
                  />
                  <div className="mt-6">
                    <Link href="https://alumex.io" target="_blank" rel="noopener noreferrer">
                      <HoverBorderGradient className="font-medium text-sm" containerClassName="mx-auto" duration={1.5}>
                        <TextAnimate duration={0.5} staggerDelay={0.02} className="flex items-center">
                          Check out Voyage Arise now
                          <span className="ml-1 text-silver">→</span>
                        </TextAnimate>
                      </HoverBorderGradient>
                    </Link>
                  </div>
                </div>
              </div>
            </DirectionalFade>

            {/* Container 3 - The Voyage: Online (Locked) - Fade from right */}
            <DirectionalFade direction="right" distance={100} duration={1.5} delay={0.3}>
              <div className="bgsilver mx-auto transform md:-translate-x-8 md:translate-y-4">
                <div className="card flex flex-col items-center text-center relative">
                  <div className="w-24 h-24 bg-gray-800 rounded-full mb-6 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/20 animate-pulse rounded-full"></div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-300 group-hover:text-gray-100 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">The Voyage: Online</h3>
                </div>
              </div>
            </DirectionalFade>
          </div>
        </div>
      </section>

      {/* Add the partners carousel */}
      <PartnersCarousel />
    </main>
  )
}


