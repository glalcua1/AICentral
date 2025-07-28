'use client'

import { useState } from 'react'
import { Search, Filter, Star, Eye, Heart, ExternalLink, ChevronRight, User, Calendar, Target, Zap, TrendingUp } from 'lucide-react'
import Header from '@/components/Header'
import { getApprovedProjects, getFeaturedProjects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  
  const approvedProjects = getApprovedProjects()
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
                        <button className="btn-primary btn-small">
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
                        <button className="btn-primary btn-small">
                          View
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
    </div>
  )
} 