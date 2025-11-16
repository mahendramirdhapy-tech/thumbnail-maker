'use client'

import { useCanvasStore } from '@/store/canvas-store'
import { Type, Image, Square, Star, Download, Upload } from 'lucide-react'

export function LeftSidebar() {
  const { addText, addImage } = useCanvasStore()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      addImage(url)
    }
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Templates */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Templates</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              YouTube
            </div>
            <div className="aspect-[9/16] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              Reels
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Text</h3>
          <button 
            className="w-full flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => addText('Click to Edit Text')}
          >
            <Type className="w-4 h-4 mr-2" />
            Add Text
          </button>
        </div>

        {/* Images */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Images</h3>
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <button 
              className="w-full flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </button>
          </div>
        </div>

        {/* Shapes */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Shapes</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Square className="w-4 h-4 mr-2" />
              Rectangle
            </button>
            <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Square className="w-4 h-4 mr-2" />
              Circle
            </button>
          </div>
        </div>

        {/* Export */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Export</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export PNG
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export JPG
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
