import React, { useState, useCallback, memo } from 'react'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

// Social media icons
const SocialIcons = {
  facebook: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
    </svg>
  ),
  twitter: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  instagram: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
  ),
  linkedin: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
};

// Contact Information Card
const ContactInfoItem = memo(({ icon, title, content }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 p-3 bg-gray-800 rounded-full">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-medium text-white">{title}</h4>
      <p className="mt-1 text-gray-300 whitespace-pre-line">{content}</p>
    </div>
  </div>
));

// Social Button Component
const SocialButton = memo(({ name, icon }) => (
  <a
    href={`#${name}`}
    className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors duration-200"
    aria-label={`Visit our ${name} page`}
  >
    {icon}
  </a>
));

// Form input
const FormInput = memo(({ label, id, type, value, onChange, placeholder, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-colors duration-200"
      placeholder={placeholder}
    />
    {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
  </div>
));

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  // Optimizing event handlers
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length === 0) {
      // Simulated form submission
      setTimeout(() => {
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        
        // Reset form after 3 seconds
        setTimeout(() => setFormStatus('idle'), 3000)
      }, 1500)
    } else {
      setFormStatus('idle')
      setErrors(validationErrors)
    }
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear errors for real-time validation while user is typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }, [errors]);

  const validate = (data) => {
    const newErrors = {}
    if (!data.name) newErrors.name = 'Full Name is required'
    if (!data.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Email is invalid'
    if (!data.message) newErrors.message = 'Message is required'
    return newErrors
  }

  // Contact information
  const contactInfo = [
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: "Phone",
      content: "+1 234 5678 90 00",
    },
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: "Email",
      content: "info@mail.com",
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: "Address",
      content: "Levent, Istanbul, Turkey",
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "Working Hours",
      content: "Monday - Friday: 09:00 - 18:00\nSaturday: 10:00 - 14:00",
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -right-60 -top-40 w-96 h-96 rounded-full opacity-10 bg-indigo-500 dark:opacity-5"></div>
        <div className="absolute -left-40 top-1/2 w-72 h-72 rounded-full opacity-10 bg-indigo-500 dark:opacity-5"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-indigo-600 dark:text-indigo-400 text-sm font-medium tracking-wider uppercase mb-2">
            Get in Touch
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
            Let's Start a Conversation
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Have a project in mind? We'd love to hear about it. Let us know how we can help.
          </p>
        </div>

        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-gray-900 text-white p-12 lg:p-16">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                  <div className="space-y-8">
                    {contactInfo.map((item, index) => (
                      <ContactInfoItem 
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        content={item.content}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mt-12">
                  <h4 className="text-lg font-medium mb-4">Connect with us</h4>
                  <div className="flex space-x-4">
                    {Object.entries(SocialIcons).map(([name, icon]) => (
                      <SocialButton key={name} name={name} icon={icon} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-12 lg:p-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <FormInput
                      label="Full Name"
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      error={errors.name}
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <FormInput
                      label="Email"
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      error={errors.email}
                    />
                  </div>

                  <div className="col-span-2">
                    <FormInput
                      label="Phone (Optional)"
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 5678 90 00"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white resize-none transition-colors duration-200"
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full flex justify-center items-center py-3 px-6 rounded-lg text-base font-medium text-white
                      bg-black hover:bg-gray-800 dark:bg-indigo-600 dark:hover:bg-indigo-700
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                      disabled:opacity-75 disabled:cursor-not-allowed transition-colors duration-200 shadow-lg"
                  >
                    {formStatus === 'sending' ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </div>
                    ) : 'Send Message'}
                  </button>
                </div>

                {formStatus === 'success' && (
                  <div className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded-lg">
                    Your message has been sent successfully. We will get back to you as soon as possible.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg">
                    An error occurred. Please try again later.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 