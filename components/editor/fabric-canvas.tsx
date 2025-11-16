// components/editor/fabric-canvas.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useCanvasStore } from '@/store/canvas-store'

export default function FabricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { initCanvas } = useCanvasStore()

  useEffect(() => {
    const initializeFabric = async () => {
      try {
        const fabricModule = await import('fabric')
        const fabric = fabricModule.fabric
        
        if (canvasRef.current) {
          // Canvas dispose karo agar pehle se hai
          if (useCanvasStore.getState().canvas) {
            useCanvasStore.getState().canvas?.dispose()
          }

          const canvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 450,
            backgroundColor: '#ffffff',
          })

          console.log('Fabric canvas initialized successfully')

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

          // Default text add karo
          const text = new fabric.Text('Add Your Text Here', {
            left: 50,
            top: 50,
            fontFamily: 'Arial',
            fontSize: 36,
            fill: '#000000',
          })
          canvas.add(text)
          canvas.renderAll()

          initCanvas(canvas)
        }
      } catch (error) {
        console.error('Error initializing fabric:', error)
      }
    }

    initializeFabric()

    return () => {
      // Cleanup
      const canvas = useCanvasStore.getState().canvas
      if (canvas) {
        canvas.dispose()
      }
    }
  }, [initCanvas])

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-300 rounded-lg shadow-md"
        width={800}
        height={450}
      />
      <div className="mt-4 text-sm text-gray-500">
        Canvas Size: 800x450px (16:9)
      </div>
    </div>
  )
}
