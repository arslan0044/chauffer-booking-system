"use client";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import HeroSection from "@/components/HeroSection";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import CTASection from "@/components/CTASection";
// import Navbar from '../../../components/Navbar';
// import Footer from '../../../components/Footer';
// import { Metadata } from 'next';

// SEO metadata
// export const metadata: Metadata = {
//   title: 'Contact Us - Luxury Chauffeur Services | Premium Transportation',
//   description: 'Get in touch with our luxury chauffeur service. Book premium transportation, ask questions, or request a quote. Available 24/7 for your convenience.',
//   keywords: 'contact chauffeur service, luxury transportation contact, premium car service inquiry, chauffeur booking contact',
//   openGraph: {
//     title: 'Contact Us - Luxury Chauffeur Services',
//     description: 'Get in touch with our luxury chauffeur service. Available 24/7 for premium transportation needs.',
//     type: 'website',
//   },
// };

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error(
        "Sorry, there was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const data = { Name: "luxury chauffeur", Email: "info@citisolution.com" };

  return (
    <>
      {/* <Navbar Name={data.Name} /> */}
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <HeroSection
          title="Contact Us"
          description="Get in touch for premium chauffeur services. We're here to make your journey exceptional."
        />


        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-slide-in-left" id="booking">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 relative">
                    Book Your Luxury Experience
                    <span className="absolute -bottom-2 left-0 w-20 h-1 bg-primary-main"></span>
                  </h2>
                  <p className="text-gray-600 mb-8 animate-fade-in">
                    <span className="font-semibold text-primary-main">Elevate your journey</span> with our premium chauffeur service. 
                    Complete the form below and let us craft your perfect travel experience.
                  </p>

                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <CheckCircle className="text-green-600 w-5 h-5" />
                      <span className="text-green-800">
                        Message sent successfully!
                      </span>
                    </div>
                  )}

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent transition-all duration-200 ${
                          errors.name
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter your full name"
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="mt-1 text-sm text-red-600"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent transition-all duration-200 ${
                          errors.email
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter your email address"
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-1 text-sm text-red-600"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent transition-all duration-200 ${
                          errors.phone
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter your phone number"
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                      />
                      {errors.phone && (
                        <p
                          id="phone-error"
                          className="mt-1 text-sm text-red-600"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-main focus:border-transparent transition-all duration-200 resize-none ${
                          errors.message
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Tell us about your transportation needs..."
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="mt-1 text-sm text-red-600"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-main text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="animate-slide-in-right">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Get in Touch
                    </h2>
                    <p className="text-gray-600 text-lg">
                      We're available 24/7 to assist you with all your luxury
                      transportation needs.
                    </p>
                  </div>

                  {/* Contact Cards */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary-main text-white p-3 rounded-lg">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Phone
                          </h3>
                          <p className="text-gray-600">+1 (555) 123-4567</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Available 24/7
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary-main text-white p-3 rounded-lg">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Email
                          </h3>
                          <p className="text-gray-600">{data.Email}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            We'll respond within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary-main text-white p-3 rounded-lg">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Address
                          </h3>
                          <p className="text-gray-600">
                            123 Luxury Drive
                            <br />
                            Premium District, NY 10001
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Visit our office
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary-main text-white p-3 rounded-lg">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Office Hours
                          </h3>
                          <p className="text-gray-600">
                            Monday - Friday: 8:00 AM - 8:00 PM
                          </p>
                          <p className="text-gray-600">
                            Saturday - Sunday: 9:00 AM - 6:00 PM
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Service available 24/7
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Find Our Location
              </h2>
              <p className="text-gray-600 text-lg">
                Visit our office or we'll come to you. Premium service, wherever
                you are.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
              <div className="aspect-w-16 aspect-h-9 h-96 md:h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959729807!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Luxury Chauffeur Office Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
             <CTASection
          title="Ready for Your Next Journey?"
          description="Experience the difference of premium chauffeur service. Book now or call us for immediate assistance."
          button1={{
            text: "Call Now",
            link: "tel:+15551234567",
            type: "primary",
          }}
          button2={{
            text: "Book Online",
            link: "#booking",
            type: "secondary",
          }}

        />

      </main>
      {/* <Footer Name={data.Name} email={data.Email} /> */}
    </>
  );
}

export default ContactPage;
