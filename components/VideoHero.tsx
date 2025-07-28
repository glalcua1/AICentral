'use client'

import { useState, useEffect, useRef } from 'react'
import { Brain, Play, ArrowRight, Sparkles } from 'lucide-react'
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
  const [showPlayIcon, setShowPlayIcon] = useState(true)
  const videoLoadedRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayIcon(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

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
        const retryTimer = setTimeout(() => {
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
              className="w-full h-full object-cover opacity-85"
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

          {/* Strategic Gradient Overlay - lighter for video appeal */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />
          
          {/* Focused center overlay for text readability only */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.4) 100%)'
          }} />

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
      <div className="relative z-20 container-custom text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 glass-card mb-8 animate-fade-in backdrop-blur-md bg-black/30 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white" style={{
              textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6)'
            }}>Powered by Advanced AI Technology</span>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-8 animate-scale-in">
            <div className="relative">
              <div className="icon-container-large glass border border-white/20 hover-glow">
                <Brain className="w-12 h-12" />
              </div>
              {showPlayIcon && (
                <div className="absolute -top-2 -right-2 animate-pulse">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
                      <h1 className="heading-1 mb-6 animate-slide-up text-white drop-shadow-2xl" style={{
              textShadow: '3px 3px 12px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,1)'
            }}>
              <span className="block">{title}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-hero mb-12 max-w-3xl mx-auto text-white animate-slide-up [animation-delay:0.2s] drop-shadow-lg" style={{
              textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7), 1px 1px 2px rgba(0,0,0,1)'
            }}>
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
              className="btn glass border-white/20 text-white hover:bg-white/10 btn-large group"
            >
              <span>{secondaryCTA.text}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats Preview */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up [animation-delay:0.6s]">
                             {[
                   { value: '1,200+', label: 'Active Learners' },
                   { value: '156', label: 'Workshops' },
                   { value: '89', label: 'Best Practices' },
                   { value: '4.9/5', label: 'Avg Rating' },
                 ].map((stat, index) => (
                   <div key={index} className="text-center backdrop-blur-sm bg-black/20 rounded-lg p-3 border border-white/10">
                     <div className="text-2xl md:text-3xl font-bold text-white mb-1" style={{
                       textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)'
                     }}>
                       {stat.value}
                     </div>
                     <div className="text-sm text-white" style={{
                       textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)'
                     }}>
                       {stat.label}
                     </div>
                   </div>
                 ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 text-white/60 animate-bounce">
          <div className="text-xs font-medium">Scroll to explore</div>
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