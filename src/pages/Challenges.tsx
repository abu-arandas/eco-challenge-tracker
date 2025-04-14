
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  EcoCard, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/eco-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const challenges = [
  {
    id: 1,
    title: "30-Day Bike Commute",
    description: "Commute by bicycle for 30 days to reduce transportation emissions.",
    category: "Transport",
    difficulty: "Medium",
    impact: "High",
    reward: "Forest Guardian Badge",
    duration: "30 days",
    progress: 70,
    status: "active",
    icon: "🚲"
  },
  {
    id: 2,
    title: "Meatless Mondays",
    description: "Skip meat every Monday for a month to reduce your dietary carbon footprint.",
    category: "Food",
    difficulty: "Easy",
    impact: "Medium",
    reward: "Plant Powered Badge",
    duration: "4 weeks",
    progress: 50,
    status: "active",
    icon: "🥗"
  },
  {
    id: 3,
    title: "Zero Waste Week",
    description: "Produce no landfill waste for an entire week by refusing, reducing, reusing, and recycling.",
    category: "Lifestyle",
    difficulty: "Hard",
    impact: "High",
    reward: "Waste Warrior Badge",
    duration: "7 days",
    progress: 0,
    status: "available",
    icon: "♻️"
  },
  {
    id: 4,
    title: "Energy Saver",
    description: "Reduce your home electricity usage by 15% for two weeks.",
    category: "Home",
    difficulty: "Medium",
    impact: "Medium",
    reward: "Power Saver Badge",
    duration: "14 days",
    progress: 0,
    status: "available",
    icon: "💡"
  },
  {
    id: 5,
    title: "Local Food Hero",
    description: "Source all your food from local providers for 2 weeks.",
    category: "Food",
    difficulty: "Medium",
    impact: "Medium",
    reward: "Locavore Badge",
    duration: "14 days",
    progress: 0,
    status: "available",
    icon: "🍎"
  },
  {
    id: 6,
    title: "Public Transport Champion",
    description: "Use only public transportation for two weeks.",
    category: "Transport",
    difficulty: "Easy",
    impact: "Medium",
    reward: "Transit Trooper Badge",
    duration: "14 days",
    progress: 100,
    status: "completed",
    icon: "🚌"
  },
  {
    id: 7,
    title: "Digital Detox Weekend",
    description: "Reduce screen time and electricity use for a weekend.",
    category: "Lifestyle",
    difficulty: "Easy",
    impact: "Low",
    reward: "Unplugged Badge",
    duration: "2 days",
    progress: 100,
    status: "completed",
    icon: "🔌"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch(difficulty.toLowerCase()) {
    case 'easy': 
      return 'bg-green-100 text-green-700 hover:bg-green-100';
    case 'medium': 
      return 'bg-amber-100 text-amber-700 hover:bg-amber-100';
    case 'hard': 
      return 'bg-red-100 text-red-700 hover:bg-red-100';
    default: 
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
  }
};

const getImpactColor = (impact: string) => {
  switch(impact.toLowerCase()) {
    case 'low': 
      return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
    case 'medium': 
      return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
    case 'high': 
      return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100';
    default: 
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
  }
};

const ChallengeCard = ({ challenge }: { challenge: any }) => {
  return (
    <EcoCard hover="lift" className={challenge.status === 'active' ? 'border-l-4 border-l-eco-primary' : ''}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-xl">{challenge.icon}</span>
            <CardTitle className="text-lg">{challenge.title}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
              {challenge.difficulty}
            </Badge>
            <Badge variant="outline" className={getImpactColor(challenge.impact)}>
              {challenge.impact} Impact
            </Badge>
          </div>
        </div>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="text-eco-neutral">Category:</span>
            <p className="font-medium">{challenge.category}</p>
          </div>
          <div>
            <span className="text-eco-neutral">Duration:</span>
            <p className="font-medium">{challenge.duration}</p>
          </div>
          <div>
            <span className="text-eco-neutral">Reward:</span>
            <p className="font-medium">{challenge.reward}</p>
          </div>
        </div>
        
        {challenge.status === 'active' && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{challenge.progress}%</span>
            </div>
            <Progress value={challenge.progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {challenge.status === 'available' && (
          <Button className="w-full bg-eco-primary hover:bg-eco-primary/80">Start Challenge</Button>
        )}
        {challenge.status === 'active' && (
          <Button className="w-full bg-eco-primary hover:bg-eco-primary/80">Continue Challenge</Button>
        )}
        {challenge.status === 'completed' && (
          <Button className="w-full" variant="outline" disabled>Completed</Button>
        )}
      </CardFooter>
    </EcoCard>
  );
};

const Challenges = () => {
  const [activeTab, setActiveTab] = useState("active");
  
  const activeCount = challenges.filter(c => c.status === 'active').length;
  const availableCount = challenges.filter(c => c.status === 'available').length;
  const completedCount = challenges.filter(c => c.status === 'completed').length;
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Eco-Challenges</h1>
        <p className="text-eco-neutral">Complete sustainability challenges to earn badges and reduce your footprint</p>
      </div>
      
      <Tabs defaultValue="active" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableCount})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
        </TabsList>
        
        {['active', 'available', 'completed'].map((status) => (
          <TabsContent key={status} value={status} className="pt-4">
            {challenges.filter(c => c.status === status).length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🌱</div>
                <h3 className="text-lg font-medium mb-1">No {status} challenges</h3>
                <p className="text-eco-neutral">
                  {status === 'active' && "Start a challenge to see it here!"}
                  {status === 'available' && "You've joined all available challenges!"}
                  {status === 'completed' && "Complete challenges to see them here!"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
                {challenges
                  .filter(c => c.status === status)
                  .map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </AppLayout>
  );
};

export default Challenges;
