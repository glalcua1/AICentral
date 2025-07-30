'use client'

import { Calendar, Users, BookOpen, ChevronRight, Clock, Star, TrendingUp, Award, Target, Zap, Upload, ArrowRight, Lightbulb, CheckCircle, X } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import VideoHero from '@/components/VideoHero'
import ProjectSubmissionModal from '@/components/ProjectSubmissionModal'
import { formatDate } from '@/lib/utils'
import { useState } from 'react'

export default function Home() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([])
  
  const featuredWorkshops = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      facilitator: "Dr. Sarah Chen",
      date: "2024-01-15",
      duration: "2 hours",
      level: "Beginner",
      participants: 45,
      rating: 4.8,
      category: "Fundamentals"
    },
    {
      id: 2,
      title: "Deep Learning Fundamentals",
      facilitator: "Prof. Michael Rodriguez",
      date: "2024-01-20",
      duration: "3 hours",
      level: "Intermediate",
      participants: 32,
      rating: 4.9,
      category: "Advanced"
    },
    {
      id: 3,
      title: "AI Ethics and Bias",
      facilitator: "Dr. Emily Watson",
      date: "2024-01-25",
      duration: "1.5 hours",
      level: "All Levels",
      participants: 67,
      rating: 4.7,
      category: "Ethics"
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Natural Language Processing Workshop",
      date: "2024-02-05",
      time: "14:00",
      facilitator: "Dr. James Liu",
      location: "Conference Room A",
      attendees: 24
    },
    {
      id: 2,
      title: "Computer Vision Applications",
      date: "2024-02-10",
      time: "10:00",
      facilitator: "Sarah Johnson",
      location: "Virtual",
      attendees: 42
    }
  ]

  const features = [
    {
      icon: BookOpen,
      title: "Learning Workshops",
      description: "Comprehensive repository with advanced filtering",
      stats: "156 workshops available",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Calendar,
      title: "Live Events",
      description: "Interactive sessions with expert facilitators",
      stats: "12 upcoming events",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "Share knowledge and best practices",
      stats: "1,200+ active members",
      color: "from-emerald-500 to-teal-500"
    }
  ]

  const achievements = [
    { icon: Award, label: "Excellence Award", value: "2023" },
    { icon: Target, label: "Success Rate", value: "94%" },
    { icon: TrendingUp, label: "Growth", value: "+127%" },
    { icon: Zap, label: "Avg Response", value: "< 24h" }
  ]

  const handleEventRegister = (eventId: number) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId))
      alert('Event registration cancelled successfully!')
    } else {
      setRegisteredEvents([...registeredEvents, eventId])
      alert('Successfully registered for event! You will receive a confirmation email.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Video Hero Section */}
      <VideoHero
        title="AI Central Knowledge Hub"
        subtitle="Your centralized resource hub for AI learning, exploration, and implementation across the organization. Empowering teams with cutting-edge knowledge and practical insights."
        primaryCTA={{
          text: "Explore Workshops",
          href: "/workshops"
        }}
        secondaryCTA={{
          text: "View Events",
          href: "/events"
        }}
      />

      {/* Achievement Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="icon-container group-hover:scale-110 transition-transform duration-200">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{achievement.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 badge badge-primary mb-4">
              <Zap className="w-4 h-4" />
              <span>Platform Features</span>
            </div>
            <h2 className="heading-2 mb-6">
              Everything you need to master <span className="gradient-text">AI</span>
            </h2>
            <p className="text-hero max-w-3xl mx-auto">
              Discover a comprehensive learning ecosystem designed to accelerate your AI journey with expert-curated content and hands-on experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card card-hover p-8 text-center group">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-body mb-4">{feature.description}</p>
                  <div className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full inline-block">
                    {feature.stats}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Workshops */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 badge badge-success mb-4">
                <Star className="w-4 h-4" />
                <span>Top Rated</span>
              </div>
              <h2 className="heading-3 mb-4">Featured Workshops</h2>
              <p className="text-body">
                Handpicked workshops from our expert facilitators
              </p>
            </div>
            <Link href="/workshops" className="btn-ghost group hidden md:flex">
              <span>View All</span>
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {featuredWorkshops.map((workshop) => (
              <div key={workshop.id} className="card card-hover overflow-hidden group">
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`badge ${
                      workshop.level === 'Beginner' ? 'badge-success' :
                      workshop.level === 'Intermediate' ? 'badge-warning' :
                      'badge-primary'
                    }`}>
                      {workshop.level}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{workshop.rating}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs font-medium text-primary-600 mb-2">{workshop.category}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {workshop.title}
                  </h3>
                  <p className="text-gray-600 mb-4">by {workshop.facilitator}</p>
                </div>

                {/* Stats */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{workshop.participants} joined</span>
                    </div>
                  </div>
                  
                  <button className="btn-primary w-full group-hover:shadow-glow transition-all duration-200">
                    View Workshop
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/workshops" className="btn-secondary">
              View All Workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 badge badge-warning mb-4">
              <Calendar className="w-4 h-4" />
              <span>This Month</span>
            </div>
            <h2 className="heading-3 mb-4">Upcoming Events</h2>
            <p className="text-body max-w-2xl mx-auto">
              Join live sessions and interactive workshops with industry experts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="card card-hover p-6 group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">with {event.facilitator}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(event.date)}
                    </div>
                    <div className="text-sm text-gray-500">{event.time}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium text-gray-900">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Attendees</span>
                    <span className="font-medium text-gray-900">{event.attendees} registered</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {registeredEvents.includes(event.id) ? (
                    <>
                      <div className="btn bg-success-50 text-success-700 border border-success-200 cursor-default flex items-center justify-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Registered</span>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEventRegister(event.id)}
                          className="btn-ghost text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center space-x-2 text-sm flex-1"
                        >
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </button>
                        <button className="btn-secondary px-4">
                          <Calendar className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleEventRegister(event.id)}
                        className="btn-primary flex-1"
                      >
                        Register Now
                      </button>
                      <button className="btn-secondary px-4">
                        <Calendar className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/events" className="btn-ghost group">
              <span>View All Events</span>
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Project Submission CTA Section */}
      <section className="section-lg bg-gradient-to-br from-accent-500 via-accent-600 to-primary-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 glass-card mb-6">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">Share Your Innovation</span>
              </div>
              
              <h2 className="heading-2 mb-6">
                Got an AI Project? Share it with the Community!
              </h2>
              <p className="text-hero mb-8 text-gray-200">
                Showcase your AI innovations, get feedback from experts, and inspire others. Whether it&apos;s in development or already deployed, your project can help shape the future of AI in our organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsProjectModalOpen(true)}
                  className="btn btn-large bg-white text-primary-600 hover:bg-gray-100 group shadow-large"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  <span>Submit Your Project</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link href="/workshops" className="btn-ghost border-white/20 text-white hover:bg-white/10 btn-large group">
                  <span>Learn First</span>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Target, label: "Impact Focus", desc: "Show real business value" },
                { icon: Users, label: "Team Collaboration", desc: "Highlight your team's expertise" },
                { icon: TrendingUp, label: "Growth Metrics", desc: "Share measurable results" },
                { icon: Award, label: "Recognition", desc: "Get featured and recognized" },
              ].map((feature, index) => (
                <div key={index} className="glass-card text-center p-6">
                  <div className="icon-container mx-auto mb-4 border border-white/20">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.label}</h3>
                  <p className="text-sm text-gray-200">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container-custom relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="heading-2 mb-6">
              Ready to accelerate your AI journey?
            </h2>
            <p className="text-hero text-primary-100 mb-8">
              Join thousands of professionals already transforming their careers with AI knowledge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workshops" className="btn bg-white text-primary-600 hover:bg-gray-50 btn-large">
                Start Learning Today
              </Link>
              <Link href="/best-practices" className="btn glass border-white/20 text-white hover:bg-white/10 btn-large">
                Explore Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Submission Modal */}
      <ProjectSubmissionModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  )
} 