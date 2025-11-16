// store/canvas-store.ts
import { create } from 'zustand'

interface CanvasState {
  canvas: any | null
  activeObject: any | null
  zoom: number
  aspectRatio: '16:9' | '9:16'
  
  // Actions
  initCanvas: (canvas: any) => void
  setActiveObject: (obj: any | null) => void
  setZoom: (zoom: number) => void
  setAspectRatio: (ratio: '16:9' | '9:16') => void
  addText: (text: string) => void
  addImage: (url: string) => void
  exportCanvas: (format: 'png' | 'jpg') => Promise<string>
  undo: () => void
  redo: () => void
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvas: null,
  activeObject: null,
  zoom: 1,
  aspectRatio: '16:9',

  initCanvas: (canvas) => {
    console.log('Canvas initialized in store')
    set({ canvas })
  },

  setActiveObject: (obj) => {
    set({ activeObject: obj })
  },

  setZoom: (zoom) => {
    const { canvas } = get()
    if (canvas) {
      canvas.setZoom(zoom)
      set({ zoom })
    }
  },

  setAspectRatio: (ratio) => {
    const { canvas } = get()
    if (canvas) {
      const width = ratio === '16:9' ? 800 : 450
      const height = ratio === '16:9' ? 450 : 800
      
      canvas.setDimensions({ width, height })
      set({ aspectRatio: ratio })
    }
  },

  addText: (text: string) => {
    const { canvas } = get()
    if (!canvas) {
      console.error('Canvas not available')
      return
    }

    try {
      // Fabric already loaded hai, directly use karo
      const fabric = (window as any).fabric
      if (!fabric) {
        console.error('Fabric not available')
        return
      }
      
      const textObj = new fabric.Text(text, {
        left: 100,
        top: 100,
        fontFamily: 'Arial',
        fontSize: 36,
        fill: '#000000',
        editable: true
      })

      canvas.add(textObj)
      canvas.setActiveObject(textObj)
      canvas.renderAll()
      console.log('Text added successfully:', text)
    } catch (error) {
      console.error('Error adding text:', error)
    }
  },

  addImage: (url: string) => {
    const { canvas } = get()
    if (!canvas) {
      console.error('Canvas not available')
      return
    }

    try {
      const fabric = (window as any).fabric
      if (!fabric) {
        console.error('Fabric not available')
        return
      }
      
      fabric.Image.fromURL(url, (img: any) => {
        img.scaleToWidth(200)
        canvas.add(img)
        canvas.setActiveObject(img)
        canvas.renderAll()
        console.log('Image added successfully')
      })
    } catch (error) {
      console.error('Error adding image:', error)
    }
  },

  exportCanvas: async (format: 'png' | 'jpg') => {
    const { canvas } = get()
    if (!canvas) {
      console.error('Canvas not available for export')
      return ''
    }

    return new Promise((resolve) => {
      try {
        const dataUrl = canvas.toDataURL({
          format: format === 'jpg' ? 'jpeg' : 'png',
          quality: 1,
        })
        resolve(dataUrl)
      } catch (error) {
        console.error('Export error:', error)
        resolve('')
      }
    })
  },

  undo: () => {
    console.log('Undo functionality')
  },

  redo: () => {
    console.log('Redo functionality')
  },
}))
