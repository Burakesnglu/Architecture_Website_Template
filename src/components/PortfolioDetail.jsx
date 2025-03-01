import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import OptimizedImage from './common/OptimizedImage';

// All portfolio data (would normally come from an API)
const portfolioItems = [
  {
    id: 1,
    title: "Contemporary Office Interior",
    client: "Tech Solutions Inc.",
    location: "Istanbul, Turkey",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    description: "This minimalist office design focuses on functionality and aesthetic harmony. The space was designed to foster collaboration while maintaining individual focus areas. Natural materials and thoughtful lighting create a productive and inspiring work environment.",
    details: {
      area: "800m²",
      completed: "2023",
      services: "Interior Design, Space Planning, Furniture Selection",
      team: "3 Architects, 2 Interior Designers"
    },
    features: [
      "Open Collaborative Spaces",
      "Private Focus Areas",
      "Biophilic Design Elements",
      "Custom Furniture Solutions",
      "Smart Lighting System",
      "Acoustic Treatment"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36"
    ],
    challenge: "The client required a flexible workspace that could accommodate both collaborative work and focused individual tasks, all within an existing building with structural constraints.",
    solution: "We developed a modular space planning approach with movable partitions and multi-functional furniture. Natural materials and strategic lighting were used to create distinct zones while maintaining visual continuity."
  },
  {
    id: 2,
    title: "Urban Renewal Plaza",
    client: "City of Istanbul",
    location: "Istanbul, Turkey",
    category: "Urban Design",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1",
    description: "This public space revitalization project integrated green design with community needs. The plaza transforms a previously neglected area into a vibrant urban hub that serves as a gathering space for local residents and visitors.",
    details: {
      area: "5000m²",
      completed: "2022",
      services: "Urban Design, Landscape Architecture, Public Consultation",
      team: "5 Architects, 3 Landscape Designers, 1 Civil Engineer"
    },
    features: [
      "Sustainable Water Management",
      "Native Plant Landscaping",
      "Community Performance Space",
      "Interactive Water Features",
      "Flexible Market Area",
      "Solar-Powered Lighting"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1",
      "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15",
      "https://images.unsplash.com/photo-1494522358652-f30e61a60313"
    ],
    challenge: "The site was disconnected from surrounding neighborhoods and lacked proper infrastructure for community activities despite high pedestrian traffic.",
    solution: "We created a series of connected spaces with different functions while ensuring cohesive design language. Sustainable elements were integrated throughout, with special attention to water management and native plantings."
  },
  {
    id: 3,
    title: "Sustainable School Complex",
    client: "Ministry of Education",
    location: "Ankara, Turkey",
    category: "Educational",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    description: "This LEED-certified educational facility features modular classrooms and innovative learning spaces designed to support modern teaching methodologies while minimizing environmental impact.",
    details: {
      area: "12000m²",
      completed: "2022",
      services: "Architecture, Sustainable Design, Educational Facilities Planning",
      team: "7 Architects, 2 Sustainability Consultants, 4 Engineers"
    },
    features: [
      "LEED Gold Certification",
      "Solar Energy System",
      "Rainwater Harvesting",
      "Natural Ventilation",
      "Flexible Learning Spaces",
      "Outdoor Classrooms"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
      "https://images.unsplash.com/photo-1544717302-de2939b7ef71"
    ],
    challenge: "Creating a learning environment that is both environmentally sustainable and pedagogically innovative while working within public education budget constraints.",
    solution: "We developed a modular building system that allowed for phased construction and future adaptability. Passive design strategies reduced energy costs, while learning spaces were designed for multiple configurations to support diverse teaching approaches."
  },
  {
    id: 4,
    title: "Beachfront Hotel Concept",
    client: "Azure Resorts",
    location: "Antalya, Turkey",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    description: "This luxury hotel design harmonizes with the coastal landscape and local architectural traditions while providing a sophisticated hospitality experience. The design emphasizes indoor-outdoor connectivity and framed views of the Mediterranean.",
    details: {
      area: "25000m²",
      completed: "2023",
      services: "Architecture, Interior Design, Landscape Design",
      team: "6 Architects, 4 Interior Designers, 2 Landscape Architects"
    },
    features: [
      "185 Guest Rooms and Suites",
      "Infinity Edge Pools",
      "Outdoor Dining Terraces",
      "Spa and Wellness Center",
      "Private Beach Access",
      "Sustainable Construction Methods"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791"
    ],
    challenge: "Designing a luxury hotel that meets international hospitality standards while remaining sensitive to the local environment and building traditions.",
    solution: "The design uses a terraced approach that follows the natural topography, with local stone and wood materials. Buildings are positioned to maximize views while providing privacy, and water features create a cooling microclimate."
  },
  {
    id: 5,
    title: "Cultural Heritage Restoration",
    client: "Historical Preservation Society",
    location: "Bursa, Turkey",
    category: "Restoration",
    image: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4",
    description: "This meticulous restoration of a 19th century building preserves historical elements while adding modern functionality. The project balances preservation requirements with contemporary use needs.",
    details: {
      area: "1200m²",
      completed: "2021",
      services: "Historic Preservation, Restoration, Adaptive Reuse",
      team: "3 Restoration Specialists, 2 Conservation Architects, 1 Structural Engineer"
    },
    features: [
      "Facade Restoration",
      "Original Timber Structure Preservation",
      "Modern Mechanical Systems Integration",
      "Accessibility Upgrades",
      "Historical Interior Elements Restoration",
      "Seismic Reinforcement"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4",
      "https://images.unsplash.com/photo-1506786323093-7616464ecab5",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    ],
    challenge: "Preserving the historical significance and architectural integrity of the building while adapting it for modern use and meeting current building codes.",
    solution: "We used minimally invasive techniques to restore damaged elements and integrated modern systems discretely. New interventions were designed to be visually distinct but harmonious with the historical fabric."
  },
  {
    id: 6,
    title: "Residential Apartment Building",
    client: "Urban Living Developers",
    location: "Izmir, Turkey",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    description: "This modern residential complex integrates community spaces and sustainable living principles within an urban context. The design prioritizes natural light, ventilation, and social interaction.",
    details: {
      area: "18000m²",
      completed: "2023",
      services: "Architecture, Residential Planning, Sustainability Consulting",
      team: "5 Architects, 3 Engineers, 1 Landscape Architect"
    },
    features: [
      "60 Apartment Units",
      "Rooftop Community Garden",
      "Co-working Spaces",
      "Fitness Center",
      "Rainwater Collection System",
      "Solar Power Integration"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25"
    ],
    challenge: "Creating a housing development that offers both privacy and community within a dense urban setting, while meeting sustainability goals.",
    solution: "The building features a central courtyard that provides shared green space, with apartments arranged to maximize privacy while fostering interaction. Multiple unit types accommodate diverse household needs."
  }
];

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  
  // Find the portfolio item with the matching id
  const portfolioItem = portfolioItems.find(item => item.id === parseInt(id));
  
  // If no matching portfolio item is found, navigate back to the portfolio page
  useEffect(() => {
    if (!portfolioItem) {
      navigate('/portfolio');
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [portfolioItem, navigate]);
  
  // Handle image navigation
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % portfolioItem.gallery.length);
  };
  
  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + portfolioItem.gallery.length) % portfolioItem.gallery.length);
  };
  
  // If no matching portfolio item is found, return nothing (we'll redirect)
  if (!portfolioItem) return null;
  
  return (
    <>
      <Helmet>
        <title>{portfolioItem.title} | Portfolio | Architect Design Studio</title>
        <meta name="description" content={portfolioItem.description} />
        <meta name="keywords" content={`architecture, ${portfolioItem.category.toLowerCase()}, ${portfolioItem.title.toLowerCase()}, portfolio`} />
        <link rel="canonical" href={`/portfolio/${id}`} />
        <meta property="og:title" content={`${portfolioItem.title} | Portfolio | Architect Design Studio`} />
        <meta property="og:description" content={portfolioItem.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`/portfolio/${id}`} />
        <meta property="og:image" content={portfolioItem.image} />
      </Helmet>
      
      <div className="bg-white dark:bg-gray-800 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-gray-700 dark:text-gray-300">{portfolioItem.title}</span>
              </li>
            </ol>
          </nav>
          
          {/* Portfolio Title */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">{portfolioItem.title}</h1>
            <div className="flex items-center text-gray-600 dark:text-gray-300 space-x-4">
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {portfolioItem.category}
              </span>
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {portfolioItem.location}
              </span>
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Completed: {portfolioItem.details.completed}
              </span>
            </div>
          </div>
          
          {/* Photo Gallery */}
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-lg h-96 md:h-[32rem]">
              <OptimizedImage
                src={portfolioItem.gallery[activeImage]}
                alt={`${portfolioItem.title} - Gallery image ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Gallery navigation */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  onClick={prevImage}
                  className="bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white transition-all"
                  aria-label="Previous image"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white transition-all"
                  aria-label="Next image"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {activeImage + 1} / {portfolioItem.gallery.length}
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {portfolioItem.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden rounded-lg h-24 ${
                    activeImage === index ? 'ring-2 ring-black dark:ring-white' : ''
                  }`}
                >
                  <OptimizedImage
                    src={image}
                    alt={`${portfolioItem.title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Project Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                {portfolioItem.description}
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">The Challenge</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {portfolioItem.challenge}
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Solution</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {portfolioItem.solution}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {portfolioItem.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Right Column - Details */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{portfolioItem.client}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{portfolioItem.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Area</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{portfolioItem.details.area}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{portfolioItem.details.completed}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Services</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{portfolioItem.details.services}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Team</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">{portfolioItem.details.team}</dd>
                  </div>
                </dl>
              </div>
              
              {/* Contact Section */}
              <div className="mt-8 bg-black text-white dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Interested in a similar project?</h3>
                <p className="mb-6">Contact us to discuss your project requirements and how we can help bring your vision to life.</p>
                <Link
                  to="/#contact"
                  className="block text-center bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          
          {/* Navigation and Related Projects section could be added here */}
          <div className="mt-16 flex justify-center">
            <Link
              to="/portfolio"
              className="flex items-center text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 