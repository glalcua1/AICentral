'use client'

import { useState } from 'react'
import { Clock, CheckCircle, XCircle, Eye, Heart, ExternalLink, Edit3, Trash2, AlertCircle } from 'lucide-react'
import Header from '@/components/Header'
import { projects, Project } from '@/lib/projects'
import { formatDate } from '@/lib/utils'

export default function MyProjectsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  
  // Simulate current user (in real app, this would come from auth)
  const currentUserEmail = "jennifer.kim@company.com"
  
  // Filter projects by current user
  const userProjects = projects.filter(project => project.submittedBy === currentUserEmail)
  
  const filteredProjects = selectedStatus === 'all' 
    ? userProjects 
    : userProjects.filter(project => project.status === selectedStatus)

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-warning-600" />
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-success-600" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-error-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'pending':
        return 'badge-warning'
      case 'approved':
        return 'badge-success'
      case 'rejected':
        return 'badge-error'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const statusCounts = {
    all: userProjects.length,
    pending: userProjects.filter(p => p.status === 'pending').length,
    approved: userProjects.filter(p => p.status === 'approved').length,
    rejected: userProjects.filter(p => p.status === 'rejected').length,
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
              <Edit3 className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Project Portfolio</span>
            </div>
            
            <h1 className="heading-1 mb-6">My AI Projects</h1>
            <p className="text-hero mb-8 text-gray-200">
              Track your project submissions, view approval status, and manage your AI innovation portfolio
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Projects', value: statusCounts.all, icon: Edit3 },
                { label: 'Pending Review', value: statusCounts.pending, icon: Clock },
                { label: 'Approved', value: statusCounts.approved, icon: CheckCircle },
                { label: 'Needs Revision', value: statusCounts.rejected, icon: XCircle },
              ].map((stat, index) => (
                <div key={index} className="glass-card text-center p-4">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="section bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Projects', count: statusCounts.all },
              { key: 'pending', label: 'Pending Review', count: statusCounts.pending },
              { key: 'approved', label: 'Approved', count: statusCounts.approved },
              { key: 'rejected', label: 'Needs Revision', count: statusCounts.rejected },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedStatus(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedStatus === filter.key
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          {filteredProjects.length > 0 ? (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="card card-hover">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`badge ${getStatusColor(project.status)} flex items-center space-x-1`}>
                            {getStatusIcon(project.status)}
                            <span className="capitalize">{project.status}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Submitted {formatDate(project.submittedAt)}
                          </div>
                        </div>
                        <h3 className="heading-4 mb-3">{project.projectName}</h3>
                        <p className="text-body text-gray-600 mb-4">{project.description}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-6">
                        <button className="btn-ghost btn-small">
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button className="btn-ghost btn-small text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Objective</h4>
                        <p className="text-sm text-gray-600">{project.objective}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Expected Impact</h4>
                        <p className="text-sm text-gray-600">{project.impact}</p>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Timeline</div>
                        <div className="text-sm font-medium">{project.timeline || 'Not specified'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Budget</div>
                        <div className="text-sm font-medium">{project.budget || 'Not specified'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Technologies</div>
                        <div className="text-sm font-medium">{project.technologies || 'Not specified'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase mb-1">Category</div>
                        <div className="text-sm font-medium capitalize">{project.category.replace('-', ' ')}</div>
                      </div>
                    </div>

                    {/* Review Information */}
                    {project.status === 'approved' && (
                      <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-success-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-success-800 mb-1">Project Approved!</h4>
                            <p className="text-sm text-success-700 mb-2">{project.reviewComments}</p>
                            <div className="text-xs text-success-600">
                              Reviewed by {project.reviewedBy} on {project.reviewedAt && formatDate(project.reviewedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.status === 'rejected' && (
                      <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-3">
                          <XCircle className="w-5 h-5 text-error-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-error-800 mb-1">Revision Requested</h4>
                            <p className="text-sm text-error-700 mb-2">{project.reviewComments}</p>
                            <div className="text-xs text-error-600">
                              Reviewed by {project.reviewedBy} on {project.reviewedAt && formatDate(project.reviewedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {project.status === 'approved' && (
                          <>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{project.views || 0} views</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{project.likes || 0} likes</span>
                            </div>
                          </>
                        )}
                        <div className="text-xs">
                          ID: {project.id}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost btn-small"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </a>
                        )}
                        {project.status === 'approved' && (
                          <button className="btn-primary btn-small">
                            View Public Page
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Edit3 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="heading-4 mb-4">No projects found</h3>
              <p className="text-body text-gray-600 mb-8 max-w-md mx-auto">
                {selectedStatus === 'all' 
                  ? "You haven't submitted any projects yet. Start by sharing your AI innovations with the community!"
                  : `No projects with status "${selectedStatus}" found.`}
              </p>
              <button className="btn-primary">
                Submit New Project
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 