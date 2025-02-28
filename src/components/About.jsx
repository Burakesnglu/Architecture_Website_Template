import { useState, useEffect } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about')
      if (element) {
        const position = element.getBoundingClientRect()
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Left Side - Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
                alt="Architectural Office"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gray-700 text-white p-6 rounded-lg hidden md:block">
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm">Years of Experience</p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Modern Architectural Vision</h2>
            <p className="text-gray-700 dark:text-gray-100 leading-relaxed">
              With over 20 years of experience, we deliver modern architectural designs and innovative solutions. 
              In every project, we combine sustainability, aesthetics, and functionality.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">300+</h3>
                <p className="text-gray-700 dark:text-gray-100">Completed Projects</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">150+</h3>
                <p className="text-gray-700 dark:text-gray-100">Satisfied Clients</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">50+</h3>
                <p className="text-gray-700 dark:text-gray-100">Awards</p>
              </div>
            </div>

            <button className="mt-8 bg-gray-700 dark:bg-gray-200 text-white dark:text-black px-8 py-3 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-300 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 