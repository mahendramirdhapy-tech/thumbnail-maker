// components/editor/left-sidebar.tsx
'use client'

import { useCanvasStore } from '@/store/canvas-store'
import { Type, Image, Square, Download, Upload } from 'lucide-react'

export function LeftSidebar() {
  const { addText, addImage } = useCanvasStore()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      addImage(url)
    }
  }

  const handleAddText = () => {
    addText('New Text')
  }

  const handleExport = async (format: 'png' | 'jpg') => {
    const dataUrl = await useCanvasStore.getState().exportCanvas(format)
    if (dataUrl) {
      const link = document.createElement('a')
      link.download = `thumbnail.${format}`
      link.href = dataUrl
      link.click()
    }
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Tools</h3>
          <div className="space-y-2">
            <button 
              className="w-full flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={handleAddText}
            >
              <Type className="w-4 h-4 mr-2" />
              Add Text
            </button>

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

        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Export</h3>
          <div className="space-y-2">
            <button 
              onClick={() => handleExport('png')}
              className="w-full flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PNG
            </button>
            <button 
              onClick={() => handleExport('jpg')}
              className="w-full flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export JPG
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
