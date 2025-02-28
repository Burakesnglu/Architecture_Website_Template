import { useState, useEffect } from 'react'

export default function OptimizedImage({ src, alt, className }) {
  const [imageSrc, setImageSrc] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true)
    setImageSrc('')
    
    if (!src) return
    
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImageSrc(src)
      setIsLoading(false)
    }
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`)
      setIsLoading(false)
    }
    
    // Cleanup function
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img 
        src={imageSrc || src} // Use src as fallback while loading
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
} 