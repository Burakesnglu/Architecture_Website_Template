import { useState, useEffect, useCallback, useRef } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useTheme } from '../context/ThemeContext'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const navRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Optimize scroll handling for better performance
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    requestAnimationFrame(() => {
      // Check scroll direction
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsScrolled(true)
      } else {
        // Scrolling up - only show navbar when scrolled past threshold
        setIsScrolled(currentScrollY > 50)
      }
      lastScrollY.current = currentScrollY
    })
  }, [])

  // Debounce scroll handler to improve performance
  const debouncedHandleScroll = useDebounce(handleScroll, 100)

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll)
    return () => window.removeEventListener('scroll', debouncedHandleScroll)
  }, [debouncedHandleScroll])

  // Optimize menu toggle using requestAnimationFrame
  const toggleMenu = useCallback(() => {
    requestAnimationFrame(() => {
      setIsMenuOpen(prev => !prev)
    })
  }, [])

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [navRef])

  const navLinks = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#projects', text: 'Projects' },
    { href: '/portfolio', text: 'Portfolio' },
    { href: '#blog', text: 'Blog' },
    { href: '#contact', text: 'Contact' }
  ]

  // Optimized smooth scroll implementation with navigation awareness
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setIsMenuOpen(false)

    // For standalone pages, just navigate directly
    if (href === '/portfolio') {
      navigate('/portfolio')
      return
    }

    // If we're on ProjectDetail or BlogDetail page, redirect to homepage with hash
    if (location.pathname.includes('/project/') || location.pathname.includes('/blog/') || location.pathname.includes('/portfolio/') || location.pathname === '/portfolio') {
      // Check if it's a hash link
      if (href.startsWith('#')) {
        navigate('/' + href)
      } else {
        navigate(href)
      }
      return
    }

    // If we're on the homepage, use smooth scroll
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    } else {
      console.warn(`Element not found for href: ${href}`);
    }
  }, [location.pathname, navigate])

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      ref={navRef}
      style={{ willChange: 'transform, opacity' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  if (location.pathname !== '/') {
                    navigate('/');
                  } else {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`text-2xl font-bold ${
                  isScrolled ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-white' : 'text-gray-900')
                }`}
                style={{ willChange: 'color' }}
              >
                ARCH TEMPLATE
              </a>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? (isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100')
                    : (isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-white/20')
                }`}
                style={{ willChange: 'color' }}
              >
                {link.text}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg mr-2 transition-colors duration-300 ${
                isScrolled 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                isScrolled 
                  ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  : 'bg-white text-gray-900 hover:bg-gray-200'
              }`}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isScrolled 
                    ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' 
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
} 