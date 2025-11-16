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
    console.log('Adding text...')
    addText('New Text - Double click to edit')
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
        <div className="bg-blue-50 p-3 rounded-lg">
          <h2 className="font-bold text-blue-800">Editor Tools</h2>
          <p className="text-sm text-blue-600">Click buttons to add elements</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Text Tools</h3>
          <div className="space-y-2">
            <button 
              className="w-full flex items-center px-3 py-3 text-sm border border-blue-300 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              onClick={handleAddText}
            >
              <Type className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium">Add Text</span>
            </button>
            <p className="text-xs text-gray-500">Click to add editable text</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Image Tools</h3>
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <button 
              className="w-full flex items-center px-3 py-3 text-sm border border-green-300 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Upload className="w-5 h-5 mr-2 text-green-600" />
              <span className="font-medium">Upload Image</span>
            </button>
            <p className="text-xs text-gray-500">Select image from your device</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Shapes</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Square className="w-4 h-4 mr-2" />
              Rectangle
            </button>
            <button className="flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
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
              className="w-full flex items-center px-3 py-2 text-sm border border-purple-300 bg-purple-50 rounded-lg hover:bg-purple-100"
            >
              <Download className="w-4 h-4 mr-2 text-purple-600" />
              Export PNG
            </button>
            <button 
              onClick={() => handleExport('jpg')}
              className="w-full flex items-center px-3 py-2 text-sm border border-purple-300 bg-purple-50 rounded-lg hover:bg-purple-100"
            >
              <Download className="w-4 h-4 mr-2 text-purple-600" />
              Export JPG
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
