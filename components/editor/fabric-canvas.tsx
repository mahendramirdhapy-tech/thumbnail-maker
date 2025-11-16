'use client'

import { useEffect, useRef } from 'react'
import { useCanvasStore } from '@/store/canvas-store'

export default function FabricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { initCanvas } = useCanvasStore()

  useEffect(() => {
    const initializeFabric = async () => {
      const fabricModule = await import('fabric')
      const fabric = fabricModule.fabric
      
      if (canvasRef.current) {
        const canvas = new fabric.Canvas(canvasRef.current, {
          width: 1280,
          height: 720,
          backgroundColor: '#ffffff',
        })

        // Basic events setup
        canvas.on('selection:created', (e: any) => {
          useCanvasStore.getState().setActiveObject(e.selected?.[0] || null)
        })

        canvas.on('selection:updated', (e: any) => {
          useCanvasStore.getState().setActiveObject(e.selected?.[0] || null)
        })

        canvas.on('selection:cleared', () => {
          useCanvasStore.getState().setActiveObject(null)
        })

        initCanvas(canvas)
      }
    }

    initializeFabric()

    return () => {
      // Cleanup
      if (useCanvasStore.getState().canvas) {
        useCanvasStore.getState().canvas?.dispose()
      }
    }
  }, [initCanvas])

  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-300 rounded shadow-sm"
    />
  )
}
