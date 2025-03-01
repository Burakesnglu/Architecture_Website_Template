import { useState, useMemo, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import OptimizedImage from './common/OptimizedImage'

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)
  const hoverTimeoutRef = useRef(null)

  const portfolioItems = [
    {
      id: 1,
      title: "Contemporary Office Interior",
      client: "Tech Solutions Inc.",
      category: "Interior",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      description: "Minimalist office design focused on functionality and aesthetic harmony.",
      year: "2023"
    },
    {
      id: 2,
      title: "Urban Renewal Plaza",
      client: "City of Istanbul",
      category: "Urban Design",
      image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1",
      description: "Public space revitalization project integrating green design and community needs.",
      year: "2022"
    },
    {
      id: 3,
      title: "Sustainable School Complex",
      client: "Ministry of Education",
      category: "Educational",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      description: "LEED-certified educational facility with modular classrooms and innovative learning spaces.",
      year: "2022"
    },
    {
      id: 4,
      title: "Beachfront Hotel Concept",
      client: "Azure Resorts",
      category: "Hospitality",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      description: "Luxury hotel design harmonizing with coastal landscape and local architectural traditions.",
      year: "2023"
    },
    {
      id: 5,
      title: "Cultural Heritage Restoration",
      client: "Historical Preservation Society",
      category: "Restoration",
      image: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4",
      description: "Meticulous restoration of a 19th century building preserving historical elements while adding modern functionality.",
      year: "2021"
    },
    {
      id: 6,
      title: "Residential Apartment Building",
      client: "Urban Living Developers",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      description: "Modern residential complex integrating community spaces and sustainable living principles.",
      year: "2023"
    }
  ]

  // Memoize filtered portfolio items for performance
  const filteredPortfolioItems = useMemo(() => {
    return portfolioItems.filter(item => 
      activeCategory === 'All' || item.category === activeCategory
    )
  }, [activeCategory])

  // Memoize hover handlers for performance
  const handleMouseEnter = useCallback((id) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    requestAnimationFrame(() => {
      setHoveredId(id)
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        setHoveredId(null)
      })
    }, 50)
  }, [])

  // Optimize category change with requestAnimationFrame
  const handleCategoryChange = useCallback((category) => {
    requestAnimationFrame(() => {
      setActiveCategory(category)
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Portfolio | Architect Design Studio</title>
        <meta name="description" content="Browse our diverse portfolio of architectural projects including interior design, urban planning, restorations, and more." />
        <meta name="keywords" content="architecture portfolio, interior design, urban planning, architectural projects" />
        <link rel="canonical" href="/portfolio" />
        <meta property="og:title" content="Portfolio | Architect Design Studio" />
        <meta property="og:description" content="Browse our diverse portfolio of architectural projects including interior design, urban planning, restorations, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/portfolio" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1497366754035-f200968a6e72" />
      </Helmet>
    
      <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Our Portfolio
            </h1>
            <p className="my-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Explore our diverse collection of architectural works spanning various disciplines and scales.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Interior', 'Urban Design', 'Residential', 'Educational', 'Hospitality', 'Restoration'].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full transition-colors duration-150 ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ willChange: 'transform' }}
          >
            {filteredPortfolioItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-600 shadow-lg transform transition-transform duration-150 hover:-translate-y-1"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                style={{ willChange: 'transform' }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div 
                    className={`absolute inset-0 bg-black transition-opacity duration-150 flex items-center justify-center
                      ${hoveredId === item.id ? 'opacity-70' : 'opacity-0'}`}
                    style={{ willChange: 'opacity' }}
                  />
                  {/* Button */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center transition-transform duration-150
                      ${hoveredId === item.id ? 'translate-y-0' : 'translate-y-4'}`}
                    style={{ willChange: 'transform' }}
                  >
                    <Link 
                      to={`/portfolio/${item.id}`}
                      className={`bg-white text-black px-6 py-2 rounded-full transition-opacity duration-150 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500
                        ${hoveredId === item.id ? 'opacity-100' : 'opacity-0'}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                
                {/* Portfolio Information */}
                <div className="p-6">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2 block">
                    {item.category} • {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.client}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
} 