import { useState, useCallback, useRef, useEffect, useMemo, memo } from 'react'
import OptimizedImage from './common/OptimizedImage'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// Wrapping PostCard with memo to prevent unnecessary renders
const PostCard = memo(({ post, onMouseEnter, onMouseLeave }) => (
  <article 
    key={post.id} 
    className="group relative flex flex-col overflow-hidden border-0 border-b border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:-translate-y-1"
    onMouseEnter={() => onMouseEnter(post.id)}
    onMouseLeave={onMouseLeave}
  >
    <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
      <div className="flex-shrink-0 aspect-[16/9] mb-6 overflow-hidden rounded-lg">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy" // Load image only when it enters the viewport
          decoding="async" // Async decoding
          width="800"
          height="450"
        />
      </div>
      <div className="flex flex-1 flex-col pb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full dark:bg-indigo-900 dark:text-indigo-200">
            {post.category}
          </span>
          <time dateTime={post.date} className="text-sm text-gray-500 dark:text-gray-400">
            {post.date}
          </time>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
            {post.title}
          </h3>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-5 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
          Read more
          <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  </article>
));

export default function Blog({ blogs }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [visiblePosts, setVisiblePosts] = useState([])
  const hoverTimeoutRef = useRef(null)
  const intersectionObserverRef = useRef(null)

  // Optimizing event handlers with useCallback
  const handleMouseEnter = useCallback((id) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setHoveredId(id)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredId(null)
    }, 50)
  }, [])

  const toggleShowAll = useCallback(() => {
    setShowAll(prev => !prev)
  }, [])

  // Caching blog posts with useMemo
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

  // Update visible posts when showAll changes
  useEffect(() => {
    setVisiblePosts(blogPosts.slice(0, showAll ? blogPosts.length : 3));
  }, [showAll, blogPosts]);

  // For lazy loading with Intersection Observer
  useEffect(() => {
    // Observe the View All Articles button
    const loadMoreButton = document.getElementById('load-more-button');
    if (!loadMoreButton) return;

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        // Preload all blog posts when user approaches the button
        if (entry.isIntersecting && !showAll) {
          // Preload images for all posts
          blogPosts.slice(3).forEach(post => {
            const img = new Image();
            img.src = post.image;
          });
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '200px', // Trigger 200px before the button enters the viewport
      threshold: 0.1
    };

    intersectionObserverRef.current = new IntersectionObserver(observerCallback, observerOptions);
    intersectionObserverRef.current.observe(loadMoreButton);

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [blogPosts, showAll]);

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

          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <PostCard 
                key={post.id}
                post={post}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>

          {/* "View All Articles" Button */}
          <div className="text-center mt-16">
            <button 
              id="load-more-button"
              onClick={toggleShowAll} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              {showAll ? 'Show Less' : 'View All Articles'}
            </button>
          </div>
        </div>
      </section>
    </>
  )
} 