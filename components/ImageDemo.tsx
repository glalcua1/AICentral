import Image from 'next/image'

export default function ImageDemo() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Image Examples</h3>
      
      <div className="space-y-8">
        {/* Using Next.js Image component (Recommended) */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">AI Brain Concept</h4>
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src="/artificial-intelligence-brain.jpg"
              alt="Artificial Intelligence Brain Concept"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Regular img tag example */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Circuit Brain</h4>
          <img
            src="/graphic-digital-brain-human-head-outline-made-from-circuit-board-connecting-blue.jpg"
            alt="Digital Brain Circuit Board"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Cloud AI concept */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">AI Cloud Technology</h4>
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src="/ai-cloud-concept-with-robot-arms.jpg"
              alt="AI Cloud Concept with Robot Arms"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>

      {/* Code example */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Usage Example:</h4>
        <pre className="text-xs text-gray-600 overflow-x-auto">
{`import Image from 'next/image'

<Image
  src="/artificial-intelligence-brain.jpg"
  alt="AI Brain"
  width={400}
  height={300}
  className="rounded-lg"
/>`}
        </pre>
      </div>
    </div>
  )
} 