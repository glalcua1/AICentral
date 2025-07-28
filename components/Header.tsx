'use client'

import { Brain, Calendar, Users, BookOpen, Menu, X, Plus, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ProjectSubmissionModal from './ProjectSubmissionModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: Brain },
    { name: 'Projects', href: '/projects', icon: Lightbulb },
    { name: 'Workshops', href: '/workshops', icon: BookOpen },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Best Practices', href: '/best-practices', icon: Users },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass border-b border-white/10 shadow-soft' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="icon-container group-hover:scale-110 transition-transform duration-200">
                <Brain className="h-6 w-6" />
              </div>
              <div className="absolute -inset-2 bg-primary-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold gradient-text">AI Central</div>
              <div className="text-xs text-gray-500 font-medium">Knowledge Hub</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-200"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="/my-projects"
              className="btn-ghost btn-small flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              My Projects
            </a>
            <Link href="/workshops" className="btn-primary btn-small">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-card border-t border-white/10 animate-slide-up">
            <div className="container-custom py-6">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-200 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <button
                                onClick={() => {
                window.location.href = '/my-projects'
                setIsMenuOpen(false)
              }}
                  className="btn-ghost w-full justify-center flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Project
                </button>
                <Link 
                  href="/workshops" 
                  className="btn-primary w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Submission Modal */}
      <ProjectSubmissionModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </header>
  )
} 