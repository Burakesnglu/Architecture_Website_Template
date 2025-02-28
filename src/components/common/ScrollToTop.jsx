import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  
  // Scroll pozisyonunu debounce ile kontrol et
  const handleScroll = () => {
    setIsVisible(window.pageYOffset > 400)
  }
  
  const debouncedHandleScroll = useDebounce(handleScroll, 150)

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll)
    return () => window.removeEventListener('scroll', debouncedHandleScroll)
  }, [debouncedHandleScroll])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-black text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-800 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      aria-label="Yukarı çık"
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
} 