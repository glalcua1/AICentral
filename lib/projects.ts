export interface Project {
  id: number
  projectName: string
  objective: string
  impact: string
  team: string
  description: string
  category: string
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  timeline?: string
  budget?: string
  technologies?: string
  link?: string
  screenshots: string[]
  submittedBy: string
  submittedAt: string
  reviewedBy?: string
  reviewedAt?: string
  reviewComments?: string
  featured?: boolean
  likes?: number
  views?: number
}

// Sample submitted projects data
export const projects: Project[] = [
  {
    id: 1,
    projectName: "Customer Service AI Chatbot",
    objective: "Automate customer support responses and reduce response time by 70%",
    impact: "Handling 500+ queries daily, reduced support costs by $50k annually",
    team: "Sarah Johnson (Lead), Mike Chen (Developer), Anna Williams (UX)",
    description: "An intelligent chatbot that handles customer inquiries using natural language processing. Integrated with our CRM system and trained on 10,000+ support tickets.",
    category: "chatbots",
    status: "approved",
    timeline: "3 months",
    budget: "$25k - $35k", 
    technologies: "Python, TensorFlow, Dialogflow, React",
    link: "https://github.com/company/customer-ai-bot",
    screenshots: ["/images/projects/chatbot-1.jpg", "/images/projects/chatbot-2.jpg"],
    submittedBy: "sarah.johnson@company.com",
    submittedAt: "2024-01-15T10:30:00Z",
    reviewedBy: "john.smith@company.com",
    reviewedAt: "2024-01-20T14:15:00Z",
    reviewComments: "Excellent implementation with measurable business impact. Great documentation.",
    featured: true,
    likes: 24,
    views: 156
  },
  {
    id: 2,
    projectName: "Predictive Maintenance System",
    objective: "Predict equipment failures before they occur to minimize downtime",
    impact: "Reduced unplanned downtime by 45%, saving $200k in maintenance costs",
    team: "David Lee (ML Engineer), Maria Garcia (Data Scientist), Tom Wilson (DevOps)",
    description: "Machine learning model that analyzes sensor data from manufacturing equipment to predict failures up to 2 weeks in advance.",
    category: "machine-learning",
    status: "approved",
    timeline: "4 months",
    budget: "$40k - $60k",
    technologies: "Python, scikit-learn, Apache Kafka, Grafana",
    link: "https://github.com/company/predictive-maintenance",
    screenshots: ["/images/projects/maintenance-1.jpg"],
    submittedBy: "david.lee@company.com", 
    submittedAt: "2024-01-22T09:45:00Z",
    reviewedBy: "john.smith@company.com",
    reviewedAt: "2024-01-25T16:20:00Z",
    reviewComments: "Outstanding ROI and clear business value. Well-executed project.",
    featured: true,
    likes: 18,
    views: 132
  },
  {
    id: 3,
    projectName: "Document Intelligence Scanner",
    objective: "Automatically extract and categorize information from legal documents",
    impact: "Processing time reduced from 2 hours to 5 minutes per document",
    team: "Jennifer Kim (AI Specialist), Robert Brown (Software Engineer)",
    description: "OCR and NLP solution that processes legal contracts, extracts key terms, and flags potential issues for review.",
    category: "nlp",
    status: "pending",
    timeline: "2 months",
    budget: "$15k - $25k",
    technologies: "Python, Tesseract, spaCy, FastAPI",
    link: "https://github.com/company/doc-intelligence",
    screenshots: ["/images/projects/document-1.jpg", "/images/projects/document-2.jpg"],
    submittedBy: "jennifer.kim@company.com",
    submittedAt: "2024-02-01T11:20:00Z",
    likes: 0,
    views: 0
  },
  {
    id: 4,
    projectName: "Inventory Optimization AI",
    objective: "Optimize inventory levels using demand forecasting",
    impact: "Projected 30% reduction in holding costs and 15% improvement in stock availability",
    team: "Alex Rodriguez (Data Scientist), Lisa Chang (Business Analyst)",
    description: "Time series forecasting model that predicts demand patterns and recommends optimal inventory levels for different product categories.",
    category: "analytics",
    status: "pending", 
    timeline: "6 weeks",
    budget: "$20k - $30k",
    technologies: "R, Prophet, Tableau, SQL",
    screenshots: ["/images/projects/inventory-1.jpg"],
    submittedBy: "alex.rodriguez@company.com",
    submittedAt: "2024-02-05T14:30:00Z",
    likes: 0,
    views: 0
  },
  {
    id: 5,
    projectName: "Smart Email Classifier", 
    objective: "Automatically classify and route incoming emails to appropriate departments",
    impact: "Estimated 40% faster email response times and improved customer satisfaction",
    team: "Chris Taylor (ML Engineer), Nancy White (Product Manager)",
    description: "Email classification system using transformer models to automatically categorize and prioritize incoming customer emails.",
    category: "nlp",
    status: "rejected",
    timeline: "3 months", 
    budget: "$30k - $45k",
    technologies: "Python, BERT, FastAPI, PostgreSQL",
    screenshots: ["/images/projects/email-1.jpg"],
    submittedBy: "chris.taylor@company.com",
    submittedAt: "2024-01-28T16:15:00Z",
    reviewedBy: "john.smith@company.com", 
    reviewedAt: "2024-02-02T10:30:00Z",
    reviewComments: "Good concept but overlaps with existing email automation. Suggest focusing on specific high-value use cases first.",
    likes: 0,
    views: 23
  }
]

export const getProjectsByStatus = (status: Project['status']) => {
  return projects.filter(project => project.status === status)
}

export const getProjectsByUser = (userEmail: string) => {
  return projects.filter(project => project.submittedBy === userEmail)
}

export const getFeaturedProjects = () => {
  return projects.filter(project => project.status === 'approved' && project.featured)
}

export const getApprovedProjects = () => {
  return projects.filter(project => project.status === 'approved')
} 