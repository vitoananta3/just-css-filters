"use client"

import { useState } from "react"
import Image from "next/image"
// import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [imageUrl, setImageUrl] = useState("/image-preview.webp")

  const [isUploaded, setIsUploaded] = useState(false)

  const [isDownloaded, setIsDownloaded] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      setIsUploaded(true)
      setTimeout(() => {
        setIsUploaded(false)
      }, 2100)
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    const canvas = document.createElement('canvas')
    const img = new window.Image()

    img.crossOrigin = "anonymous"
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // ctx.filter = filterValue
        ctx.drawImage(img, 0, 0)
        link.download = 'filtered-image.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
    }
    img.src = imageUrl
    setIsDownloaded(true)
    setTimeout(() => {
      setIsDownloaded(false)
    }, 3400)
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl min-h-screen flex flex-col justify-center gap-16 -translate-y-8">
      <h1 className="text-2xl font-bold mb-4 text-center">just css filters</h1>
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-4">
            <div className="text-lg font-semibold">Filters Configurator</div>
            <div className="border rounded-lg p-4 space-y-4">
              {/* filters here */}
            </div>
          </div>
          <div>
            <div className="space-y-8">
              <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
              <div className="border rounded-lg p-4">
                <div className="relative w-full aspect-video">
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    // style={filterStyle}
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="flex gap-4 mt-4 justify-center">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button asChild>
                      <label htmlFor="image-upload">{isUploaded ? "Uploaded" : "Upload Image" }</label>
                    </Button>
                  </div>
                  <Button onClick={handleDownload}>{ isDownloaded ? "Downloaded" : "Download Image" }</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h2 className="text-lg font-semibold mb-2">CSS Code</h2>
        </div>
      </div>
    </div>
  )
}

// interface FilterSliderProps {
//   label: string
//   value: number
//   onChange: (value: number) => void
//   min: number
//   max: number
//   step?: number
//   unit: string
// }

// function FilterSlider({ label, value, onChange, min, max, step = 1, unit }: FilterSliderProps) {
//   return (
//     <div className="space-y-2">
//       <div className="flex justify-between">
//         <Label>{label}</Label>
//         <span className="text-sm font-semibold">
//           {value.toFixed(step < 1 ? 1 : 0)}
//           {unit}
//         </span>
//       </div>
//       <Slider value={[value]} onValueChange={([newValue]) => onChange(newValue)} min={min} max={max} step={step} />
//     </div>
//   )
// }

