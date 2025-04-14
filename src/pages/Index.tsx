
import React from 'react';
import { 
  EcoCard, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/eco-card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Car, 
  Home as HomeIcon, 
  Utensils, 
  Award, 
  TrendingDown, 
  Leaf 
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

// Generate some sample activities
const recentActivities = [
  { 
    id: 1, 
    type: 'transport', 
    icon: Car, 
    title: 'Car Commute', 
    value: '8.2 kg', 
    time: 'Today, 9:15 AM',
    impact: 'negative'
  },
  { 
    id: 2, 
    type: 'home', 
    icon: HomeIcon, 
    title: 'Reduced Heating', 
    value: '-3.5 kg', 
    time: 'Yesterday, 8:00 PM',
    impact: 'positive'
  },
  { 
    id: 3, 
    type: 'food', 
    icon: Utensils, 
    title: 'Vegetarian Meal', 
    value: '-1.8 kg', 
    time: 'Yesterday, 1:30 PM',
    impact: 'positive'
  }
];

// Generate sample challenges
const activeChallenges = [
  {
    id: 1,
    title: "30-Day Bike Commute",
    progress: 70,
    days: "21/30 days",
    icon: "🚲"
  },
  {
    id: 2,
    title: "Meatless Mondays",
    progress: 50,
    days: "2/4 weeks",
    icon: "🥗"
  }
];

const Index = () => {
  // Monthly carbon data
  const monthlyCarbon = {
    current: 485,
    target: 400,
    average: 650,
    progress: 65
  };
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Eco Hero!</h1>
        <p className="text-eco-neutral">Your sustainability journey continues. Track your impact and complete challenges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Monthly progress */}
        <EcoCard variant="gradient" hover="glow" className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Monthly Carbon Footprint</span>
              <span className="text-lg font-normal">{monthlyCarbon.current} kg CO₂</span>
            </CardTitle>
            <CardDescription>
              You're using <strong>{Math.round((monthlyCarbon.current/monthlyCarbon.average) * 100)}%</strong> of the average person's carbon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to goal</span>
                <span>{monthlyCarbon.progress}%</span>
              </div>
              <Progress value={monthlyCarbon.progress} className="h-2.5" />
            </div>
            <div className="flex gap-3">
              <Button className="bg-eco-primary hover:bg-eco-primary/80">Add Activity</Button>
              <Button variant="outline" className="border-eco-primary text-eco-primary hover:bg-eco-primary/10">View Details</Button>
            </div>
          </CardContent>
        </EcoCard>
      
        {/* Impact summary */}
        <EcoCard hover="lift">
          <CardHeader>
            <CardTitle className="text-lg">Your Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-eco-secondary flex items-center justify-center">
                  <Leaf size={18} className="text-emerald-600" />
                </div>
                <span>Trees Saved</span>
              </div>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-eco-secondary flex items-center justify-center">
                  <TrendingDown size={18} className="text-emerald-600" />
                </div>
                <span>CO₂ Reduced</span>
              </div>
              <span className="font-medium">284 kg</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-eco-secondary flex items-center justify-center">
                  <Award size={18} className="text-emerald-600" />
                </div>
                <span>Badges Earned</span>
              </div>
              <span className="font-medium">7</span>
            </div>
          </CardContent>
        </EcoCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Recent activities */}
        <EcoCard className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest tracked carbon footprint activities</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-eco-neutral flex items-center gap-1">
              <span>View All</span>
              <ChevronRight size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.impact === 'positive' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-amber-100 text-amber-600'
                    }`}>
                      <activity.icon size={20} />
                    </div>
                    <div>
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-xs text-eco-neutral">{activity.time}</div>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    activity.impact === 'positive'
                      ? 'text-emerald-600'
                      : 'text-amber-600'
                  }`}>
                    {activity.value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </EcoCard>

        {/* Active challenges */}
        <EcoCard>
          <CardHeader>
            <CardTitle>Active Challenges</CardTitle>
            <CardDescription>Your sustainability goals in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeChallenges.map((challenge) => (
                <div key={challenge.id} className="border rounded-lg p-3">
                  <div className="flex gap-3 items-center mb-2">
                    <span className="text-xl">{challenge.icon}</span>
                    <span className="font-medium">{challenge.title}</span>
                  </div>
                  <div className="mb-2">
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-eco-neutral">{challenge.days}</span>
                    <span className="text-eco-primary font-medium">{challenge.progress}% Complete</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-3 text-eco-primary border-eco-primary hover:bg-eco-primary/10">
              Discover More Challenges
            </Button>
          </CardContent>
        </EcoCard>
      </div>
    </AppLayout>
  );
};

export default Index;
