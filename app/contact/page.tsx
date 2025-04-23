"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { TextAnimate } from "@/components/magicui/text-animate"
import Link from "next/link"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send the form data to your backend here
    console.log("Form submitted:", formData)

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })

    // Reset submission status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div
        className="fixed inset-0 z-0"
        style={
          {
            background: "#000000",
            "--gap": "5em",
            "--line": "1px",
            "--color": "rgba(255, 255, 255, 0.07)", // Reduced opacity from 0.2 to 0.07
            backgroundImage: `
            linear-gradient(
              -90deg,
              transparent calc(var(--gap) - var(--line)),
              var(--color) calc(var(--gap) - var(--line) + 1px),
              var(--color) var(--gap)
            ),
            linear-gradient(
              0deg,
              transparent calc(var(--gap) - var(--line)),
              var(--color) calc(var(--gap) - var(--line) + 1px),
              var(--color) var(--gap)
            )
          `,
            backgroundSize: "var(--gap) var(--gap)",
          } as React.CSSProperties
        }
      ></div>

      <Header />

      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="mb-12 text-center">
              <TextAnimate as="h1" className="text-4xl md:text-5xl font-bold mb-4">
                Get in Touch
              </TextAnimate>
              <p className="text-gray-400">We'd love to hear from you</p>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-gray-800/50 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                  <Link href="/" className="inline-flex items-center text-silver hover:text-white transition-colors">
                    <span>Return to Home</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="conversation-form">
                    <p className="text-gray-300 mb-2">Hi, I'm</p>
                    <div className="relative mb-6">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-gray-500 focus:border-silver py-2 outline-none transition-colors text-white placeholder-gray-500"
                        placeholder="Your Name*"
                      />
                    </div>

                    <p className="text-gray-300 mb-2">You can reach me at</p>
                    <div className="relative mb-6">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-gray-500 focus:border-silver py-2 outline-none transition-colors text-white placeholder-gray-500"
                        placeholder="Your Email*"
                      />
                    </div>

                    <p className="text-gray-300 mb-2">I'd like to discuss</p>
                    <div className="relative mb-8">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-transparent border-b border-gray-500 focus:border-silver py-2 outline-none transition-colors text-white placeholder-gray-500 resize-none"
                        placeholder="Your Message*"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex items-center space-x-2 text-2xl font-semibold text-silver hover:text-white transition-colors disabled:opacity-50"
                    >
                      <span>Send Message</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
