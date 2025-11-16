'use client'

import { useCanvasStore } from '@/store/canvas-store'
import { Undo2, Redo2, Save, Download, Square } from 'lucide-react'

export function TopBar() {
  const { 
    aspectRatio, 
    setAspectRatio,
    undo,
    redo,
    exportCanvas
  } = useCanvasStore()

  const handleExport = async (format: 'png' | 'jpg') => {
    const dataUrl = await exportCanvas(format)
    if (dataUrl) {
      const link = document.createElement('a')
      link.download = `thumbnail.${format}`
      link.href = dataUrl
      link.click()
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button 
          onClick={undo}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button 
          onClick={redo}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Aspect Ratio Toggle */}
        <div className="flex items-center space-x-2">
          <Square className="w-4 h-4 text-gray-600" />
          <button
            className={`px-3 py-1 text-sm rounded-lg ${
              aspectRatio === '16:9' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setAspectRatio('16:9')}
          >
            16:9
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-lg ${
              aspectRatio === '9:16' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setAspectRatio('9:16')}
          >
            9:16
          </button>
        </div>

        {/* Save & Export */}
        <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
          <Save className="w-4 h-4 mr-2" />
          Save
        </button>

        <button 
          onClick={() => handleExport('png')}
          className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>
    </div>
  )
}
