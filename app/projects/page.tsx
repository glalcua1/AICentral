'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Star, Eye, Heart, ExternalLink, ChevronRight, User, Calendar, Target, Zap, TrendingUp, X } from 'lucide-react'
import Header from '@/components/Header'
import { getApprovedProjects, getFeaturedProjects, Project } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const approvedProjects = getApprovedProjects()
  
  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }
  
  const closeProjectModal = () => {
    setSelectedProject(null)
    setIsModalOpen(false)
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])
  
  const featuredProjects = getFeaturedProjects()
  
  // Filter and sort projects
  const filteredProjects = approvedProjects.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      case 'popular':
        return (b.likes || 0) - (a.likes || 0)
      case 'views':
        return (b.views || 0) - (a.views || 0)
      default:
        return 0
    }
  })

  const categories = Array.from(new Set(approvedProjects.map(p => p.category)))

  const getCategoryColor = (category: string) => {
    const colors = {
      'machine-learning': 'from-blue-500 to-blue-600',
      'nlp': 'from-green-500 to-green-600',
      'computer-vision': 'from-purple-500 to-purple-600',
      'automation': 'from-orange-500 to-orange-600',
      'analytics': 'from-red-500 to-red-600',
      'chatbots': 'from-indigo-500 to-indigo-600'
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="section-lg text-white relative overflow-hidden pt-32" style={{
        backgroundImage: 'url("/digital-art-inmersive-exhibition.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Subtle neutral gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass-card mb-8 backdrop-blur-md bg-black/20 border border-white/20">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white" style={{
                textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6)'
              }}>Innovation Showcase</span>
            </div>
            
            <h1 className="heading-1 mb-6 text-white" style={{
              textShadow: '3px 3px 12px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,1)'
            }}>AI Projects Gallery</h1>
            <p className="text-hero mb-8 text-white" style={{
              textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7), 1px 1px 2px rgba(0,0,0,1)'
            }}>
              Explore innovative AI projects created by our community. Get inspired and discover cutting-edge solutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Projects', value: approvedProjects.length, icon: Target },
                { label: 'Featured', value: featuredProjects.length, icon: Star },
                { label: 'Total Views', value: approvedProjects.reduce((sum, p) => sum + (p.views || 0), 0), icon: Eye },
                { label: 'Total Likes', value: approvedProjects.reduce((sum, p) => sum + (p.likes || 0), 0), icon: Heart },
              ].map((stat, index) => (
                <div key={index} className="glass-card text-center p-4 backdrop-blur-md bg-black/20 border border-white/10">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-white" style={{
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                    }} />
                  </div>
                  <div className="text-2xl font-bold text-white" style={{
                    textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)'
                  }}>{stat.value}</div>
                  <div className="text-sm text-white" style={{
                    textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)'
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="section bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="heading-3 mb-2">Featured Projects</h2>
                <p className="text-body text-gray-600">Exceptional projects highlighted by our community</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="card card-featured overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getCategoryColor(project.category)} text-white text-sm font-medium`}>
                        {project.category.replace('-', ' ').toUpperCase()}
                      </div>
                      <div className="badge badge-warning">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </div>
                    </div>
                    
                    <h3 className="heading-4 mb-3">{project.projectName}</h3>
                    <p className="text-body text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Impact</div>
                        <div className="text-sm font-medium text-gray-900">{project.impact}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Technologies</div>
                        <div className="text-sm font-medium text-gray-900">{project.technologies}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{project.likes || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{project.submittedBy.split('@')[0]}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost btn-small"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button 
                          onClick={() => openProjectModal(project)}
                          className="btn-primary btn-small"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="section bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input pl-10 appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort */}
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input pl-10 appearance-none"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Liked</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
            
            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600">
              Showing {sortedProjects.length} of {approvedProjects.length} projects
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          {sortedProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProjects.map((project) => (
                <div key={project.id} className="card card-hover overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getCategoryColor(project.category)} text-white text-sm font-medium`}>
                        {project.category.replace('-', ' ').toUpperCase()}
                      </div>
                      {project.featured && (
                        <Star className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {project.projectName}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Objective</div>
                        <div className="text-sm text-gray-700 line-clamp-2">{project.objective}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Technologies</div>
                        <div className="text-sm font-medium text-gray-900">{project.technologies || 'Not specified'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{project.likes || 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(project.submittedAt)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>by {project.submittedBy.split('@')[0]}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost btn-small"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button 
                          onClick={() => openProjectModal(project)}
                          className="btn-primary btn-small"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="heading-4 mb-4">No projects found</h3>
              <p className="text-body text-gray-600 mb-8 max-w-md mx-auto">
                Try adjusting your search criteria or explore different categories.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('')
                  setSortBy('recent')
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container-custom relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="heading-2 mb-6">Have an AI Project to Share?</h2>
            <p className="text-hero mb-8 text-gray-200">
              Join our community of innovators and showcase your AI solutions to inspire others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-large bg-white text-primary-600 hover:bg-gray-100 group">
                Submit Your Project
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="/my-projects" className="btn-ghost border-white/20 text-white hover:bg-white/10 btn-large">
                View My Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

            {/* Project Details Modal - Redesigned with Ogilvy Design Thinking */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-lg"
            onClick={closeProjectModal}
          />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl max-h-[95vh] overflow-hidden">
              
              {/* Hero Section with Image */}
              <div className="relative h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600">
                  <Image
                    src="/digital-art-inmersive-exhibition.jpg"
                    alt="AI Project Hero"
                    width={1200}
                    height={400}
                    className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={closeProjectModal}
                  className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all duration-300 group"
                >
                  <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30`}>
                          {selectedProject.category}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          selectedProject.status === 'approved' 
                            ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                            : 'bg-yellow-500/20 text-yellow-100 border border-yellow-400/30'
                        }`}>
                          {selectedProject.status}
                        </span>
                      </div>
                      <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
                        {selectedProject.projectName}
                      </h1>
                      <p className="text-xl text-white/90 mb-4 max-w-3xl leading-relaxed">
                        {selectedProject.objective}
                      </p>
                      <div className="flex items-center text-white/80 text-sm">
                        <User className="w-4 h-4 mr-2" />
                        <span className="mr-4">by {selectedProject.submittedBy}</span>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(selectedProject.submittedAt)}</span>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    {selectedProject.status === 'approved' && (
                      <div className="hidden lg:flex space-x-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">{selectedProject.views || 0}</div>
                          <div className="text-xs text-white/70 uppercase tracking-wide">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">{selectedProject.likes || 0}</div>
                          <div className="text-xs text-white/70 uppercase tracking-wide">Likes</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="overflow-y-auto max-h-[calc(95vh-320px)]">
                
                {/* Project Screenshots - Featured */}
                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <div className="px-8 py-8 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Project Gallery</h2>
                      <div className="text-sm text-gray-500">{selectedProject.screenshots.length} screenshots</div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {selectedProject.screenshots.map((screenshot, index) => (
                        <div key={index} className="group relative aspect-video bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                          <Image
                            src="/agile-scrum-team-collaborating-around-task-board-office-setting.jpg"
                            alt={`${selectedProject.projectName} screenshot ${index + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-sm font-medium">Screenshot {index + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                  
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Project Overview */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Project Overview</h3>
                          <p className="text-sm text-gray-500">Understanding the core purpose</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg">{selectedProject.description}</p>
                    </div>

                    {/* Impact & Results */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Expected Impact</h3>
                          <p className="text-sm text-green-600">Measuring success and value</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg">{selectedProject.impact}</p>
                    </div>

                    {/* Technology Stack */}
                    {selectedProject.technologies && (
                      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">Technology Stack</h3>
                            <p className="text-sm text-blue-600">Tools and frameworks powering this project</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {selectedProject.technologies.split(',').map((tech, index) => (
                            <div
                              key={index}
                              className="group flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl border border-blue-100 transition-all duration-300 hover:shadow-md"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                <Zap className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                                {tech.trim()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Sidebar */}
                  <div className="space-y-6">
                    
                    {/* Project Details */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
                        Project Details
                      </h3>
                      <div className="space-y-5">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center">
                            <User className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-600">Team Size</span>
                          </div>
                          <span className="font-bold text-gray-900">{selectedProject.team}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-600">Timeline</span>
                          </div>
                          <span className="font-bold text-gray-900">{selectedProject.timeline}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center">
                            <Target className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-600">Budget</span>
                          </div>
                          <span className="font-bold text-gray-900">{selectedProject.budget}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center group"
                        >
                          <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                          View Live Project
                        </a>
                      )}
                      
                      {/* Mobile Stats */}
                      {selectedProject.status === 'approved' && (
                        <div className="lg:hidden bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-6 border border-primary-100">
                          <h4 className="font-semibold text-gray-900 mb-4">Project Performance</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-white rounded-xl">
                              <div className="text-2xl font-bold text-primary-600 mb-1">{selectedProject.views || 0}</div>
                              <div className="text-xs text-gray-500 uppercase tracking-wide">Views</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl">
                              <div className="text-2xl font-bold text-red-500 mb-1">{selectedProject.likes || 0}</div>
                              <div className="text-xs text-gray-500 uppercase tracking-wide">Likes</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 