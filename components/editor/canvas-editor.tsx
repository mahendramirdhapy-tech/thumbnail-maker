'use client'

import dynamic from 'next/dynamic'

const FabricCanvas = dynamic(() => import('./fabric-canvas'), {
  ssr: false,
  loading: () => (
    <div className="w-[1280px] h-[720px] bg-gray-200 flex items-center justify-center rounded-lg">
      <div className="text-lg">Loading Canvas Editor...</div>
    </div>
  )
})

export function CanvasEditor() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <FabricCanvas />
    </div>
  )
}
