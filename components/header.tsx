"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="mx-auto px-4 w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[47vw]">
        <div className="backdrop-blur-md bg-black/20 border border-gray-800/50 rounded-full py-2 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/voyage-logo-new.png" alt="The Voyage" width={150} height={75} className="h-14 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href="https://voyage-trilogy.gitbook.io/tvt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Whitepaper
            </Link>
            <Link
              href="https://voyage-trilogy.gitbook.io/dao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              DAO
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <Link
            href="https://pixelpai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-black rounded-full border border-gray-400/30 transition shadow-[2px_2px_0px_0px_rgba(200,200,200,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(220,200,200,0.4)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(200,200,200,0.2)] bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-[length:100%_100%] hover:bg-[length:110%_110%] text-gray-800 text-sm font-medium"
          >
            Buy Token
          </Link>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 backdrop-blur-md bg-black/80 border border-gray-800/50 rounded-xl p-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link
                href="https://voyage-trilogy.gitbook.io/tvt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Whitepaper
              </Link>
              <Link
                href="https://voyage-trilogy.gitbook.io/dao"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                DAO
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
