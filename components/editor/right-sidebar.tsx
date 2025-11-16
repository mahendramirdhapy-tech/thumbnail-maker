'use client'

import { useCanvasStore } from '@/store/canvas-store'
import { Move, Layers, ArrowUp, ArrowDown, Trash2 } from 'lucide-react'

export function RightSidebar() {
  const { activeObject, canvas } = useCanvasStore()

  if (!activeObject) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="text-center text-gray-500">
          <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Select an object to edit properties</p>
        </div>
      </div>
    )
  }

  const handlePropertyChange = (property: string, value: any) => {
    if (!activeObject || !canvas) return
    activeObject.set(property, value)
    canvas.renderAll()
  }

  const bringForward = () => {
    if (!activeObject || !canvas) return
    activeObject.bringForward()
    canvas.renderAll()
  }

  const sendBackward = () => {
    if (!activeObject || !canvas) return
    activeObject.sendBackwards()
    canvas.renderAll()
  }

  const removeObject = () => {
    if (!activeObject || !canvas) return
    canvas.remove(activeObject)
    canvas.renderAll()
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Object Info */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 flex items-center">
            <Move className="w-4 h-4 mr-2" />
            Object Properties
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position X
              </label>
              <input
                type="number"
                value={Math.round(activeObject.left || 0)}
                onChange={(e) => handlePropertyChange('left', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position Y
              </label>
              <input
                type="number"
                value={Math.round(activeObject.top || 0)}
                onChange={(e) => handlePropertyChange('top', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Text Properties */}
        {activeObject.type === 'text' && (
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Text Properties</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <input
                  type="number"
                  value={(activeObject as any).fontSize || 48}
                  onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <input
                  type="color"
                  value={(activeObject as any).fill || '#000000'}
                  onChange={(e) => handlePropertyChange('fill', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Layer Controls */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Layer</h3>
          <div className="flex space-x-2">
            <button 
              onClick={bringForward}
              className="flex-1 flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button 
              onClick={sendBackward}
              className="flex-1 flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button 
              onClick={removeObject}
              className="flex-1 flex items-center justify-center p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
