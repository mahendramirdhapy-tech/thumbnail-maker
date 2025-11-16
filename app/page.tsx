import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-bold">ThumbnailMaker</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link 
              href="/editor" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Start Creating
            </Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Create Stunning Thumbnails
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Professional YouTube thumbnails and Reels covers made easy. No design skills needed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/editor">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700">
              Start Creating Free
            </button>
          </Link>
          <Link href="/templates">
            <button className="border border-gray-300 bg-white px-8 py-4 rounded-lg text-lg hover:bg-gray-50">
              Browse Templates
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
