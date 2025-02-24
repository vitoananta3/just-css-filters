"use client"

import { useState } from "react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Home() {
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

  const filterStyle = {
    filter: `
      blur(${filters.blur}px)
      brightness(${filters.brightness}%)
      contrast(${filters.contrast}%)
      grayscale(${filters.grayscale}%)
      hue-rotate(${filters.hueRotate}deg)
      invert(${filters.invert}%)
      opacity(${filters.opacity}%)
      saturate(${filters.saturate}%)
      sepia(${filters.sepia}%)
    `,
  }

  const cssCode = `filter: ${filterStyle.filter.replace(/\s+/g, " ").trim()};`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode)
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl min-h-screen flex flex-col justify-center gap-16 -translate-y-8">
      <h1 className="text-2xl font-bold mb-4 text-center">just css filters</h1>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
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
          <div>
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
              <div className="relative w-full h-64">
                <Image
                  src="/placeholder.svg"
                  alt="Preview"
                  fill
                  style={filterStyle}
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">CSS Code</h2>
          <div className="relative">
            <Input value={cssCode} readOnly className="w-full pr-24 font-mono text-sm" />
            <Button onClick={copyToClipboard} className="absolute right-1 top-1" size="sm">
              Copy
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
        <span className="text-sm text-muted-foreground">
          {value.toFixed(step < 1 ? 1 : 0)}
          {unit}
        </span>
      </div>
      <Slider value={[value]} onValueChange={([newValue]) => onChange(newValue)} min={min} max={max} step={step} />
    </div>
  )
}

