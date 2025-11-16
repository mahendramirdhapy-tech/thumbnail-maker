'use client'

import { useEffect, useState } from 'react'
import { CanvasEditor } from '@/components/editor/canvas-editor'
import { LeftSidebar } from '@/components/editor/left-sidebar'
import { RightSidebar } from '@/components/editor/right-sidebar'
import { TopBar } from '@/components/editor/top-bar'
import { useCanvasStore } from '@/store/canvas-store'

export default function EditorPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading Editor...</div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <div className="flex-1 flex items-center justify-center p-4">
          <CanvasEditor />
        </div>
        <RightSidebar />
      </div>
    </div>
  )
}
