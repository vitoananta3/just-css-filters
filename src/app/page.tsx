"use client"

import { useState } from "react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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
        ctx.filter = filterValue
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

  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    opacity: 100,
    saturate: 100,
    sepia: 0,
  })

  const handleFilterChange = (filter: string, value: number) => {
    setFilters((prev) => ({ ...prev, [filter]: value }))
  }

  const filterValue = `blur(${filters.blur}px) brightness(${filters.brightness}%) contrast(${filters.contrast}%) grayscale(${filters.grayscale}%) hue-rotate(${filters.hueRotate}deg) invert(${filters.invert}%) opacity(${filters.opacity}%) saturate(${filters.saturate}%) sepia(${filters.sepia}%)`

  const filterStyle = {
    WebkitFilter: filterValue,
    MozFilter: filterValue,
    filter: filterValue,
  }

  const [isCopied, setIsCopied] = useState(false)

  const cssCode = `filter: ${filterValue}; 
-webkit-filter: ${filterValue}; 
-moz-filter: ${filterValue};`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2100)
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl min-h-screen flex flex-col justify-center gap-16 -translate-y-8">
      <h1 className="text-2xl font-bold mb-4 text-center">just css filters</h1>
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-4">
            <div className="text-lg font-semibold">Filters Configurator</div>
            <div className="border rounded-lg p-4 space-y-4">
            <FilterSlider
                label="Blur"
                value={filters.blur}
                onChange={(value) => handleFilterChange("blur", value)}
                min={0}
                max={20}
                step={0.1}
                unit="px"
              />
              <FilterSlider
                label="Brightness"
                value={filters.brightness}
                onChange={(value) => handleFilterChange("brightness", value)}
                min={0}
                max={200}
                unit="%"
              />
              <FilterSlider
                label="Contrast"
                value={filters.contrast}
                onChange={(value) => handleFilterChange("contrast", value)}
                min={0}
                max={200}
                unit="%"
              />
              <FilterSlider
                label="Grayscale"
                value={filters.grayscale}
                onChange={(value) => handleFilterChange("grayscale", value)}
                min={0}
                max={100}
                unit="%"
              />
              <FilterSlider
                label="Hue Rotate"
                value={filters.hueRotate}
                onChange={(value) => handleFilterChange("hueRotate", value)}
                min={0}
                max={360}
                unit="deg"
              />
              <FilterSlider
                label="Invert"
                value={filters.invert}
                onChange={(value) => handleFilterChange("invert", value)}
                min={0}
                max={100}
                unit="%"
              />
              <FilterSlider
                label="Opacity"
                value={filters.opacity}
                onChange={(value) => handleFilterChange("opacity", value)}
                min={0}
                max={100}
                unit="%"
              />
              <FilterSlider
                label="Saturate"
                value={filters.saturate}
                onChange={(value) => handleFilterChange("saturate", value)}
                min={0}
                max={200}
                unit="%"
              />
              <FilterSlider
                label="Sepia"
                value={filters.sepia}
                onChange={(value) => handleFilterChange("sepia", value)}
                min={0}
                max={100}
                unit="%"
              />
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
                    style={filterStyle}
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
          <div className="relative">
            <Textarea
              value={cssCode}
              readOnly
              className="w-full pr-24 font-mono text-sm resize-none"
              rows={3}
            />
            <Button onClick={copyToClipboard} className="absolute right-1 top-1" size="sm">
            {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FilterSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit: string
}

function FilterSlider({ label, value, onChange, min, max, step = 1, unit }: FilterSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{label}</Label>
        <span className="text-sm font-semibold">
          {value.toFixed(step < 1 ? 1 : 0)}
          {unit}
        </span>
      </div>
      <Slider value={[value]} onValueChange={([newValue]) => onChange(newValue)} min={min} max={max} step={step} />
    </div>
  )
}

