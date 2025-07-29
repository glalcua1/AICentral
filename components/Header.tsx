'use client'

import { Brain, Calendar, Users, BookOpen, Menu, X, Lightbulb, Lock, User, Mail, Eye, EyeOff, Shield, CheckCircle, LogIn, LogOut, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import ProjectSubmissionModal from './ProjectSubmissionModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<{name: string, email: string, role: 'user' | 'approver'} | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check for stored authentication on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  // Handle ESC key for login modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLoginModalOpen(false)
      }
    }

    if (isLoginModalOpen) {
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isLoginModalOpen])

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
    setIsMenuOpen(false) // Close mobile menu if open
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
    setShowPassword(false)
    setIsLoading(false)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Log credentials for demo purposes
    console.log('Demo login attempt:', { email, password })

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false)
      closeLoginModal()
      
      // Determine user role and name based on email
      let role: 'user' | 'approver' = 'user'
      let name = email.split('@')[0]
      
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('approver') || email.toLowerCase().includes('hr')) {
        role = 'approver'
        name = `${name} (Approver)`
      }
      
      // Create user object
      const user = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
        role
      }
      
      // Store in state and localStorage
      setCurrentUser(user)
      localStorage.setItem('currentUser', JSON.stringify(user))
      
      // Simulate successful login
      alert(`Login successful! Welcome ${user.name}`)
    }, 1500)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    alert('Successfully logged out!')
    if (pathname === '/my-projects' || pathname === '/admin/approval') {
      router.push('/')
    }
  }

  const handleMyProjectsAccess = () => {
    if (currentUser) {
      router.push('/my-projects')
    } else {
      openLoginModal()
    }
  }

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
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'glass-active'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-transform ${
                    active ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {currentUser ? (
              // Logged in state
              <>
                <button
                  onClick={handleMyProjectsAccess}
                  className="btn-ghost btn-small flex items-center group"
                >
                  <User className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  My Projects
                </button>
                
                {/* User info and logout */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 rounded-xl border border-primary-100">
                    {currentUser.role === 'approver' ? (
                      <UserCheck className="w-4 h-4 text-primary-600" />
                    ) : (
                      <User className="w-4 h-4 text-primary-600" />
                    )}
                    <span className="text-sm font-medium text-primary-700">{currentUser.name}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="btn-ghost btn-small flex items-center group text-gray-600 hover:text-red-600"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </>
            ) : (
              // Not logged in state
              <>
                <button
                  onClick={handleMyProjectsAccess}
                  className="btn-ghost btn-small flex items-center group"
                >
                  <User className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  My Projects
                </button>
                
                <button
                  onClick={openLoginModal}
                  className="btn-secondary btn-small flex items-center group"
                >
                  <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Login
                </button>
              </>
            )}
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
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        active
                          ? 'glass-active'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className={`h-5 w-5 transition-transform ${
                        active ? 'scale-110' : 'group-hover:scale-110'
                      }`} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                {currentUser ? (
                  // Logged in mobile state
                  <>
                    <div className="flex items-center justify-center space-x-2 p-3 bg-primary-50 rounded-xl border border-primary-100 mb-3">
                      {currentUser.role === 'approver' ? (
                        <UserCheck className="w-5 h-5 text-primary-600" />
                      ) : (
                        <User className="w-5 h-5 text-primary-600" />
                      )}
                      <span className="font-medium text-primary-700">{currentUser.name}</span>
                    </div>
                    
                    <button
                      onClick={() => {
                        handleMyProjectsAccess()
                        setIsMenuOpen(false)
                      }}
                      className="btn-ghost w-full justify-center flex items-center group"
                    >
                      <User className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      My Projects
                    </button>
                    
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="btn-secondary w-full justify-center flex items-center group text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Logout
                    </button>
                  </>
                ) : (
                  // Not logged in mobile state
                  <>
                    <button
                      onClick={() => {
                        handleMyProjectsAccess()
                        setIsMenuOpen(false)
                      }}
                      className="btn-ghost w-full justify-center flex items-center group"
                    >
                      <User className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      My Projects
                    </button>
                    
                    <button
                      onClick={openLoginModal}
                      className="btn-secondary w-full justify-center flex items-center group"
                    >
                      <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Login
                    </button>
                  </>
                )}
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

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-lg"
            onClick={closeLoginModal}
          />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 px-8 py-8 text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Access Your Projects
                </h2>
                <p className="text-primary-100">
                  Sign in to view and manage your AI project submissions
                </p>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your work email"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        placeholder="Enter your password"
                        className="w-full p-4 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">Secure Access</h4>
                      <p className="text-xs text-blue-700">
                        Your login credentials are encrypted and secure. Only you can access your project submissions and data.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Demo Credentials */}
                <div className="mt-4 space-y-3">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Regular User Login</h4>
                        <p className="text-xs text-blue-700 mb-2">
                          Access personal projects and submissions
                        </p>
                        <div className="text-xs text-blue-600 font-mono bg-blue-100 p-2 rounded">
                          Email: user@company.com<br />
                          Password: any password
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="flex items-start space-x-3">
                      <UserCheck className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-purple-900 mb-1">Approver Login</h4>
                        <p className="text-xs text-purple-700 mb-2">
                          Access project approval dashboard
                        </p>
                        <div className="text-xs text-purple-600 font-mono bg-purple-100 p-2 rounded">
                          Email: admin@company.com<br />
                          Email: approver@company.com<br />
                          Email: hr@company.com<br />
                          Password: any password
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeLoginModal}
                  className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all duration-300 group"
                >
                  <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 