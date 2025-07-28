export default function TestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Central Test Page
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          If you can see this, the deployment is working.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>Build Time: {new Date().toISOString()}</p>
          <p>Next.js App Router: ✅ Working</p>
          <p>Vercel Deployment: ✅ Working</p>
        </div>
      </div>
    </div>
  )
} 