import React, { useState } from 'react'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    
    const validationErrors = validate()
    if (Object.keys(validationErrors).length === 0) {
      // Simulated form submission
      setTimeout(() => {
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        
        // Reset form after 3 seconds
        setTimeout(() => setFormStatus('idle'), 3000)
      }, 1500)
    } else {
      setErrors(validationErrors)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Full Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.message) newErrors.message = 'Message is required'
    return newErrors
  }

  return (
    <section id="contact" className="relative py-16 bg-gray-50 dark:bg-gray-900">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Get in touch with us for your projects. We'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                icon: <PhoneIcon className="h-6 w-6 text-indigo-600" />,
                title: "Phone",
                content: "+90 555 555 55 55",
              },
              {
                icon: <EnvelopeIcon className="h-6 w-6 text-indigo-600" />,
                title: "Email",
                content: "info@mail.com",
              },
              {
                icon: <MapPinIcon className="h-6 w-6 text-indigo-600" />,
                title: "Address",
                content: "Levent, Istanbul, Turkey",
              },
              {
                icon: <ClockIcon className="h-6 w-6 text-indigo-600" />,
                title: "Working Hours",
                content: "Monday - Friday: 09:00 - 18:00\nSaturday: 10:00 - 14:00",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg text-indigo-600 dark:text-indigo-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="relative p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Your Full Name"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div className="col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="+90 555 555 55 55"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white resize-none"
                    placeholder="Type your message here..."
                  />
                  {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full flex justify-center items-center py-3 px-6 rounded-md text-base font-medium text-white
                    bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {formStatus === 'sending' ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </div>
                  ) : 'Submit'}
                </button>
              </div>

              {formStatus === 'success' && (
                <div className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded-md">
                  Your message has been sent successfully. We will get back to you as soon as possible.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-md">
                  An error occurred. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 