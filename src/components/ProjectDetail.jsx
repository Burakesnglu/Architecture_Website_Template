import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OptimizedImage from './common/OptimizedImage';

// All projects data (would normally come from an API)
const projects = [
  {
    id: 1,
    title: "Modern Villa Project",
    location: "Bodrum, Turkey",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description: "This modern villa project combines Bodrum's unique natural beauty with contemporary architecture. The project was designed using sustainable materials and energy-efficient systems.",
    details: {
      area: "500m²",
      floors: "2",
      bedrooms: "4",
      bathrooms: "5",
      completion: "2023"
    },
    features: [
      "Infinity Pool",
      "Smart Home Systems",
      "Solar Energy System",
      "Custom Landscape Design",
      "Sea View",
      "Enclosed Parking"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    ]
  },
  {
    id: 2,
    title: "Commercial Center",
    location: "Istanbul, Turkey",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description: "A commercial center with sustainable and technological infrastructure designed for the needs of modern business. This project, which has a green building certificate, stands out with its energy efficiency and environmentally friendly features.",
    details: {
      area: "10000m²",
      floors: "15",
      offices: "120",
      parking: "300",
      completion: "2024"
    },
    features: [
      "LEED Certification",
      "Smart Building Systems",
      "24/7 Security",
      "Conference Halls",
      "Restaurants",
      "Fitness Center"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e"
    ]
  },
  {
    id: 3,
    title: "Luxury Residence",
    location: "Izmir, Turkey",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    description: "A modern residence project offering comfortable living in the city center. It provides a complete living center with smart home technologies and social amenities.",
    details: {
      area: "8000m²",
      floors: "25",
      units: "100",
      parking: "150",
      completion: "2024"
    },
    features: [
      "Concierge Service",
      "Indoor Swimming Pool",
      "Fitness Center",
      "SPA & Sauna",
      "Children's Playground",
      "Meeting Rooms"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    ]
  },
  {
    id: 4,
    title: "Ecological Office Complex",
    location: "Ankara, Turkey",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    description: "A modern office complex that stands out with its environmentally friendly and energy-efficient design. It offers a sustainable working environment with renewable energy systems and green roof applications.",
    details: {
      area: "15000m²",
      floors: "12",
      offices: "200",
      parking: "400",
      completion: "2025"
    },
    features: [
      "Green Roof",
      "Solar Panels",
      "Rainwater Harvesting",
      "Electric Vehicle Charging Stations",
      "Bicycle Parking",
      "Co-working Spaces"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e"
    ]
  },
  {
    id: 5,
    title: "Cultural Center",
    location: "Eskisehir, Turkey",
    category: "Public",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
    description: "A modern cultural center that will bring a fresh perspective to the city's cultural and artistic life. It offers a comprehensive venue for art lovers with its multi-purpose halls and exhibition spaces.",
    details: {
      area: "12000m²",
      floors: "4",
      halls: "5",
      capacity: "2000",
      completion: "2024"
    },
    features: [
      "Concert Hall",
      "Exhibition Galleries",
      "Library",
      "Workshop Areas",
      "Open-Air Theater",
      "Cafeteria"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    ]
  },
  {
    id: 6,
    title: "Beachfront Residences",
    location: "Antalya, Turkey",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    description: "A luxury residence project with stunning Mediterranean views. Each apartment features a private pool and spacious terraces.",
    details: {
      area: "20000m²",
      floors: "20",
      units: "160",
      parking: "200",
      completion: "2025"
    },
    features: [
      "Apartments with Private Pools",
      "Sea View",
      "Beach Club",
      "Marina",
      "Restaurant & Bar",
      "Helipad"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    ]
  }
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Scroll to top when page loads
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only when component first mounts

  // Find project by ID
  const project = projects.find(p => p.id === parseInt(id));

  // Redirect to homepage if project is not found
  if (!project) {
    navigate('/');
    return null;
  }

  return (
    <div className="pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <OptimizedImage
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl">{project.location}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Project Details</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {project.description}
            </p>

            {/* Features */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <OptimizedImage
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-fit">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Information</h3>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Category</span>
                <span className="text-gray-900 dark:text-white">{project.category}</span>
              </div>
              
              {project.details.area && (
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Area</span>
                  <span className="text-gray-900 dark:text-white">{project.details.area}</span>
                </div>
              )}
              
              {project.details.floors && (
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Floors</span>
                  <span className="text-gray-900 dark:text-white">{project.details.floors}</span>
                </div>
              )}
              
              {project.details.bedrooms && (
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Bedrooms</span>
                  <span className="text-gray-900 dark:text-white">{project.details.bedrooms}</span>
                </div>
              )}
              
              {project.details.bathrooms && (
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Bathrooms</span>
                  <span className="text-gray-900 dark:text-white">{project.details.bathrooms}</span>
                </div>
              )}
              
              {project.details.offices && (
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Offices</span>
                  <span className="text-gray-900 dark:text-white">{project.details.offices}</span>
                </div>
              )}
              
              {project.details.units && (
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Units</span>
                  <span className="text-gray-900 dark:text-white">{project.details.units}</span>
                </div>
              )}
              
              {project.details.parking && (
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Parking</span>
                  <span className="text-gray-900 dark:text-white">{project.details.parking}</span>
                </div>
              )}
              
              {project.details.halls && (
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Halls</span>
                  <span className="text-gray-900 dark:text-white">{project.details.halls}</span>
                </div>
              )}
              
              {project.details.capacity && (
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Capacity</span>
                  <span className="text-gray-900 dark:text-white">{project.details.capacity}</span>
                </div>
              )}
              
              <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">Completion</span>
                <span className="text-gray-900 dark:text-white">{project.details.completion}</span>
              </div>
            </div>

            <div className="mt-8">
              <a 
                href="#contact" 
                onClick={() => {
                  navigate('/#contact');
                }}
                className="block w-full text-center bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Contact Us About This Project
              </a>
            </div>
          </div>
        </div>

        {/* Related Projects - only show if there are any */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects
              .filter(p => p.id !== project.id && p.category === project.category)
              .slice(0, 3)
              .map(relatedProject => (
                <div 
                  key={relatedProject.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <OptimizedImage
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{relatedProject.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{relatedProject.location}</p>
                    <a 
                      href={`/project/${relatedProject.id}`}
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Back to Projects Button */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/#projects')}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-8 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            Back to All Projects
          </button>
        </div>
      </div>
    </div>
  );
} 