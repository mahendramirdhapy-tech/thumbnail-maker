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
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvas: null,
  activeObject: null,
  zoom: 1,
  aspectRatio: '16:9',

  initCanvas: (canvas) => set({ canvas }),

  setActiveObject: (obj) => set({ activeObject: obj }),

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
      const width = ratio === '16:9' ? 1280 : 720
      const height = ratio === '16:9' ? 720 : 1280
      
      canvas.setDimensions({ width, height })
      set({ aspectRatio: ratio })
    }
  },

  addText: (text) => {
    const { canvas } = get()
    if (!canvas) return

    const fabric = require('fabric').fabric
    const textObj = new fabric.Text(text, {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 48,
      fill: '#000000',
    })

    canvas.add(textObj)
    canvas.setActiveObject(textObj)
    canvas.renderAll()
  },

  addImage: (url) => {
    const { canvas } = get()
    if (!canvas) return

    const fabric = require('fabric').fabric
    fabric.Image.fromURL(url, (img: any) => {
      img.scaleToWidth(300)
      canvas.add(img)
      canvas.setActiveObject(img)
      canvas.renderAll()
    })
  },

  exportCanvas: async (format) => {
    const { canvas } = get()
    if (!canvas) return ''

    return new Promise((resolve) => {
      const dataUrl = canvas.toDataURL({
        format: format === 'jpg' ? 'jpeg' : 'png',
        quality: 1,
      })
      resolve(dataUrl)
    })
  },
}))
