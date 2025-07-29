'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface VideoHeroProps {
  title: string
  subtitle: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA: {
    text: string
    href: string
  }
}

export default function VideoHero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA
}: VideoHeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoLoadedRef = useRef(false)

  useEffect(() => {
    // More reliable video loading strategy
    let fallbackTimer: NodeJS.Timeout
    let checkInterval: NodeJS.Timeout
    
    const initializeVideo = () => {
      const video = document.querySelector('video') as HTMLVideoElement
      if (video) {
        console.log('Video element found, initializing...')
        
                 // Enhanced loading strategy
         if (video.readyState >= 3) {
           console.log('Video already loaded')
           setIsVideoLoaded(true)
           videoLoadedRef.current = true
           return
         }

        // Force load the video
        video.load()
        
        // Check video readiness more frequently
                 checkInterval = setInterval(() => {
           if (video.readyState >= 3) { // HAVE_FUTURE_DATA
             console.log('Video ready state achieved:', video.readyState)
             setIsVideoLoaded(true)
             videoLoadedRef.current = true
             clearInterval(checkInterval)
           }
         }, 50) // Check every 50ms for faster detection

                 // Fallback timer - reduced for better UX
         fallbackTimer = setTimeout(() => {
           if (!videoLoadedRef.current) {
             console.log('Video loading timeout, showing fallback')
             setVideoError(true)
             setIsVideoLoaded(true)
             videoLoadedRef.current = true
             clearInterval(checkInterval)
           }
         }, 4000) // 4 seconds timeout
      } else {
        console.log('Video element not found')
                 // Retry finding video element after a brief delay
         setTimeout(() => {
           const retryVideo = document.querySelector('video')
           if (retryVideo) {
             initializeVideo()
           } else {
             console.log('Video element still not found, using fallback')
             setVideoError(true)
             setIsVideoLoaded(true)
           }
         }, 500)
      }
    }

    // Initialize after component mount
    const mountTimer = setTimeout(initializeVideo, 100)

    return () => {
      clearTimeout(mountTimer)
      clearTimeout(fallbackTimer)
      clearInterval(checkInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {!videoError ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
                             onLoadedData={() => {
                 console.log('Video loaded data')
                 if (!videoLoadedRef.current) {
                   setIsVideoLoaded(true)
                   videoLoadedRef.current = true
                 }
               }}
               onError={(e) => {
                 console.log('Video error:', e)
                 setVideoError(true)
               }}
               onCanPlayThrough={() => {
                 console.log('Video can play through')
                 if (!videoLoadedRef.current) {
                   setIsVideoLoaded(true)
                   videoLoadedRef.current = true
                 }
               }}
              onLoadStart={() => console.log('Video loading started')}
              onLoadedMetadata={() => console.log('Video metadata loaded')}
            >
              <source src="/6747159_Animation_Brain_3840x2160.mp4" type="video/mp4" />
              {/* Fallback for unsupported browsers */}
              Your browser does not support the video tag.
            </video>
          ) : (
            /* Fallback Gradient Background */
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
          )}

          {/* Subtle video enhancement overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/15" />

          {/* Noise Texture for Premium Feel */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="float-slow absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full" />
        <div className="float-medium absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full" />
        <div className="float-fast absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container-custom text-center">
        <div className="max-w-5xl mx-auto">
          {/* Glass Content Container */}
          <div className="relative">
            {/* Glass Sheet Background */}
            <div className="absolute inset-0 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl" 
                 style={{
                   background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                   boxShadow: '0 32px 64px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                 }} />
            
            {/* Content */}
            <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
              {/* Title */}
              <h1 className="heading-1 mb-6 animate-slide-up text-white">
                <span className="block">{title}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-hero mb-16 max-w-3xl mx-auto text-white/90 animate-slide-up [animation-delay:0.2s]">
                {subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:0.4s]">
                <Link 
                  href={primaryCTA.href} 
                  className="btn-primary btn-large group shadow-large hover:shadow-glow-lg"
                >
                  <span>{primaryCTA.text}</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href={secondaryCTA.href} 
                  className="btn glass border-white/30 text-white hover:bg-white/20 btn-large group backdrop-blur-sm"
                >
                  <span>{secondaryCTA.text}</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Stats Preview */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up [animation-delay:0.6s]">
                {[
                  { value: '1,200+', label: 'Active Learners' },
                  { value: '156', label: 'Workshops' },
                  { value: '89', label: 'Best Practices' },
                  { value: '4.9/5', label: 'Avg Rating' },
                ].map((stat, index) => (
                  <div key={index} className="text-center backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 text-white/80 animate-bounce">
          <div className="text-xs font-medium backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20">Scroll to explore</div>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>

      {/* Video Loading Overlay */}
      {!isVideoLoaded && !videoError && (
        <div className="absolute inset-0 z-30 bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <div className="text-sm opacity-60">Loading experience...</div>
          </div>
        </div>
      )}
    </section>
  )
} 