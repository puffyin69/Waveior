"use client";
import Image from "next/image";
import gsap from "gsap";
import { useEffect } from "react";
import { Montserrat } from "next/font/google";
import { Roboto } from "next/font/google";
import { Outfit } from "next/font/google";
import { Poppins } from "next/font/google";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Contactcard";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const Contact = ()=>{
    return(
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-white mb-20">
            {/* Premium Background Grid Pattern */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none z-0",
                    "[background-size:80px_80px]",
                    "[background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]"
                )}
                style={{
                    WebkitMaskImage:
                        "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8) 30%, transparent 80%)",
                    maskImage:
                        "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8) 30%, transparent 80%)",
                }}
            />

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-20 blur-3xl"></div>
            
            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-20 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h1 className={`${outfit.className} text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight`}>
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Touch</span>
                    </h1>
                    <p className={`${poppins.className} text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed`}>
                        Ready to start your next project? We'd love to hear from you. 
                        Send us a message and we'll respond as soon as possible.
                    </p>
                    
                    {/* Premium Divider */}
                    <div className="flex items-center justify-center mt-8">
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        <div className="mx-4 w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div className="space-y-8">
                            <div className="group">
                                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`${outfit.className} text-xl font-semibold text-gray-900 mb-2`}>Email Address</h3>
                                        <p className={`${roboto.className} text-gray-600 text-lg`}>contact.wearvio@gmail.com</p>
                                        <p className={`${poppins.className} text-sm text-gray-500 mt-1`}>Send us an email anytime!</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="group">
                                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`${outfit.className} text-xl font-semibold text-gray-900 mb-2`}>Phone Number</h3>
                                        <p className={`${roboto.className} text-gray-600 text-lg`}>+91 9227048988</p>
                                        <p className={`${poppins.className} text-sm text-gray-500 mt-1`}>Mon-Fri from 9am to 6pm</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`${outfit.className} text-xl font-semibold text-gray-900 mb-2`}>Response Time</h3>
                                        <p className={`${roboto.className} text-gray-600 text-lg`}>Within 24 hours</p>
                                        <p className={`${poppins.className} text-sm text-gray-500 mt-1`}>Fast and reliable support</p>
                                    </div>
                                </div>
                            </div>

                            {/* AI Features Coming Soon */}
                            <div className="group relative">
                                <div className="absolute -top-3 -right-3 z-10">
                                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                                        COMING SOON
                                    </span>
                                </div>
                                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 opacity-80">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`${outfit.className} text-xl font-semibold text-gray-900 mb-2`}>AI Model Generator</h3>
                                        <p className={`${roboto.className} text-gray-600 text-lg`}>Generate AI fashion models</p>
                                        <p className={`${poppins.className} text-sm text-gray-500 mt-1`}>Create custom models for your designs</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative">
                                <div className="absolute -top-3 -right-3 z-10">
                                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                                        COMING SOON
                                    </span>
                                </div>
                                <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 opacity-80">
                                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`${outfit.className} text-xl font-semibold text-gray-900 mb-2`}>AI Clothing Designer</h3>
                                        <p className={`${roboto.className} text-gray-600 text-lg`}>Design clothes with AI</p>
                                        <p className={`${poppins.className} text-sm text-gray-500 mt-1`}>Free AI-powered clothing creation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Premium Contact Form */}
                    <div className="relative">
                        {/* Form Background Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-30"></div>
                        
                        <Card className="relative bg-white/90 backdrop-blur-lg shadow-2xl border-0 rounded-3xl overflow-hidden">
                            {/* Card Header with Premium Styling */}
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                                <CardTitle className={`${outfit.className} text-3xl font-bold text-gray-900 tracking-tight`}>
                                    Send us a message
                                </CardTitle>
                                <CardDescription className={`${poppins.className} text-gray-600 text-base leading-relaxed`}>
                                    Fill out the form below and we'll get back to you within 24 hours
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="p-8">
                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className={`${outfit.className} block text-sm font-semibold text-gray-800 tracking-wide`}>
                                                FIRST NAME
                                            </label>
                                            <input 
                                                type="text" 
                                                className={`${roboto.className} w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500`}
                                                placeholder="John"
                                            />
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <label className={`${outfit.className} block text-sm font-semibold text-gray-800 tracking-wide`}>
                                                LAST NAME
                                            </label>
                                            <input 
                                                type="text" 
                                                className={`${roboto.className} w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500`}
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <label className={`${outfit.className} block text-sm font-semibold text-gray-800 tracking-wide`}>
                                            EMAIL ADDRESS
                                        </label>
                                        <input 
                                            type="email" 
                                            className={`${roboto.className} w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500`}
                                            placeholder="john.doe@example.com"
                                        />
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <label className={`${outfit.className} block text-sm font-semibold text-gray-800 tracking-wide`}>
                                            PHONE NUMBER (OPTIONAL)
                                        </label>
                                        <input 
                                            type="tel" 
                                            className={`${roboto.className} w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500`}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <label className={`${outfit.className} block text-sm font-semibold text-gray-800 tracking-wide`}>
                                            MESSAGE
                                        </label>
                                        <textarea 
                                            rows={6}
                                            className={`${roboto.className} w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-gray-900 placeholder-gray-500`}
                                            placeholder="Tell us about your project, requirements, or any questions you have..."
                                        ></textarea>
                                    </div>
                                </form>
                            </CardContent>
                            
                            <CardFooter className="p-8 pt-0">
                                <button 
                                    type="submit"
                                    className={`${outfit.className} w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wide`}
                                >
                                    Send Message →
                                </button>
                                
                                <p className={`${poppins.className} text-xs text-gray-500 text-center mt-4 w-full`}>
                                    By sending this message, you agree to our privacy policy and terms of service.
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;