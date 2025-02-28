import OptimizedImage from './common/OptimizedImage'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black dark:bg-gray-900">
      {/* Background Slider */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Modern Architecture"
            className="w-full h-full opacity-70"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-screen-2xl mx-auto px-6 py-24 md:py-32 lg:py-48">
        <div className="max-w-3xl">
          <span className="inline-block text-white text-sm font-medium tracking-wider mb-8 animate-fade-in-up">
            ARCHITECTURAL DESIGN STUDIO
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up-delay-100">
            Modern Architecture<br />Innovative Designs
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in-up-delay-200 max-w-2xl">
            With over 20 years of experience, we meticulously plan and bring to life your dream projects down to the finest detail.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up-delay-300">
            <a 
              href="#projects" 
              className="inline-block bg-white dark:bg-gray-800 text-black dark:text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              Our Projects
            </a>
            <a 
              href="#contact" 
              className="inline-block bg-transparent dark:bg-gray-800 text-white dark:text-gray-200 px-8 py-4 rounded-lg font-medium border-2 border-white dark:border-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 lg:mt-24">
          <div className="text-white animate-fade-in-up-delay-400">
            <div className="text-3xl md:text-4xl font-bold mb-2">20+</div>
            <div className="text-white/80">Years of Experience</div>
          </div>
          <div className="text-white animate-fade-in-up-delay-500">
            <div className="text-3xl md:text-4xl font-bold mb-2">300+</div>
            <div className="text-white/80">Completed Projects</div>
          </div>
          <div className="text-white animate-fade-in-up-delay-600">
            <div className="text-3xl md:text-4xl font-bold mb-2">150+</div>
            <div className="text-white/80">Satisfied Clients</div>
          </div>
          <div className="text-white animate-fade-in-up-delay-700">
            <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
            <div className="text-white/80">Awards Won</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
} 