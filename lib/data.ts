export interface Workshop {
  id: number
  title: string
  facilitator: string
  date: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  participants: number
  rating: number
  description: string
  topics: string[]
  recording?: string
  materials?: string
  status: 'completed' | 'ongoing' | 'upcoming'
}

export interface Event {
  id: number
  title: string
  date: string
  time: string
  facilitator: string
  location: string
  description: string
  capacity: number
  registered: number
  type: 'workshop' | 'seminar' | 'discussion' | 'hands-on'
}

export interface BestPractice {
  id: number
  title: string
  author: string
  date: string
  category: string
  description: string
  content: string
  likes: number
  comments: number
  tags: string[]
}

export const workshops: Workshop[] = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    facilitator: "Dr. Sarah Chen",
    date: "2024-01-15",
    duration: "2 hours",
    level: "Beginner",
    participants: 45,
    rating: 4.8,
    description: "A comprehensive introduction to machine learning concepts, algorithms, and practical applications.",
    topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"],
    recording: "https://example.com/recording1",
    materials: "https://example.com/materials1",
    status: "completed"
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
    description: "Dive deep into neural networks, backpropagation, and popular deep learning architectures.",
    topics: ["Neural Networks", "Backpropagation", "CNNs", "RNNs", "Transformers"],
    recording: "https://example.com/recording2",
    materials: "https://example.com/materials2",
    status: "completed"
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
    description: "Understanding ethical considerations in AI development and deployment.",
    topics: ["Bias in AI", "Fairness", "Transparency", "Accountability", "Privacy"],
    recording: "https://example.com/recording3",
    materials: "https://example.com/materials3",
    status: "completed"
  },
  {
    id: 4,
    title: "Computer Vision Basics",
    facilitator: "Dr. James Liu",
    date: "2024-02-01",
    duration: "2.5 hours",
    level: "Intermediate",
    participants: 28,
    rating: 4.6,
    description: "Introduction to computer vision techniques and applications.",
    topics: ["Image Processing", "Object Detection", "Image Classification", "OpenCV"],
    recording: "https://example.com/recording4",
    materials: "https://example.com/materials4",
    status: "completed"
  },
  {
    id: 5,
    title: "Natural Language Processing Workshop",
    facilitator: "Sarah Johnson",
    date: "2024-02-05",
    duration: "3 hours",
    level: "Advanced",
    participants: 0,
    rating: 0,
    description: "Advanced NLP techniques including transformers and language models.",
    topics: ["Text Processing", "Sentiment Analysis", "Named Entity Recognition", "Language Models"],
    status: "upcoming"
  }
]

export const events: Event[] = [
  {
    id: 1,
    title: "Natural Language Processing Workshop",
    date: "2024-02-05",
    time: "14:00",
    facilitator: "Dr. James Liu",
    location: "Conference Room A",
    description: "Hands-on workshop covering advanced NLP techniques and practical applications.",
    capacity: 30,
    registered: 18,
    type: "workshop"
  },
  {
    id: 2,
    title: "Computer Vision Applications",
    date: "2024-02-10",
    time: "10:00",
    facilitator: "Sarah Johnson",
    location: "Virtual",
    description: "Exploring real-world applications of computer vision in various industries.",
    capacity: 50,
    registered: 35,
    type: "seminar"
  },
  {
    id: 3,
    title: "AI Implementation Strategy Discussion",
    date: "2024-02-15",
    time: "16:00",
    facilitator: "Team Leaders",
    location: "Main Auditorium",
    description: "Open discussion on strategies for implementing AI solutions in our organization.",
    capacity: 100,
    registered: 67,
    type: "discussion"
  },
  {
    id: 4,
    title: "Hands-on: Building Your First AI Model",
    date: "2024-02-20",
    time: "09:00",
    facilitator: "Dr. Emily Watson",
    location: "Lab 1",
    description: "Practical session where participants build and deploy their first AI model.",
    capacity: 20,
    registered: 15,
    type: "hands-on"
  }
]

export const bestPractices: BestPractice[] = [
  {
    id: 1,
    title: "Data Quality Best Practices for ML Projects",
    author: "Alex Chen",
    date: "2024-01-30",
    category: "Data Management",
    description: "Essential practices for ensuring high-quality data in machine learning projects.",
    content: "Quality data is the foundation of successful ML projects. Here are key practices...",
    likes: 24,
    comments: 8,
    tags: ["data quality", "preprocessing", "validation", "ML"]
  },
  {
    id: 2,
    title: "Model Versioning and Deployment Strategies",
    author: "Maria Rodriguez",
    date: "2024-01-28",
    category: "MLOps",
    description: "Best practices for versioning ML models and implementing robust deployment pipelines.",
    content: "Effective model versioning is crucial for maintaining production ML systems...",
    likes: 31,
    comments: 12,
    tags: ["mlops", "deployment", "versioning", "production"]
  },
  {
    id: 3,
    title: "Ethical AI Development Framework",
    author: "Dr. Samuel Kim",
    date: "2024-01-25",
    category: "Ethics",
    description: "A comprehensive framework for developing AI systems with ethical considerations.",
    content: "Ethical AI development requires systematic consideration of bias, fairness...",
    likes: 42,
    comments: 18,
    tags: ["ethics", "bias", "fairness", "responsible ai"]
  },
  {
    id: 4,
    title: "Performance Monitoring for AI Models",
    author: "Lisa Wang",
    date: "2024-01-22",
    category: "Monitoring",
    description: "Strategies for monitoring AI model performance in production environments.",
    content: "Continuous monitoring is essential to ensure AI models maintain their performance...",
    likes: 19,
    comments: 6,
    tags: ["monitoring", "performance", "production", "metrics"]
  }
] 