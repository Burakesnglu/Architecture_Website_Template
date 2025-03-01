import { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoadingSpinner from './components/common/LoadingSpinner'
import ScrollToTop from './components/common/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'

// Lazy loading components
const Hero = lazy(() => import('./components/Hero'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const ProjectDetail = lazy(() => import('./components/ProjectDetail'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const PortfolioDetail = lazy(() => import('./components/PortfolioDetail'))
const Blog = lazy(() => import('./components/Blog'))
const BlogDetail = lazy(() => import('./components/BlogDetail'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Home component to wrap the main page content
const Home = () => {
  const location = useLocation();
  
  // Handle hash navigation when coming from ProjectDetail
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Get the element with the hash
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100); // Small delay to ensure DOM is fully loaded
      }
    }
  }, [location]);

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Blog />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Contact />
      </Suspense>
    </>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Remove loading state when the page is fully loaded
    window.addEventListener('load', () => {
      setIsLoading(false)
    })

    // Prefetch critical components for better performance
    const prefetchComponents = async () => {
      const components = [Hero, About, Projects]
      await Promise.all(components.map(comp => comp.preload()))
    }

    prefetchComponents()

    return () => {
      window.removeEventListener('load', () => setIsLoading(false))
    }
  }, [])

  return (
    <ThemeProvider>
      <Router>
        <div className="w-full min-h-screen overflow-x-hidden bg-white dark:bg-gray-800 transition-colors duration-200">
          {isLoading ? (
            <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/project/:id"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ProjectDetail />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/blog/:id"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <BlogDetail />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/portfolio"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Portfolio />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/portfolio/:id"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <PortfolioDetail />
                      </Suspense>
                    }
                  />
                </Routes>
              </main>
              <Suspense fallback={<LoadingSpinner />}>
                <Footer />
              </Suspense>
              <ScrollToTop />
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  )
}
