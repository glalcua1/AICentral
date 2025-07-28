'use client'

import { useState } from 'react'
import { Search, Heart, MessageCircle, Tag, Plus, Filter, TrendingUp, Share2, BookOpen, Sparkles, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import { bestPractices } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default function BestPracticesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('date')
  const [showNewPracticeForm, setShowNewPracticeForm] = useState(false)
  const [likedPractices, setLikedPractices] = useState<number[]>([])

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