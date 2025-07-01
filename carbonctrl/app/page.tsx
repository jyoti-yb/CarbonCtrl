"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Activity,
  Brain,
  BarChart3,
  Lightbulb,
  Menu,
  X,
  Globe,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Play,
  Monitor,
  Briefcase,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/lib/auth-context"
import { Dashboard } from "@/components/dashboard"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const { user, loading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in")
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("animate-fade-in")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (user) {
    return <Dashboard />
  }

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-emerald-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CarbonCtrl</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#home" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors">
                About
              </Link>
              <Button
                variant="ghost"
                onClick={() => openAuthModal("signin")}
                className="text-gray-700 hover:text-emerald-600"
              >
                Login
              </Button>
              <Button
                onClick={() => openAuthModal("signup")}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-emerald-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="#home" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
                Home
              </Link>
              <Link href="#about" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
                About
              </Link>
              <Button
                variant="ghost"
                onClick={() => openAuthModal("signin")}
                className="w-full justify-start text-gray-700 hover:text-emerald-600"
              >
                Login
              </Button>
              <Button
                onClick={() => openAuthModal("signup")}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="fade-in">
              <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                🌱 Digital Sustainability Made Simple
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Track. Reduce. Control your{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Digital Carbon Footprint
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Take control of your digital environmental impact with real-time tracking, personalized insights, and
                AI-powered recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => openAuthModal("signup")}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => openAuthModal("signin")}
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3 text-lg"
                >
                  Sign In
                </Button>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="mt-16 fade-in">
              <div className="relative max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <Globe className="w-32 h-32 text-emerald-500 animate-pulse" />
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <TrendingDown className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/50 rounded-lg p-3">
                      <Monitor className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Browsing</p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <Play className="w-6 h-6 text-red-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Streaming</p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <Briefcase className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why CarbonCtrl?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            CarbonCtrl helps users measure and reduce the hidden carbon emissions of their digital life—like browsing,
            streaming, and online work. Every click, every stream, every video call has an environmental impact. We make
            it visible, measurable, and actionable.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track</h3>
              <p className="text-gray-600">Monitor your digital activities in real-time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Analyze</h3>
              <p className="text-gray-600">Get detailed insights into your carbon footprint</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reduce</h3>
              <p className="text-gray-600">Take action with personalized recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Digital Sustainability</h2>
            <p className="text-lg text-gray-600">
              Everything you need to understand and reduce your digital carbon footprint
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Activity,
                title: "Real-time Activity Tracking",
                description: "Monitor your browsing, streaming, and work activities as they happen",
                color: "emerald",
              },
              {
                icon: Brain,
                title: "ML-based Insights",
                description: "AI-powered analysis of your digital habits and carbon impact patterns",
                color: "blue",
              },
              {
                icon: BarChart3,
                title: "Personal Activity Reports",
                description: "Detailed breakdowns of your carbon footprint across different activities",
                color: "purple",
              },
              {
                icon: Lightbulb,
                title: "Smart Suggestions",
                description: "Personalized recommendations to reduce your environmental impact",
                color: "green",
              },
            ].map((feature, index) => (
              <Card key={index} className="fade-in hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}
                  >
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are passionate students and developers committed to solving digital pollution through technology. Our
              mission is to make climate action accessible through innovative digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="fade-in hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">J</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Jyoti</h3>
                <p className="text-gray-600 mb-4">Co-founder & Lead Developer</p>
                <p className="text-sm text-gray-500">
                  Passionate about sustainable technology and environmental impact measurement
                </p>
              </CardContent>
            </Card>

            <Card className="fade-in hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">T</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Teammate</h3>
                <p className="text-gray-600 mb-4">Co-founder & Data Scientist</p>
                <p className="text-sm text-gray-500">Expert in machine learning and carbon footprint analysis</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center fade-in">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission: Tech for Climate Action</h3>
              <p className="text-lg text-gray-600">
                "We are students solving digital pollution by making the invisible visible. Every byte of data has a
                carbon cost, and we're here to help you understand and reduce it."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CarbonCtrl</span>
              </div>
              <p className="text-gray-400 mb-4">
                Making digital sustainability accessible to everyone. Track, reduce, and control your digital carbon
                footprint.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe className="w-4 h-4" />
                <span>carbonctrl.io</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@carbonctrl.io</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Github className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CarbonCtrl. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}
