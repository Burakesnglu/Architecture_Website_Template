import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import OptimizedImage from './common/OptimizedImage'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Blog({ blogs }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [visiblePosts, setVisiblePosts] = useState([])
  const [imagesPreloaded, setImagesPreloaded] = useState(false)
  const hoverTimeoutRef = useRef(null)

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

  const blogPosts = useMemo(() => [
    {
      id: 1,
      title: "Modern Architectural Trends",
      excerpt: "Discover the prominent architectural trends of 2024 and sustainable design approaches",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "March 15, 2024",
      category: "Architecture Trends"
    },
    {
      id: 2,
      title: "Sustainable Buildings",
      excerpt: "Eco-friendly materials and energy-efficient building designs for sustainable architecture",
      image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "March 10, 2024",
      category: "Sustainability"
    },
    {
      id: 3,
      title: "Interior Design",
      excerpt: "Minimalist approaches and functionality in modern interior design",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "March 5, 2024",
      category: "Interior Architecture"
    },
    {
      id: 4,
      title: "Smart Home Technologies",
      excerpt: "Integration of smart technologies for the homes of the future",
      image: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "April 1, 2024",
      category: "Technology"
    },
    {
      id: 5,
      title: "Nature-Integrated Design",
      excerpt: "Architectural approaches and examples that harmonize with nature",
      image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "April 20, 2024",
      category: "Architecture"
    },
    {
      id: 6,
      title: "Renewable Energy Sources",
      excerpt: "The role of renewable energy sources in modern architecture",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "April 25, 2024",
      category: "Energy"
    }
  ], []);

  // Preload all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = blogPosts.map(post => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = post.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
      } catch (error) {
        console.error("Failed to preload images:", error);
        // Continue even if some images failed to load
        setImagesPreloaded(true);
      }
    };
    
    preloadImages();
  }, [blogPosts]);

  // Update visible posts when showAll changes
  useEffect(() => {
    setVisiblePosts(blogPosts.slice(0, showAll ? blogPosts.length : 3));
  }, [showAll, blogPosts]);

  // Toggle function with proper state management
  const toggleShowAll = () => {
    setShowAll(prev => !prev);
  };

  return (
    <>
      <Helmet>
        <title>Blog & News - Architectural Trends</title>
        <meta name="description" content="Explore our articles about architectural trends, sustainable design, and the latest developments in the industry." />
      </Helmet>
      <section id="blog" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Blog & News
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Articles about architectural trends, sustainable design, and the latest developments in the industry.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500">
            {visiblePosts.map((post) => (
              <article 
                key={post.id} 
                className="flex flex-col overflow-hidden rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl hover:cursor-pointer"
                onMouseEnter={() => handleMouseEnter(post.id)}
                onMouseLeave={handleMouseLeave}
              >
                      <Link to={`/blog/${post.id}`}>
                <div className="flex-shrink-0 h-48">
                  {imagesPreloaded ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 animate-pulse"></div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white dark:bg-gray-800 p-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {post.category}
                    </p>
                    <div className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</p> 
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="ml-3">
                      <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={post.date}>{post.date}</time>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </article>
            ))}
          </div>

          {/* "View All Articles" Button */}
          <div className="text-center mt-12">
            <button 
              onClick={toggleShowAll} 
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 animate-fade-in-up-delay-700"
            >
              {showAll ? 'Show Less' : 'View All Articles'}
            </button>
          </div>
        </div>
      </section>
    </>
  )
} 