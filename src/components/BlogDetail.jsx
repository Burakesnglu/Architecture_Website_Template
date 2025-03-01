import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OptimizedImage from './common/OptimizedImage';

// Blog posts data (would normally come from an API)
const blogPosts = [
  {
    id: 1,
    title: "Modern Architectural Trends",
    excerpt: "Discover the prominent architectural trends of 2024 and sustainable design approaches",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "March 15, 2024",
    category: "Architecture Trends",
    author: "Emma Johnson",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>The architectural landscape is constantly evolving, with new trends emerging that reflect both aesthetic preferences and practical considerations. In 2024, we're seeing a significant shift towards designs that not only look impressive but also prioritize sustainability and functionality.</p>
      
      <h3>Biophilic Design</h3>
      <p>One of the most prominent trends is biophilic design, which incorporates natural elements and patterns into architectural spaces. This approach recognizes our innate connection to nature and seeks to bring the outdoors in through features such as living walls, natural lighting, and organic materials.</p>
      
      <h3>Smart Buildings</h3>
      <p>Technology integration continues to advance, with smart buildings becoming increasingly sophisticated. From energy management systems to automated lighting and climate control, these technologies enhance both the user experience and operational efficiency.</p>
      
      <h3>Adaptive Reuse</h3>
      <p>Rather than demolishing existing structures, many architects are finding creative ways to repurpose them. This approach not only preserves historical and cultural heritage but also reduces the environmental impact of new construction.</p>
      
      <h3>Sustainable Materials</h3>
      <p>The use of sustainable and locally sourced materials is no longer just a preference but a necessity. Architects are exploring innovative options such as mass timber, recycled materials, and low-carbon concrete to reduce the environmental footprint of their projects.</p>
      
      <h3>Flexible Spaces</h3>
      <p>The pandemic has accelerated the trend towards multifunctional spaces that can adapt to changing needs. Buildings are being designed with flexibility in mind, allowing for easy reconfiguration as requirements evolve.</p>
    `,
    tags: ["Architecture", "Design Trends", "Sustainability", "Innovation"],
    relatedPosts: [2, 3, 5]
  },
  {
    id: 2,
    title: "Sustainable Buildings",
    excerpt: "Eco-friendly materials and energy-efficient building designs for sustainable architecture",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "March 10, 2024",
    category: "Sustainability",
    author: "David Chen",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Sustainable architecture has become a cornerstone of modern building design, driven by environmental concerns and regulatory requirements. Architects and builders are increasingly adopting eco-friendly approaches that minimize environmental impact while creating healthy, efficient spaces.</p>
      
      <h3>Passive Design Strategies</h3>
      <p>Passive design strategies leverage natural resources such as sunlight, shade, and ventilation to reduce energy consumption. Proper building orientation, thermal mass, and insulation play crucial roles in maintaining comfortable indoor temperatures without relying heavily on mechanical systems.</p>
      
      <h3>Renewable Energy Integration</h3>
      <p>The integration of renewable energy sources, particularly solar panels and wind turbines, has become more sophisticated and aesthetically pleasing. These systems can significantly reduce a building's reliance on fossil fuels and even generate surplus energy for the grid.</p>
      
      <h3>Water Conservation</h3>
      <p>Water-efficient fixtures, rainwater harvesting systems, and greywater recycling are becoming standard features in sustainable buildings. These measures not only conserve water but also reduce utility costs and strain on municipal systems.</p>
      
      <h3>Living Building Challenge</h3>
      <p>The Living Building Challenge represents the highest standard for sustainable design, requiring buildings to generate more energy than they consume, process their own waste, and utilize non-toxic materials. While challenging to achieve, this standard is inspiring architects to push the boundaries of sustainable design.</p>
    `,
    tags: ["Sustainability", "Energy Efficiency", "Green Building", "Eco-friendly Design"],
    relatedPosts: [1, 5, 6]
  },
  {
    id: 3,
    title: "Interior Design",
    excerpt: "Minimalist approaches and functionality in modern interior design",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "March 5, 2024",
    category: "Interior Architecture",
    author: "Sophia Martinez",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Modern interior design is characterized by a focus on simplicity, clean lines, and functional spaces. The minimalist approach has gained widespread popularity, with designers striving to create interiors that are both aesthetically pleasing and practical for everyday use.</p>
      
      <h3>Minimalism and Functionality</h3>
      <p>Minimalism in interior design goes beyond a sparse aesthetic; it's about intentionality and purpose. Every element in a minimalist space serves a functional purpose, with unnecessary items eliminated to create a sense of calm and order.</p>
      
      <h3>Natural Materials and Textures</h3>
      <p>Despite the emphasis on simplicity, modern interiors often incorporate a variety of textures and natural materials to add warmth and visual interest. Wood, stone, and textiles bring organic elements into otherwise clean-lined spaces.</p>
      
      <h3>Neutral Color Palettes</h3>
      <p>Neutral color schemes dominate in modern interior design, creating a timeless backdrop that can be easily updated with accent pieces. Whites, grays, and earth tones form the foundation, with strategic pops of color for visual impact.</p>
      
      <h3>Open-Plan Living</h3>
      <p>Open-plan layouts continue to be popular, fostering a sense of spaciousness and facilitating social interaction. However, designers are finding creative ways to define separate zones within these spaces using furniture arrangement, area rugs, and lighting.</p>
    `,
    tags: ["Interior Design", "Minimalism", "Functionality", "Modern Living"],
    relatedPosts: [1, 2, 4]
  },
  {
    id: 4,
    title: "Smart Home Technologies",
    excerpt: "Integration of smart technologies for the homes of the future",
    image: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "April 1, 2024",
    category: "Technology",
    author: "Michael Kim",
    authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Smart home technology has transformed the way we interact with our living spaces, offering unprecedented levels of convenience, efficiency, and control. As these technologies continue to evolve, they are becoming more integrated and intuitive, creating homes that can anticipate and respond to our needs.</p>
      
      <h3>Integrated Systems</h3>
      <p>The trend is moving away from standalone smart devices towards fully integrated systems that communicate seamlessly with each other. This allows for coordinated automation scenarios that enhance comfort and efficiency.</p>
      
      <h3>Voice Control</h3>
      <p>Voice assistants have become the primary interface for many smart home systems, allowing users to control various aspects of their home environment through natural language commands. This hands-free approach is particularly valuable for accessibility.</p>
      
      <h3>Energy Management</h3>
      <p>Smart energy management systems optimize electricity usage by monitoring consumption patterns and adjusting settings accordingly. Features such as automated lighting, smart thermostats, and appliance control can significantly reduce energy waste.</p>
      
      <h3>Security and Surveillance</h3>
      <p>Advanced security systems integrate cameras, motion sensors, and smart locks to provide comprehensive protection. Homeowners can monitor their property remotely and receive alerts about unusual activity.</p>
      
      <h3>Health and Wellness</h3>
      <p>Emerging smart home technologies are focusing on health and wellness, with features such as air quality monitoring, circadian lighting, and sleep optimization. These technologies create living environments that actively support physical and mental well-being.</p>
    `,
    tags: ["Smart Home", "Technology", "Home Automation", "IoT"],
    relatedPosts: [1, 5, 6]
  },
  {
    id: 5,
    title: "Nature-Integrated Design",
    excerpt: "Architectural approaches and examples that harmonize with nature",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "April 20, 2024",
    category: "Architecture",
    author: "Olivia Taylor",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Nature-integrated design represents a holistic approach to architecture that seeks to harmonize built environments with the natural world. Rather than imposing structures on the landscape, this philosophy embraces and enhances the existing natural context.</p>
      
      <h3>Site-Responsive Architecture</h3>
      <p>Nature-integrated buildings respond to their specific site conditions, including topography, climate, vegetation, and views. This contextual approach minimizes disruption to the natural environment and creates structures that feel organically connected to their surroundings.</p>
      
      <h3>Biomimicry</h3>
      <p>Biomimicry in architecture involves drawing inspiration from natural forms, processes, and systems. By emulating nature's time-tested patterns and strategies, architects can create buildings that are not only aesthetically pleasing but also highly efficient and resilient.</p>
      
      <h3>Green Roofs and Living Walls</h3>
      <p>Vegetated roofs and walls bring nature directly into the built environment, providing multiple benefits including improved insulation, stormwater management, air purification, and biodiversity support. These living systems also create visual connections to nature for building occupants.</p>
      
      <h3>Indoor-Outdoor Connectivity</h3>
      <p>Blurring the boundaries between interior and exterior spaces enhances the connection to nature. Features such as large windows, skylights, courtyards, and covered outdoor areas allow natural light, views, and fresh air to permeate the building.</p>
    `,
    tags: ["Nature-Integrated Design", "Biophilic Architecture", "Sustainable Design", "Landscape"],
    relatedPosts: [1, 2, 3]
  },
  {
    id: 6,
    title: "Renewable Energy Sources",
    excerpt: "The role of renewable energy sources in modern architecture",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "April 25, 2024",
    category: "Energy",
    author: "James Wilson",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Renewable energy integration has become a fundamental aspect of sustainable architecture, allowing buildings to generate clean power while reducing their environmental impact. As technology advances and costs decrease, these systems are becoming more accessible and aesthetically integrated into architectural design.</p>
      
      <h3>Solar Power</h3>
      <p>Solar photovoltaic systems have evolved from utilitarian additions to design elements that can be seamlessly incorporated into building envelopes. Building-integrated photovoltaics (BIPV) replace conventional building materials in parts of the building envelope, serving as both the outer layer and power generator.</p>
      
      <h3>Wind Energy</h3>
      <p>Small-scale wind turbines designed specifically for buildings are becoming more efficient and visually appealing. These can be integrated into the building design in various ways, from roof-mounted systems to more innovative approaches that leverage the building's form to accelerate wind flow.</p>
      
      <h3>Geothermal Systems</h3>
      <p>Geothermal heat pumps utilize the relatively constant temperature of the earth to provide heating, cooling, and hot water for buildings. While these systems require significant upfront investment, they offer substantial long-term energy savings and minimal environmental impact.</p>
      
      <h3>Energy Storage</h3>
      <p>Battery storage systems allow buildings to store excess renewable energy for use during periods of low generation or high demand. This technology is crucial for maximizing the utility of on-site renewable energy and achieving net-zero energy goals.</p>
      
      <h3>Microgrids</h3>
      <p>Building-scale or community microgrids combine renewable energy generation, storage, and smart distribution systems to create resilient, self-sufficient energy networks. These systems can operate independently from the main grid during outages, providing enhanced reliability and security.</p>
    `,
    tags: ["Renewable Energy", "Solar Power", "Sustainable Architecture", "Green Technology"],
    relatedPosts: [1, 2, 4]
  }
];

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find blog post by ID
  const post = blogPosts.find(p => p.id === parseInt(id));

  // Redirect to homepage if post is not found
  if (!post) {
    navigate('/');
    return null;
  }

  return (
    <div className="pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <OptimizedImage
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-600 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-center mt-6">
              <img 
                src={post.authorImage} 
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <span className="block text-sm font-medium">{post.author}</span>
                <span className="block text-xs opacity-75">{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="mt-12">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center">
            <img 
              src={post.authorImage} 
              alt={post.author}
              className="w-16 h-16 rounded-full object-cover mr-6"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{post.author}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Architectural writer and consultant with over 10 years of experience in the industry. 
                Specializes in sustainable design and emerging architectural trends.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {post.relatedPosts.slice(0, 3).map(relatedPostId => {
              const relatedPost = blogPosts.find(p => p.id === relatedPostId);
              return relatedPost ? (
                <div 
                  key={relatedPost.id} 
                  className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <OptimizedImage
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full mb-2">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{relatedPost.excerpt}</p>
                    <a 
                      href={`/blog/${relatedPost.id}`}
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Back to Blog Button */}
      <div className="py-12 text-center bg-white dark:bg-gray-900">
        <button 
          onClick={() => navigate('/#blog')}
          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-8 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          Back to All Articles
        </button>
      </div>
    </div>
  );
} 