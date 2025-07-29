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

export interface Resource {
  id: number
  title: string
  description: string
  type: 'newsletter' | 'blog' | 'paper' | 'tool' | 'course' | 'podcast' | 'video'
  url: string
  author?: string
  organization?: string
  frequency?: string // For newsletters
  tags: string[]
  featured: boolean
  subscribers?: number // For newsletters
  rating?: number
  lastUpdated?: string
}

export const workshops: Workshop[] = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    facilitator: "Dr. Sarah Chen",
    date: "2025-02-15",
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
    date: "2025-02-20",
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
    date: "2025-02-25",
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
    date: "2025-03-01",
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
    date: "2025-03-05",
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
    date: "2025-03-05",
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
    date: "2025-03-10",
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
    date: "2025-03-15",
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
    date: "2025-03-20",
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
    date: "2025-02-28",
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
    date: "2025-02-28",
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
    date: "2025-02-25",
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
    date: "2025-02-22",
    category: "Monitoring",
    description: "Strategies for monitoring AI model performance in production environments.",
    content: "Continuous monitoring is essential to ensure AI models maintain their performance...",
    likes: 19,
    comments: 6,
    tags: ["monitoring", "performance", "production", "metrics"]
  }
]

export const resources: Resource[] = [
  // Newsletters
  {
    id: 1,
    title: "The Batch by DeepLearning.AI",
    description: "Weekly newsletter featuring the latest developments in AI and machine learning, curated by Andrew Ng and team.",
    type: "newsletter",
    url: "https://www.deeplearning.ai/the-batch/",
    organization: "DeepLearning.AI",
    frequency: "Weekly",
    tags: ["AI news", "machine learning", "research", "industry"],
    featured: true,
    subscribers: 200000,
    rating: 4.8
  },
  {
    id: 2,
    title: "AI Research Newsletter",
    description: "Comprehensive weekly roundup of the most important AI research papers, trends, and breakthroughs.",
    type: "newsletter",
    url: "https://airesearch.com/newsletter",
    author: "Dr. Sarah Chen",
    frequency: "Weekly",
    tags: ["research", "papers", "AI", "deep learning"],
    featured: true,
    subscribers: 75000,
    rating: 4.7
  },
  {
    id: 3,
    title: "MLOps Weekly",
    description: "Stay updated with the latest tools, practices, and insights in Machine Learning Operations.",
    type: "newsletter",
    url: "https://mlopsweekly.com",
    frequency: "Weekly",
    tags: ["MLOps", "deployment", "infrastructure", "production"],
    featured: false,
    subscribers: 45000,
    rating: 4.6
  },
  
  // Tools & Platforms
  {
    id: 4,
    title: "Weights & Biases",
    description: "Developer tools for machine learning experiment tracking, model management, and team collaboration.",
    type: "tool",
    url: "https://wandb.ai",
    organization: "Weights & Biases",
    tags: ["experiment tracking", "MLOps", "collaboration", "model management"],
    featured: true,
    rating: 4.9
  },
  {
    id: 5,
    title: "Hugging Face Hub",
    description: "The largest collection of pre-trained models, datasets, and spaces for machine learning.",
    type: "tool",
    url: "https://huggingface.co",
    organization: "Hugging Face",
    tags: ["models", "datasets", "transformers", "NLP"],
    featured: true,
    rating: 4.8
  },
  {
    id: 6,
    title: "MLflow",
    description: "Open source platform for the machine learning lifecycle, including experimentation and model deployment.",
    type: "tool",
    url: "https://mlflow.org",
    organization: "Databricks",
    tags: ["MLOps", "open source", "experiment tracking", "deployment"],
    featured: false,
    rating: 4.5
  },

  // Research Papers & Blogs
  {
    id: 7,
    title: "Distill",
    description: "Interactive visual explanations of machine learning concepts and research papers.",
    type: "blog",
    url: "https://distill.pub",
    tags: ["research", "visualization", "education", "interpretability"],
    featured: true,
    rating: 4.9
  },
  {
    id: 8,
    title: "OpenAI Blog",
    description: "Latest research findings, product updates, and insights from OpenAI researchers and engineers.",
    type: "blog",
    url: "https://openai.com/blog",
    organization: "OpenAI",
    tags: ["research", "GPT", "language models", "AI safety"],
    featured: true,
    rating: 4.8
  },
  {
    id: 9,
    title: "Google AI Blog",
    description: "Research advances and applications of artificial intelligence from Google's AI teams.",
    type: "blog",
    url: "https://ai.googleblog.com",
    organization: "Google AI",
    tags: ["research", "applications", "breakthroughs", "technology"],
    featured: false,
    rating: 4.7
  },

  // Courses & Education
  {
    id: 10,
    title: "CS229: Machine Learning",
    description: "Stanford's comprehensive machine learning course taught by Andrew Ng, covering algorithms and applications.",
    type: "course",
    url: "https://cs229.stanford.edu",
    organization: "Stanford University",
    author: "Andrew Ng",
    tags: ["education", "algorithms", "theory", "practical"],
    featured: true,
    rating: 4.9
  },
  {
    id: 11,
    title: "Fast.ai Deep Learning Course",
    description: "Practical deep learning for coders - learn to build state-of-the-art models without a PhD.",
    type: "course",
    url: "https://course.fast.ai",
    organization: "fast.ai",
    tags: ["practical", "deep learning", "coding", "hands-on"],
    featured: true,
    rating: 4.8
  },
  {
    id: 12,
    title: "MIT 6.034 Artificial Intelligence",
    description: "Introduction to artificial intelligence covering problem solving, search, games, and machine learning.",
    type: "course",
    url: "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/",
    organization: "MIT",
    tags: ["fundamentals", "AI", "problem solving", "theory"],
    featured: false,
    rating: 4.6
  },

  // Podcasts
  {
    id: 13,
    title: "Lex Fridman Podcast",
    description: "Conversations about AI, science, technology, and life with leading researchers and thinkers.",
    type: "podcast",
    url: "https://lexfridman.com/podcast/",
    author: "Lex Fridman",
    tags: ["interviews", "AI research", "philosophy", "technology"],
    featured: true,
    rating: 4.8
  },
  {
    id: 14,
    title: "The AI Podcast by NVIDIA",
    description: "Weekly discussions about artificial intelligence, machine learning, and deep learning innovations.",
    type: "podcast",
    url: "https://blogs.nvidia.com/ai-podcast/",
    organization: "NVIDIA",
    tags: ["industry", "innovation", "applications", "hardware"],
    featured: false,
    rating: 4.5
  },

  // Videos & Conferences
  {
    id: 15,
    title: "3Blue1Brown Neural Networks",
    description: "Intuitive visual explanation of how neural networks work, perfect for understanding the fundamentals.",
    type: "video",
    url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
    author: "Grant Sanderson",
    tags: ["education", "neural networks", "visualization", "fundamentals"],
    featured: true,
    rating: 4.9
  },
  {
    id: 16,
    title: "NeurIPS Conference",
    description: "Premier conference on neural information processing systems, featuring cutting-edge AI research.",
    type: "video",
    url: "https://neurips.cc",
    tags: ["conference", "research", "papers", "networking"],
    featured: true,
    rating: 4.8
  }
] 