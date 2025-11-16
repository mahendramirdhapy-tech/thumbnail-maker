// components/editor/canvas-editor.tsx
'use client'

import dynamic from 'next/dynamic'

const FabricCanvas = dynamic(() => import('./fabric-canvas'), {
  ssr: false,
  loading: () => (
    <div className="w-[800px] h-[450px] bg-gray-200 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
      <div className="text-lg text-gray-500">Loading Canvas Editor...</div>
    </div>
  )
})

export function CanvasEditor() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Thumbnail Editor</h2>
        <p className="text-gray-600">Create your amazing thumbnail</p>
      </div>
      <FabricCanvas />
    </div>
  )
}
