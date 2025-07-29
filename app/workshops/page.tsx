'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Calendar, Clock, Users, Star, Play, Download, ChevronDown, CheckCircle, X, Plus, BookOpen, MapPin, DollarSign, Tag, FileText, User } from 'lucide-react'
import Header from '@/components/Header'
import { workshops, Workshop } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default function WorkshopsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('date')
  const [showFilters, setShowFilters] = useState(false)
  const [registeredWorkshops, setRegisteredWorkshops] = useState<number[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [eventType, setEventType] = useState<'workshop' | 'event'>('workshop')

  // Extract unique topics and levels
  const allTopics = Array.from(new Set(workshops.flatMap(w => w.topics)))
  const allLevels = Array.from(new Set(workshops.map(w => w.level)))

  // Filter workshops
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.facilitator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = !selectedLevel || workshop.level === selectedLevel
    const matchesTopic = !selectedTopic || workshop.topics.includes(selectedTopic)
    
    return matchesSearch && matchesLevel && matchesTopic
  })

  // Sort workshops
  const sortedWorkshops = [...filteredWorkshops].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'rating':
        return b.rating - a.rating
      case 'participants':
        return b.participants - a.participants
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const handleRegister = (workshopId: number) => {
    if (registeredWorkshops.includes(workshopId)) {
      setRegisteredWorkshops(registeredWorkshops.filter(id => id !== workshopId))
      alert('Workshop registration cancelled successfully!')
    } else {
      setRegisteredWorkshops([...registeredWorkshops, workshopId])
      alert('Successfully registered for workshop! You will receive a confirmation email.')
    }
  }

  const handleAddToCalendar = (workshop: Workshop) => {
    alert(`Adding "${workshop.title}" to calendar - This would integrate with Outlook/Google Calendar`)
  }

  const openAddModal = (type: 'workshop' | 'event') => {
    setEventType(type)
    setIsAddModalOpen(true)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAddModal()
      }
    }

    if (isAddModalOpen) {
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isAddModalOpen])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'badge-success'
      case 'Intermediate': return 'badge-warning'
      case 'Advanced': return 'badge-error'
      default: return 'badge-primary'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'ongoing': return 'bg-success-100 text-success-800'
      case 'upcoming': return 'bg-primary-100 text-primary-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="section-lg text-white relative overflow-hidden pt-32" style={{
        backgroundImage: 'url("/agile-scrum-team-collaborating-around-task-board-office-setting.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Subtle neutral gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass-card mb-8 backdrop-blur-md bg-black/20 border border-white/20">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white drop-shadow-lg">Learning Workshops</span>
            </div>
            <h1 className="heading-1 mb-6 text-white drop-shadow-2xl" style={{
              textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 16px rgba(0,0,0,0.6)'
            }}>
              Master AI with Expert-Led Workshops
            </h1>
            <p className="text-hero text-gray-100 mb-8 drop-shadow-lg" style={{
              textShadow: '1px 1px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)'
            }}>
              Access our comprehensive repository of past and ongoing workshops with advanced filtering by level, topic, and facilitator
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-card max-w-2xl mx-auto backdrop-blur-md bg-black/20 border border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1 drop-shadow-lg" style={{
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
                }}>{workshops.length}</div>
                <div className="text-sm text-gray-200 drop-shadow-md">Total Workshops</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1 drop-shadow-lg" style={{
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
                }}>{allTopics.length}</div>
                <div className="text-sm text-gray-200 drop-shadow-md">Topics Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1 drop-shadow-lg" style={{
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
                }}>{allLevels.length}</div>
                <div className="text-sm text-gray-200 drop-shadow-md">Skill Levels</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1 drop-shadow-lg" style={{
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
                }}>4.8</div>
                <div className="text-sm text-gray-200 drop-shadow-md">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="section bg-white shadow-soft relative -mt-16 mx-4 md:mx-8 rounded-2xl">
        <div className="container-custom">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search workshops, facilitators, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-12 pr-4 text-lg h-14 shadow-medium"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-ghost flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {sortedWorkshops.length} of {workshops.length} workshops
                </div>
                
                {/* Add Workshop/Event Button */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAddModal('workshop')}
                    className="btn-primary btn-small flex items-center space-x-2 group"
                  >
                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Add Workshop</span>
                  </button>
                  
                  <button
                    onClick={() => openAddModal('event')}
                    className="btn-secondary btn-small flex items-center space-x-2 group"
                  >
                    <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Add Event</span>
                  </button>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input py-2 px-3 text-sm min-w-0"
                >
                  <option value="date">Latest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="participants">Most Popular</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="grid md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-xl animate-slide-up">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="input"
                >
                  <option value="">All Levels</option>
                  {allLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="input"
                >
                  <option value="">All Topics</option>
                  {allTopics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setSelectedLevel('')
                    setSelectedTopic('')
                    setSearchTerm('')
                  }}
                  className="btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="section">
        <div className="container-custom">
          {sortedWorkshops.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="heading-4 mb-4">No workshops found</h3>
              <p className="text-body mb-6">Try adjusting your search criteria or filters.</p>
              <button
                onClick={() => {
                  setSelectedLevel('')
                  setSelectedTopic('')
                  setSearchTerm('')
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {sortedWorkshops.map((workshop) => (
                <div key={workshop.id} className="card card-hover group">
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`badge ${getLevelColor(workshop.level)}`}>
                        {workshop.level}
                      </span>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(workshop.status)}`}>
                          {workshop.status}
                        </span>
                        {workshop.rating > 0 && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{workshop.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {workshop.title}
                    </h3>
                    <p className="text-gray-600 mb-3">by {workshop.facilitator}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{workshop.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="px-6 pb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(workshop.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{workshop.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{workshop.participants} joined</span>
                      </div>
                      <div className="text-primary-600 font-medium">
                        {workshop.topics.length} topics
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {workshop.topics.slice(0, 2).map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                      {workshop.topics.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{workshop.topics.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-6">
                    {workshop.status === 'upcoming' ? (
                      <div className="space-y-3">
                        {registeredWorkshops.includes(workshop.id) ? (
                          <>
                            <div className="btn bg-success-50 text-success-700 border border-success-200 cursor-default flex items-center justify-center space-x-2 w-full">
                              <CheckCircle className="h-4 w-4" />
                              <span>Registered</span>
                            </div>
                            <button
                              onClick={() => handleRegister(workshop.id)}
                              className="btn-ghost text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center space-x-2 text-sm w-full"
                            >
                              <X className="h-4 w-4" />
                              <span>Cancel Registration</span>
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleRegister(workshop.id)}
                            className="btn-primary w-full"
                          >
                            Register Now
                          </button>
                        )}
                        <button 
                          onClick={() => handleAddToCalendar(workshop)}
                          className="btn-secondary w-full flex items-center justify-center space-x-2"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Add to Calendar</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {workshop.recording && (
                          <button className="btn-primary w-full flex items-center justify-center space-x-2">
                            <Play className="h-4 w-4" />
                            <span>Watch Recording</span>
                          </button>
                        )}
                        {workshop.materials && (
                          <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                            <Download className="h-4 w-4" />
                            <span>Download Materials</span>
                          </button>
                        )}
                        {!workshop.recording && !workshop.materials && (
                          <button className="btn-secondary w-full">
                            View Details
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add Workshop/Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-lg"
            onClick={closeAddModal}
          />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl max-h-[95vh] overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      {eventType === 'workshop' ? (
                        <BookOpen className="w-6 h-6 text-white" />
                      ) : (
                        <Calendar className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Add New {eventType === 'workshop' ? 'Workshop' : 'Event'}
                      </h2>
                      <p className="text-primary-100">
                        Create a new {eventType} for the AI learning community
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeAddModal}
                    className="p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all duration-300 group"
                  >
                    <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const data = Object.fromEntries(formData.entries())
                    console.log('Submitted data:', data)
                    alert(`${eventType === 'workshop' ? 'Workshop' : 'Event'} added successfully! (This is a demo - would integrate with your backend)`)
                    closeAddModal()
                  }}
                  className="p-8 space-y-8"
                >
                  {/* Basic Information */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></div>
                      Basic Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FileText className="w-4 h-4 inline mr-2" />
                          Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          required
                          placeholder={`Enter ${eventType} title`}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Facilitator *
                        </label>
                        <input
                          type="text"
                          name="facilitator"
                          required
                          placeholder="Facilitator name"
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Description *
                      </label>
                      <textarea
                        name="description"
                        required
                        rows={4}
                        placeholder={`Describe what participants will learn in this ${eventType}`}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Schedule & Location */}
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
                      Schedule & Location
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Duration *
                        </label>
                        <select
                          name="duration"
                          required
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select duration</option>
                          <option value="1 hour">1 hour</option>
                          <option value="1.5 hours">1.5 hours</option>
                          <option value="2 hours">2 hours</option>
                          <option value="3 hours">3 hours</option>
                          <option value="4 hours">4 hours</option>
                          <option value="Full day">Full day</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Location *
                        </label>
                        <select
                          name="location"
                          required
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select location</option>
                          <option value="Conference Room A">Conference Room A</option>
                          <option value="Conference Room B">Conference Room B</option>
                          <option value="Training Room 1">Training Room 1</option>
                          <option value="Training Room 2">Training Room 2</option>
                          <option value="Virtual">Virtual</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Workshop Specific Fields */}
                  {eventType === 'workshop' && (
                    <div className="bg-green-50 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                        Workshop Details
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Tag className="w-4 h-4 inline mr-2" />
                            Level *
                          </label>
                          <select
                            name="level"
                            required
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Users className="w-4 h-4 inline mr-2" />
                            Max Participants
                          </label>
                          <input
                            type="number"
                            name="maxParticipants"
                            min="1"
                            max="100"
                            placeholder="e.g. 25"
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <BookOpen className="w-4 h-4 inline mr-2" />
                          Topics (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="topics"
                          placeholder="e.g. Machine Learning, Neural Networks, Python"
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Additional Information */}
                  <div className="bg-purple-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-3"></div>
                      Additional Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <DollarSign className="w-4 h-4 inline mr-2" />
                          Cost
                        </label>
                        <select
                          name="cost"
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="Free">Free</option>
                          <option value="$50">$50</option>
                          <option value="$100">$100</option>
                          <option value="$150">$150</option>
                          <option value="$200">$200</option>
                          <option value="Custom">Custom Amount</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Tag className="w-4 h-4 inline mr-2" />
                          Category
                        </label>
                        <select
                          name="category"
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select category</option>
                          <option value="Fundamentals">Fundamentals</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Ethics">Ethics</option>
                          <option value="Practical">Practical</option>
                          <option value="Industry">Industry Specific</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Prerequisites
                      </label>
                      <textarea
                        name="prerequisites"
                        rows={3}
                        placeholder="List any prerequisites or recommended background knowledge"
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeAddModal}
                      className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 flex items-center space-x-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Create {eventType === 'workshop' ? 'Workshop' : 'Event'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 