"use client"

import Image from "next/image"
import { SilverGradientText } from "./silver-gradient-text"

export function PartnersCarousel() {
  // Create placeholder images
  const logos = [
    "/images/partner1.png",
    "/images/partner2.png",
    "/images/partner3.png",
    "/images/partner4.png",
    "/images/partner5.png",
    "/images/partner6.png",
    "/images/partner7.png",
  ]
  
  // Duplicate for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos]
  
  return (
    <section className="py-16 bg-black/50 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold overflow-visible inline-block">
          <SilverGradientText duration={1} staggerDelay={0.04}>
            Our Partners
          </SilverGradientText>
        </h2>
      </div>
      
      {/* Centered container with mask for fade effect */}
      <div 
        className="w-[85vw] md:w-[50vw] mx-auto overflow-hidden pointer-events-none partner-carousel-container mask-gradient-mobile md:mask-gradient-desktop"
      >
        <div 
          className="flex items-center justify-center carousel-scroll"
          style={{ 
            width: '200%',
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 mx-4 md:mx-12"
              style={{ 
                width: "100px", 
                height: "60px"
              }}
            >
              <div className="bg-gray-800/40 rounded-lg p-2 md:p-4 flex items-center justify-center h-full">
                <div 
                  className="w-full h-full rounded flex items-center justify-center text-white font-medium"
                  style={{ 
                    background: `hsl(${(index * 40) % 360}, 70%, 60%)`,
                    position: 'relative'
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs md:text-base">
                    Partner {index % logos.length + 1}
                  </span>
                  <Image
                    src={logo}
                    alt={`Partner ${index % logos.length + 1}`}
                    width={90}
                    height={45}
                    className="max-w-full max-h-full object-contain opacity-0 md:hidden"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <Image
                    src={logo}
                    alt={`Partner ${index % logos.length + 1}`}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain opacity-0 hidden md:block"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add the CSS animation */}
      <style jsx global>{`
        /* Custom mask gradients for different screen sizes */
        .mask-gradient-mobile {
          mask-image: linear-gradient(to right, transparent, black 30px, black calc(100% - 30px), transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 30px, black calc(100% - 30px), transparent);
        }
        
        .mask-gradient-desktop {
          mask-image: linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent);
        }
      
        @keyframes scrollPartnersMobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scrollPartnersDesktop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Mobile styles */
        @media (max-width: 767px) {
          .flex-shrink-0 {
            width: 100px !important;
            height: 60px !important;
          }
          
          .carousel-scroll {
            animation: scrollPartnersMobile 12s linear infinite !important;
          }
        }
        
        /* Desktop styles - keeping the original sizes */
        @media (min-width: 768px) {
          .flex-shrink-0 {
            width: 160px !important;
            height: 80px !important;
          }
          
          .carousel-scroll {
            animation: scrollPartnersDesktop 30s linear infinite;
          }
        }
      `}</style>
    </section>
  )
} 