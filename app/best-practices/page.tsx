'use client'

import { useState } from 'react'
import { Search, Heart, MessageCircle, Tag, Plus, Filter, TrendingUp, Share2, BookOpen, Sparkles, ChevronRight, Mail, Globe, GraduationCap, Headphones, Play, Star, Users, ExternalLink } from 'lucide-react'
import Header from '@/components/Header'
import { bestPractices, resources } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default function BestPracticesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('date')
  const [showNewPracticeForm, setShowNewPracticeForm] = useState(false)
  const [likedPractices, setLikedPractices] = useState<number[]>([])
  const [selectedResourceType, setSelectedResourceType] = useState<string>('all')

  // Extract unique categories and tags
  const allCategories = Array.from(new Set(bestPractices.map(bp => bp.category)))
  const allTags = Array.from(new Set(bestPractices.flatMap(bp => bp.tags)))

  // Filter best practices
  const filteredPractices = bestPractices.filter(practice => {
    const matchesSearch = practice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practice.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || practice.category === selectedCategory
    const matchesTag = !selectedTag || practice.tags.includes(selectedTag)
    
    return matchesSearch && matchesCategory && matchesTag
  })

  // Sort best practices
  const sortedPractices = [...filteredPractices].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'likes':
        return b.likes - a.likes
      case 'comments':
        return b.comments - a.comments
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const handleLike = (practiceId: number) => {
    if (likedPractices.includes(practiceId)) {
      setLikedPractices(likedPractices.filter(id => id !== practiceId))
    } else {
      setLikedPractices([...likedPractices, practiceId])
    }
  }

  const handleSubmitNewPractice = (e: React.FormEvent) => {
    e.preventDefault()
    alert('New best practice submitted for review! It will be published after moderation.')
    setShowNewPracticeForm(false)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Data Management': 'from-blue-500 to-cyan-500',
      'MLOps': 'from-purple-500 to-pink-500',
      'Ethics': 'from-emerald-500 to-teal-500',
      'Monitoring': 'from-orange-500 to-red-500',
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  // Filter resources by type
  const filteredResources = selectedResourceType === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === selectedResourceType)

  // Get featured resources
  const featuredResources = resources.filter(resource => resource.featured)

  // Get resource icon by type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'newsletter':
        return <Mail className="w-5 h-5" />
      case 'blog':
        return <Globe className="w-5 h-5" />
      case 'course':
        return <GraduationCap className="w-5 h-5" />
      case 'podcast':
        return <Headphones className="w-5 h-5" />
      case 'video':
        return <Play className="w-5 h-5" />
      case 'tool':
        return <BookOpen className="w-5 h-5" />
      case 'paper':
        return <BookOpen className="w-5 h-5" />
      default:
        return <Globe className="w-5 h-5" />
    }
  }

  // Get resource type badge color
  const getResourceTypeBadge = (type: string) => {
    switch (type) {
      case 'newsletter':
        return 'bg-blue-100 text-blue-800'
      case 'blog':
        return 'bg-green-100 text-green-800'
      case 'course':
        return 'bg-purple-100 text-purple-800'
      case 'podcast':
        return 'bg-orange-100 text-orange-800'
      case 'video':
        return 'bg-red-100 text-red-800'
      case 'tool':
        return 'bg-indigo-100 text-indigo-800'
      case 'paper':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="section-lg bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden pt-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container-custom relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass-card mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Community Knowledge</span>
            </div>
            <h1 className="heading-1 mb-6">
              Beyond Algorithms: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Best Practices</span>
            </h1>
            <p className="text-hero text-primary-100 mb-8">
              Share and discover AI implementation best practices from our vibrant community of practitioners and experts
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-card max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{bestPractices.length}</div>
                <div className="text-sm text-primary-200">Best Practices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{allCategories.length}</div>
                <div className="text-sm text-primary-200">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{bestPractices.reduce((sum, bp) => sum + bp.likes, 0)}</div>
                <div className="text-sm text-primary-200">Total Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{bestPractices.reduce((sum, bp) => sum + bp.comments, 0)}</div>
                <div className="text-sm text-primary-200">Comments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Actions */}
      <section className="section bg-white shadow-soft relative -mt-16 mx-4 md:mx-8 rounded-2xl">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search best practices, authors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-12 pr-4 text-lg h-14 shadow-medium"
                />
              </div>
            </div>

            {/* Add Practice Button */}
            <button
              onClick={() => setShowNewPracticeForm(true)}
              className="btn-primary btn-large flex items-center space-x-2 shadow-medium hover:shadow-glow"
            >
              <Plus className="h-5 w-5" />
              <span>Share Practice</span>
            </button>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              <option value="">All Categories</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="input"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input"
            >
              <option value="date">Latest First</option>
              <option value="likes">Most Liked</option>
              <option value="comments">Most Discussed</option>
              <option value="title">Alphabetical</option>
            </select>

            <button
              onClick={() => {
                setSelectedCategory('')
                setSelectedTag('')
                setSearchTerm('')
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>

          {/* Results count */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Showing {sortedPractices.length} of {bestPractices.length} best practices
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices List */}
      <section className="section">
        <div className="container-custom">
          {sortedPractices.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="heading-4 mb-4">No best practices found</h3>
              <p className="text-body mb-6">Try adjusting your search criteria or filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('')
                  setSelectedTag('')
                  setSearchTerm('')
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8 stagger-children">
              {sortedPractices.map((practice) => {
                const isLiked = likedPractices.includes(practice.id)
                
                return (
                  <div key={practice.id} className="card card-hover group">
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getCategoryColor(practice.category)} text-white text-sm font-medium`}>
                              {practice.category}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>by</span>
                              <span className="font-medium text-gray-900">{practice.author}</span>
                            </div>
                            <div className="text-sm text-gray-400">
                              {formatDate(practice.date)}
                            </div>
                          </div>
                          <h3 className="heading-4 mb-3 group-hover:text-primary-600 transition-colors">
                            {practice.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-6">
                          <div className="flex items-center space-x-1 px-3 py-1 bg-success-100 text-success-800 rounded-full text-sm font-medium">
                            <TrendingUp className="h-4 w-4" />
                            <span>Trending</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-body mb-6">{practice.description}</p>

                      {/* Content Preview */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl mb-6 border-l-4 border-primary-500">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <BookOpen className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Practice Overview</h4>
                            <p className="text-sm text-gray-600">
                              {practice.content.substring(0, 200)}...
                            </p>
                          </div>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1 group">
                          <span>Read full practice</span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {practice.tags.map((tag, index) => (
                          <span key={index} className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                            <Tag className="h-3 w-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={() => handleLike(practice.id)}
                            className={`flex items-center space-x-2 text-sm transition-all group ${
                              isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                            }`}
                          >
                            <Heart className={`h-5 w-5 group-hover:scale-110 transition-transform ${isLiked ? 'fill-current' : ''}`} />
                            <span className="font-medium">{practice.likes + (isLiked ? 1 : 0)}</span>
                          </button>

                          <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors group">
                            <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">{practice.comments}</span>
                          </button>

                          <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors group">
                            <Share2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span>Share</span>
                          </button>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button className="btn-ghost btn-small">
                            Comment
                          </button>
                          <button className="btn-primary btn-small">
                            View Full Practice
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* AI Resources Section */}
      <section className="section bg-white">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Curated Resources</span>
            </div>
            <h2 className="heading-2 mb-4">Essential AI Resources</h2>
            <p className="text-body text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest AI developments through our carefully curated collection of newsletters, 
              tools, courses, and expert insights from the global AI community.
            </p>
          </div>

          {/* Resource Type Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { key: 'all', label: 'All Resources', icon: <Globe className="w-4 h-4" /> },
              { key: 'newsletter', label: 'Newsletters', icon: <Mail className="w-4 h-4" /> },
              { key: 'tool', label: 'Tools & Platforms', icon: <BookOpen className="w-4 h-4" /> },
              { key: 'course', label: 'Courses', icon: <GraduationCap className="w-4 h-4" /> },
              { key: 'blog', label: 'Blogs & Articles', icon: <Globe className="w-4 h-4" /> },
              { key: 'podcast', label: 'Podcasts', icon: <Headphones className="w-4 h-4" /> },
              { key: 'video', label: 'Videos', icon: <Play className="w-4 h-4" /> },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedResourceType(filter.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedResourceType === filter.key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Featured Resources (only show when 'all' is selected) */}
          {selectedResourceType === 'all' && (
            <div className="mb-16">
              <h3 className="heading-4 mb-8 text-center">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Featured Resources
                </span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.slice(0, 6).map((resource) => (
                  <div key={resource.id} className="card card-hover group">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${getResourceTypeBadge(resource.type)} bg-opacity-20`}>
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-600">
                            {resource.rating}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${getResourceTypeBadge(resource.type)}`}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {resource.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          {resource.organization && (
                            <span className="font-medium">{resource.organization}</span>
                          )}
                          {resource.author && (
                            <span className="font-medium">{resource.author}</span>
                          )}
                          {resource.subscribers && (
                            <div className="flex items-center space-x-1 ml-3">
                              <Users className="w-3 h-3" />
                              <span>{(resource.subscribers / 1000).toFixed(0)}k subscribers</span>
                            </div>
                          )}
                        </div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="card card-hover group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${getResourceTypeBadge(resource.type)} bg-opacity-20`}>
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex items-center space-x-2">
                      {resource.featured && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Featured</span>
                        </div>
                      )}
                      {resource.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-600">
                            {resource.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${getResourceTypeBadge(resource.type)}`}>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      {resource.frequency && ` • ${resource.frequency}`}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{resource.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      {resource.organization && (
                        <span className="font-medium">{resource.organization}</span>
                      )}
                      {resource.author && !resource.organization && (
                        <span className="font-medium">{resource.author}</span>
                      )}
                      {resource.subscribers && (
                        <div className="flex items-center space-x-1 ml-3">
                          <Users className="w-3 h-3" />
                          <span>{(resource.subscribers / 1000).toFixed(0)}k subscribers</span>
                        </div>
                      )}
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Spotlight */}
          {selectedResourceType === 'newsletter' && (
            <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Stay Informed</span>
                </div>
                <h3 className="heading-4 mb-4">Never Miss an AI Breakthrough</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Subscribe to these top-rated newsletters to stay ahead of the curve in artificial intelligence and machine learning.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {resources.filter(r => r.type === 'newsletter' && r.featured).map((newsletter) => (
                    <div key={newsletter.id} className="bg-white rounded-xl p-6 shadow-sm border">
                      <div className="text-center">
                        <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-900 mb-2">{newsletter.title}</h4>
                        <p className="text-sm text-gray-600 mb-4">{newsletter.frequency}</p>
                        <a
                          href={newsletter.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary btn-small w-full"
                        >
                          Subscribe
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* New Practice Form Modal */}
      {showNewPracticeForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-large">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="heading-4 mb-2">Share a Best Practice</h3>
                  <p className="text-body">Help others learn from your AI implementation experience</p>
                </div>
                <button
                  onClick={() => setShowNewPracticeForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitNewPractice} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    className="input"
                    placeholder="Enter a descriptive title for your best practice"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select required className="input">
                    <option value="">Select a category</option>
                    {allCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                    <option value="new">Other (specify in description)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="input"
                    placeholder="Brief description of your best practice"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    required
                    rows={8}
                    className="input"
                    placeholder="Detailed explanation of your best practice, including implementation steps, benefits, and examples"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter tags separated by commas (e.g., machine learning, data quality, python)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Tags help others discover your practice</p>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewPracticeForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 