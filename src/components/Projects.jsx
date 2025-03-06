import { useState, useMemo, useCallback, useRef, memo } from 'react'
import { Link } from 'react-router-dom'
import OptimizedImage from './common/OptimizedImage'

// Wrapping ProjectCard with memo for performance
const ProjectCard = memo(({ project, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-600 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl will-change-transform"
      onMouseEnter={() => onMouseEnter(project.id)}
      onMouseLeave={onMouseLeave}
    >
      {/* Project Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
        />
        {/* Category Tag */}
        <div className="absolute top-4 right-4">
          <span className="bg-black bg-opacity-80 text-white text-xs font-medium px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end justify-start p-6"
        />
        {/* Button */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } will-change-transform will-change-opacity`}
        >
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-200 flex items-center mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {project.location}
          </p>
          <Link 
            to={`/project/${project.id}`}
            className="inline-block bg-white text-black px-6 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
      
      {/* Project Information (visible only when not hovered) */}
      <div className={`p-6 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {project.location}
        </p>
      </div>
    </div>
  );
});

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)
  const hoverTimeoutRef = useRef(null)
  const projectsContainerRef = useRef(null)

  // Optimizing projects with useMemo
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Modern Villa Project",
      location: "Bodrum, Turkey",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      description: "This modern villa project combines Bodrum's unique natural beauty with contemporary architecture.",
      details: {
        area: "500m²",
        floors: "2",
        bedrooms: "4",
        bathrooms: "5",
        completion: "2023"
      }
    },
    {
      id: 2,
      title: "Commercial Center",
      location: "Istanbul, Turkey",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      description: "A sustainable and technologically advanced commercial center designed for the needs of modern business.",
      details: {
        area: "10000m²",
        floors: "15",
        offices: "120",
        parking: "300",
        completion: "2024"
      }
    },
    {
      id: 3,
      title: "Luxury Residence",
      location: "Izmir, Turkey",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      description: "Modern residence project offering comfortable living in the heart of the city.",
      details: {
        area: "8000m²",
        floors: "25",
        units: "100",
        parking: "150",
        completion: "2024"
      }
    },
    {
      id: 4,
      title: "Ecological Office Complex",
      location: "Ankara, Turkey",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      description: "A modern office complex featuring environmentally friendly and energy-efficient design.",
      details: {
        area: "15000m²",
        floors: "12",
        offices: "200",
        parking: "400",
        completion: "2025"
      }
    },
    {
      id: 5,
      title: "Cultural Center",
      location: "Eskisehir, Turkey",
      category: "Public",
      image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
      description: "Modern cultural center bringing a fresh perspective to the city's cultural and artistic life.",
      details: {
        area: "12000m²",
        floors: "4",
        halls: "5",
        capacity: "2000",
        completion: "2024"
      }
    },
    {
      id: 6,
      title: "Beachfront Residences",
      location: "Antalya, Turkey",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      description: "Luxury residence project with stunning Mediterranean views.",
      details: {
        area: "20000m²",
        floors: "20",
        units: "160",
        parking: "200",
        completion: "2025"
      }
    }
  ], []);

  // Optimizing filtering with useMemo
  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      activeCategory === 'All' || project.category === activeCategory
    )
  }, [activeCategory, projects]);

  // Optimizing event handlers with useCallback
  const handleMouseEnter = useCallback((id) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setHoveredId(id)
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredId(null)
    }, 50)
  }, []);

  // Optimizing category change with useCallback
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category)
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Our Projects
          </h2>
          <p className="my-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            We offer modern architectural solutions with projects of various scales and functions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Residential', 'Commercial', 'Public'].map((category) => (
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

        {/* Project Grid */}
        <div 
          ref={projectsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isHovered={hoveredId === project.id}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 