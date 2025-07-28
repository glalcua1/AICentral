export default function BackupHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Central Knowledge Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your centralized platform for AI learning, workshops, and knowledge sharing.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Workshops</h3>
              <p className="text-gray-600 mb-4">Join expert-led AI workshops</p>
              <a href="/workshops" className="text-blue-600 hover:text-blue-800">
                View Workshops →
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Events</h3>
              <p className="text-gray-600 mb-4">Register for upcoming AI events</p>
              <a href="/events" className="text-blue-600 hover:text-blue-800">
                View Events →
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Projects</h3>
              <p className="text-gray-600 mb-4">Explore AI project showcase</p>
              <a href="/projects" className="text-blue-600 hover:text-blue-800">
                View Projects →
              </a>
            </div>
          </div>
          
          <div className="mt-16 text-sm text-gray-500">
            <p>Build Status: ✅ Deployed Successfully</p>
            <p>Last Updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 