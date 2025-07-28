'use client'

import { useState } from 'react'
import { Clock, CheckCircle, XCircle, Eye, ExternalLink, MessageSquare, User, Calendar, DollarSign, Code, Target, Users, Lightbulb } from 'lucide-react'
import Header from '@/components/Header'
import { projects, Project, getProjectsByStatus } from '@/lib/projects'
import { formatDate } from '@/lib/utils'

export default function AdminApprovalPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [reviewComment, setReviewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const pendingProjects = getProjectsByStatus('pending')
  
  const handleApprove = async (project: Project) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Approved project:', project.id, 'Comment:', reviewComment)
    setIsSubmitting(false)
    setSelectedProject(null)
    setReviewComment('')
  }
  
  const handleReject = async (project: Project) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Rejected project:', project.id, 'Comment:', reviewComment)
    setIsSubmitting(false)
    setSelectedProject(null)
    setReviewComment('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="section-lg bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden pt-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container-custom relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass-card mb-8">
              <CheckCircle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Admin Panel</span>
            </div>
            
            <h1 className="heading-1 mb-6">Project Approval</h1>
            <p className="text-hero mb-8 text-gray-200">
              Review and approve AI project submissions from the community
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card text-center p-6">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <div className="text-3xl font-bold">{pendingProjects.length}</div>
                <div className="text-sm text-gray-200">Pending Review</div>
              </div>
              <div className="glass-card text-center p-6">
                <CheckCircle className="w-8 h-8 mx-auto mb-3" />
                <div className="text-3xl font-bold">{getProjectsByStatus('approved').length}</div>
                <div className="text-sm text-gray-200">Approved</div>
              </div>
              <div className="glass-card text-center p-6">
                <XCircle className="w-8 h-8 mx-auto mb-3" />
                <div className="text-3xl font-bold">{getProjectsByStatus('rejected').length}</div>
                <div className="text-sm text-gray-200">Revision Requested</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Projects List */}
            <div className="lg:col-span-1">
              <h2 className="heading-4 mb-6">Pending Projects ({pendingProjects.length})</h2>
              
              {pendingProjects.length > 0 ? (
                <div className="space-y-4">
                  {pendingProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`card cursor-pointer transition-all ${
                        selectedProject?.id === project.id 
                          ? 'ring-2 ring-primary-500 border-primary-200' 
                          : 'hover:shadow-medium'
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                            {project.projectName}
                          </h3>
                          <div className="badge badge-warning text-xs ml-2">
                            Pending
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{project.submittedBy.split('@')[0]}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(project.submittedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">All caught up!</h3>
                  <p className="text-gray-600">No projects pending review.</p>
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="lg:col-span-2">
              {selectedProject ? (
                <div className="card">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="heading-3 mb-2">{selectedProject.projectName}</h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>Submitted by {selectedProject.submittedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(selectedProject.submittedAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost btn-small"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </a>
                      )}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2 text-primary-600" />
                        Project Description
                      </h3>
                      <p className="text-gray-700">{selectedProject.description}</p>
                    </div>

                    {/* Objective & Impact */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-primary-600" />
                          Objective
                        </h3>
                        <p className="text-gray-700 text-sm">{selectedProject.objective}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-primary-600" />
                          Expected Impact
                        </h3>
                        <p className="text-gray-700 text-sm">{selectedProject.impact}</p>
                      </div>
                    </div>

                    {/* Team */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-primary-600" />
                        Team Members
                      </h3>
                      <p className="text-gray-700 text-sm">{selectedProject.team}</p>
                    </div>

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Timeline</div>
                        <div className="text-sm font-medium flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          {selectedProject.timeline || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Budget</div>
                        <div className="text-sm font-medium flex items-center">
                          <DollarSign className="w-3 h-3 mr-1 text-gray-400" />
                          {selectedProject.budget || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Technologies</div>
                        <div className="text-sm font-medium flex items-center">
                          <Code className="w-3 h-3 mr-1 text-gray-400" />
                          {selectedProject.technologies || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Category</div>
                        <div className="text-sm font-medium capitalize">
                          {selectedProject.category.replace('-', ' ')}
                        </div>
                      </div>
                    </div>

                    {/* Screenshots */}
                    {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Screenshots</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedProject.screenshots.map((screenshot, index) => (
                            <div key={index} className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                              <Eye className="w-8 h-8 text-gray-400" />
                              <span className="ml-2 text-sm text-gray-500">Screenshot {index + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Review Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Review & Decision</h3>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Review Comments
                        </label>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          placeholder="Provide feedback, suggestions, or reasons for your decision..."
                        />
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleApprove(selectedProject)}
                          disabled={isSubmitting || !reviewComment.trim()}
                          className="btn-primary flex items-center disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          )}
                          Approve Project
                        </button>
                        
                        <button
                          onClick={() => handleReject(selectedProject)}
                          disabled={isSubmitting || !reviewComment.trim()}
                          className="btn bg-red-600 text-white hover:bg-red-700 flex items-center disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-2" />
                          )}
                          Request Revision
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Select a project to review</h3>
                    <p className="text-gray-600">Choose a project from the list to view details and make approval decisions.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 