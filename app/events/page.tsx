'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Users, UserCheck, AlertCircle, TrendingUp, Zap, CheckCircle, X } from 'lucide-react'
import Header from '@/components/Header'
import { events, Event } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default function EventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([])
  const [filterType, setFilterType] = useState<string>('all')

  const handleRegister = (eventId: number) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId))
      alert('Registration cancelled successfully! You will receive a confirmation email.')
    } else {
      setRegisteredEvents([...registeredEvents, eventId])
      alert('Successfully registered! You will receive a confirmation email with event details and calendar invite.')
    }
  }

  const handleAddToCalendar = (event: Event) => {
    const calendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.date.replace(/-/g, '')}T${event.time.replace(':', '')}00Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`
    
    const link = document.createElement('a')
    link.href = calendarUrl
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`
    link.click()
  }

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'workshop': return 'from-blue-500 to-cyan-500'
      case 'seminar': return 'from-emerald-500 to-teal-500'
      case 'discussion': return 'from-purple-500 to-pink-500'
      case 'hands-on': return 'from-orange-500 to-red-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getCapacityStatus = (event: Event) => {
    const percentage = (event.registered / event.capacity) * 100
    if (percentage >= 90) return { 
      color: 'text-error-600', 
      label: 'Almost Full',
      bgColor: 'bg-error-100',
      progressColor: 'bg-error-500'
    }
    if (percentage >= 70) return { 
      color: 'text-warning-600', 
      label: 'Filling Up',
      bgColor: 'bg-warning-100',
      progressColor: 'bg-warning-500'
    }
    return { 
      color: 'text-success-600', 
      label: 'Available',
      bgColor: 'bg-success-100',
      progressColor: 'bg-success-500'
    }
  }

  const filteredEvents = events.filter(event => {
    if (filterType === 'all') return true
    return event.type === filterType
  })

  const eventTypes = Array.from(new Set(events.map(e => e.type)))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="section-lg text-white relative overflow-hidden pt-32" style={{
        backgroundImage: 'url("/futuristic-technology-concept.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass-card mb-8 backdrop-blur-md bg-black/20 border border-white/20">
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white" style={{
                textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.6)'
              }}>Upcoming Events</span>
            </div>
            <h1 className="heading-1 mb-6 text-white" style={{
              textShadow: '3px 3px 12px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,1)'
            }}>
              Join Live AI Events & Workshops
            </h1>
            <p className="text-hero mb-8 text-white" style={{
              textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7), 1px 1px 2px rgba(0,0,0,1)'
            }}>
              Register for interactive sessions, hands-on workshops, and expert-led discussions to accelerate your AI learning journey
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-card max-w-2xl mx-auto backdrop-blur-md bg-black/20 border border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1" style={{
                  textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)'
                }}>{events.length}</div>
                <div className="text-sm text-white" style={{
                  textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)'
                }}>Events Scheduled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1" style={{
                  textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)'
                }}>{eventTypes.length}</div>
                <div className="text-sm text-white" style={{
                  textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)'
                }}>Event Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1" style={{
                  textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)'
                }}>{events.reduce((sum, event) => sum + event.registered, 0)}</div>
                <div className="text-sm text-white" style={{
                  textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)'
                }}>Total Registrations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1" style={{
                  textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)'
                }}>{registeredEvents.length}</div>
                <div className="text-sm text-white" style={{
                  textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)'
                }}>Your Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Type Filter */}
      <section className="section bg-white shadow-soft relative -mt-16 mx-4 md:mx-8 rounded-2xl">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilterType('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                filterType === 'all' 
                  ? 'bg-primary-600 text-white shadow-medium' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Events ({events.length})
            </button>
            {eventTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
                  filterType === type 
                    ? 'bg-primary-600 text-white shadow-medium' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type} ({events.filter(e => e.type === type).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section">
        <div className="container-custom">
          <div className="space-y-8 stagger-children">
            {filteredEvents.map((event) => {
              const isRegistered = registeredEvents.includes(event.id)
              const capacityStatus = getCapacityStatus(event)
              const percentage = (event.registered / event.capacity) * 100
              
              return (
                <div key={event.id} className="card card-hover group">
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      {/* Event Info */}
                      <div className="flex-1 mb-6 lg:mb-0">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getEventTypeColor(event.type)} text-white text-sm font-medium capitalize`}>
                            {event.type}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${capacityStatus.bgColor} ${capacityStatus.color}`}>
                            {capacityStatus.label}
                          </div>
                          {isRegistered && (
                            <div className="flex items-center space-x-2 px-3 py-1 bg-success-100 text-success-800 rounded-full text-sm font-medium">
                              <UserCheck className="h-4 w-4" />
                              <span>Registered</span>
                            </div>
                          )}
                        </div>

                        <h3 className="heading-4 mb-3 group-hover:text-primary-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-body mb-6">{event.description}</p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>{event.registered}/{event.capacity} registered</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm text-gray-600">
                            Facilitated by <span className="font-medium text-gray-900">{event.facilitator}</span>
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="lg:ml-8 flex flex-col space-y-3 min-w-0 lg:min-w-[200px]">
                        {isRegistered ? (
                          <>
                            <div className="btn bg-success-50 text-success-700 border border-success-200 cursor-default flex items-center justify-center space-x-2">
                              <CheckCircle className="h-4 w-4" />
                              <span>Registered</span>
                            </div>
                            <button
                              onClick={() => handleRegister(event.id)}
                              className="btn-ghost text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center space-x-2 text-sm"
                            >
                              <X className="h-4 w-4" />
                              <span>Cancel Registration</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRegister(event.id)}
                            disabled={event.registered >= event.capacity}
                            className={`btn transition-all ${
                              event.registered >= event.capacity
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                : 'btn-primary shadow-medium hover:shadow-glow'
                            }`}
                          >
                            {event.registered >= event.capacity ? 'Event Full' : 'Register Now'}
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleAddToCalendar(event)}
                          className="btn-secondary flex items-center justify-center space-x-2"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Add to Calendar</span>
                        </button>

                        {/* Event Badge */}
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-medium">
                            <Zap className="h-3 w-3" />
                            <span>Live Event</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                        <span>Registration Progress</span>
                        <span>{Math.round(percentage)}% full</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className={`h-full ${capacityStatus.progressColor} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Warning for almost full events */}
                    {percentage >= 90 && event.registered < event.capacity && (
                      <div className="mt-4 flex items-center space-x-2 text-sm text-warning-600 bg-warning-50 p-3 rounded-xl">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span>This event is almost full. Register soon to secure your spot!</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Registration Summary */}
      {registeredEvents.length > 0 && (
        <section className="section bg-gradient-to-br from-primary-50 via-white to-primary-50">
          <div className="container-custom">
            <div className="card-featured text-center max-w-2xl mx-auto p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <UserCheck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="heading-4 mb-4">
                You&apos;re registered for {registeredEvents.length} event{registeredEvents.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-body mb-6">
                You&apos;ll receive email confirmations and calendar invites for all registered events. 
                Check your email for joining instructions and event materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="btn-primary">
                  View My Events
                </button>
                <button className="btn-secondary">
                  Download Calendar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
} 