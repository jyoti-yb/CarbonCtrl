"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, LogOut, TrendingDown, Monitor, Play, Briefcase, Lightbulb, Calendar, Award } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function Dashboard() {
  const { user, signOut } = useAuth()
  const [timeRange, setTimeRange] = useState("week")

  // Mock data - in a real app, this would come from your backend
  const carbonData = {
    totalSaved: 2.4,
    weeklyUsage: 8.7,
    monthlyUsage: 34.2,
    breakdown: {
      streaming: 45,
      browsing: 30,
      work: 25,
    },
    insights: [
      "You saved 15% more carbon this week compared to last week!",
      "Your streaming habits are 20% more efficient than average users",
      "Consider using dark mode to reduce screen energy consumption",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CarbonCtrl</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.email?.split("@")[0]}!</span>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="flex items-center space-x-2 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Carbon Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{carbonData.totalSaved}kg</div>
              <p className="text-emerald-100 text-sm">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <TrendingDown className="w-5 h-5 mr-2 text-blue-500" />
                Weekly Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{carbonData.weeklyUsage}kg</div>
              <p className="text-gray-600 text-sm">CO₂ emissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                Monthly Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{carbonData.monthlyUsage}kg</div>
              <p className="text-gray-600 text-sm">CO₂ emissions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Breakdown</CardTitle>
              <CardDescription>Your carbon footprint by activity type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">Streaming</span>
                  </div>
                  <span className="text-sm text-gray-600">{carbonData.breakdown.streaming}%</span>
                </div>
                <Progress value={carbonData.breakdown.streaming} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Browsing</span>
                  </div>
                  <span className="text-sm text-gray-600">{carbonData.breakdown.browsing}%</span>
                </div>
                <Progress value={carbonData.breakdown.browsing} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Work</span>
                  </div>
                  <span className="text-sm text-gray-600">{carbonData.breakdown.work}%</span>
                </div>
                <Progress value={carbonData.breakdown.work} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* ML Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                AI Insights & Suggestions
              </CardTitle>
              <CardDescription>Personalized recommendations to reduce your impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {carbonData.insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Carbon Usage Chart Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Carbon Usage Over Time</CardTitle>
            <CardDescription>Track your digital carbon footprint trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingDown className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <p className="text-gray-600">Interactive chart coming soon!</p>
                <p className="text-sm text-gray-500 mt-2">Your carbon usage has decreased by 15% this week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
