import { create } from 'zustand'

interface CanvasState {
  canvas: any | null
  activeObject: any | null
  zoom: number
  aspectRatio: '16:9' | '9:16'
  history: string[]
  historyIndex: number
  
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
  saveToHistory: () => void
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvas: null,
  activeObject: null,
  zoom: 1,
  aspectRatio: '16:9',
  history: [],
  historyIndex: -1,

  initCanvas: (canvas) => {
    set({ canvas })
    get().saveToHistory()
  },

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
      get().saveToHistory()
    }
  },

  addText: async (text: string) => {
    const { canvas } = get()
    if (!canvas) return

    const fabricModule = await import('fabric')
    const fabric = fabricModule.fabric
    
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
    get().saveToHistory()
  },

  addImage: async (url: string) => {
    const { canvas } = get()
    if (!canvas) return

    const fabricModule = await import('fabric')
    const fabric = fabricModule.fabric
    
    fabric.Image.fromURL(url, (img: any) => {
      img.scaleToWidth(300)
      canvas.add(img)
      canvas.setActiveObject(img)
      canvas.renderAll()
      get().saveToHistory()
    })
  },

  exportCanvas: async (format: 'png' | 'jpg') => {
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

  undo: () => {
    const { canvas, history, historyIndex } = get()
    if (!canvas || historyIndex <= 0) return

    const newIndex = historyIndex - 1
    const fabricModule = require('fabric')
    const fabric = fabricModule.fabric
    
    canvas.loadFromJSON(history[newIndex], () => {
      canvas.renderAll()
      set({ historyIndex: newIndex })
    })
  },

  redo: () => {
    const { canvas, history, historyIndex } = get()
    if (!canvas || historyIndex >= history.length - 1) return

    const newIndex = historyIndex + 1
    const fabricModule = require('fabric')
    const fabric = fabricModule.fabric
    
    canvas.loadFromJSON(history[newIndex], () => {
      canvas.renderAll()
      set({ historyIndex: newIndex })
    })
  },

  saveToHistory: () => {
    const { canvas, history, historyIndex } = get()
    if (!canvas) return

    const json = JSON.stringify(canvas.toJSON())
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(json)
    
    set({ 
      history: newHistory,
      historyIndex: newHistory.length - 1 
    })
  },
}))
