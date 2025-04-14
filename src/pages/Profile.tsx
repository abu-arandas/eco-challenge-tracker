
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  EcoCard, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/eco-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Award, Settings, Lock, Globe, Bell } from 'lucide-react';

const badges = [
  {
    id: 1,
    name: "Public Transport Champion",
    description: "Completed the Public Transport Champion challenge",
    icon: "🚌",
    date: "Apr 2, 2025"
  },
  {
    id: 2,
    name: "Digital Detox",
    description: "Completed the Digital Detox Weekend challenge",
    icon: "🔌",
    date: "Mar 28, 2025"
  },
  {
    id: 3,
    name: "Tree Planter",
    description: "Contributed to planting 5 trees",
    icon: "🌳",
    date: "Mar 15, 2025"
  },
  {
    id: 4,
    name: "Carbon Cutter",
    description: "Reduced carbon footprint by 20%",
    icon: "✂️",
    date: "Mar 10, 2025"
  },
  {
    id: 5,
    name: "Early Adopter",
    description: "Joined the EcoTrack community",
    icon: "🌱",
    date: "Mar 1, 2025"
  }
];

const Profile = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-eco-neutral">Manage your account and view your achievements</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Profile summary card */}
        <EcoCard>
          <CardContent className="pt-6 text-center">
            <div className="mb-4 flex flex-col items-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="https://i.pravatar.cc/150?u=ecouser" />
                <AvatarFallback className="bg-eco-primary text-white text-lg">EC</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">Eco Hero</h2>
              <p className="text-eco-neutral">@ecohero</p>
            </div>
            <div className="flex justify-center gap-4 mb-4 text-center">
              <div className="text-center">
                <div className="text-xl font-bold text-eco-primary">348</div>
                <div className="text-xs text-eco-neutral">CO₂ Saved (kg)</div>
              </div>
              <div className="border-r border-gray-200"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-eco-primary">7</div>
                <div className="text-xs text-eco-neutral">Badges</div>
              </div>
              <div className="border-r border-gray-200"></div>
              <div className="text-center">
                <div className="text-xl font-bold text-eco-primary">3</div>
                <div className="text-xs text-eco-neutral">Challenges</div>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <Badge className="bg-emerald-100 text-emerald-700 border-0">Eco Enthusiast</Badge>
            </div>
            <Button variant="outline" className="w-full border-eco-primary text-eco-primary hover:bg-eco-primary/10">
              Edit Profile
            </Button>
          </CardContent>
        </EcoCard>
        
        {/* Main content area */}
        <div className="md:col-span-2">
          <Tabs defaultValue="badges">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="badges" className="flex gap-1 items-center">
                <Award size={16} />
                <span className="hidden sm:inline">Badges</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex gap-1 items-center">
                <Settings size={16} />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex gap-1 items-center">
                <Lock size={16} />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex gap-1 items-center">
                <Bell size={16} />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="badges" className="pt-4">
              <EcoCard>
                <CardHeader>
                  <CardTitle>Your Achievement Badges</CardTitle>
                  <CardDescription>Badges earned through your sustainability efforts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {badges.map((badge) => (
                      <div key={badge.id} className="border rounded-lg p-4 flex items-start gap-3">
                        <div className="w-10 h-10 bg-eco-secondary rounded-full flex items-center justify-center text-xl">
                          {badge.icon}
                        </div>
                        <div>
                          <div className="font-medium">{badge.name}</div>
                          <div className="text-xs text-eco-neutral mb-1">{badge.description}</div>
                          <div className="text-xs text-eco-neutral">Earned on {badge.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </EcoCard>
            </TabsContent>
            
            <TabsContent value="settings" className="pt-4">
              <EcoCard>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="display-name">Display Name</Label>
                        <Input id="display-name" defaultValue="Eco Hero" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="ecohero" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="eco@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="San Francisco, CA" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-eco-primary hover:bg-eco-primary/80">Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </EcoCard>
            </TabsContent>
            
            <TabsContent value="privacy" className="pt-4">
              <EcoCard>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control who can see your data and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-eco-neutral">Control who can see your profile</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe size={16} className="text-eco-neutral" />
                        <span className="text-sm">Public</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Activity Sharing</Label>
                        <p className="text-sm text-eco-neutral">Share your activities with others</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe size={16} className="text-eco-neutral" />
                        <span className="text-sm">Public</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Challenge Progress</Label>
                        <p className="text-sm text-eco-neutral">Show your challenge progress</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe size={16} className="text-eco-neutral" />
                        <span className="text-sm">Public</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">Change Privacy Settings</Button>
                  </div>
                </CardContent>
              </EcoCard>
            </TabsContent>
            
            <TabsContent value="preferences" className="pt-4">
              <EcoCard>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="challenge-notifications">Challenge Reminders</Label>
                      <Switch id="challenge-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="achievement-notifications">Achievement Notifications</Label>
                      <Switch id="achievement-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tips-notifications">Sustainability Tips</Label>
                      <Switch id="tips-notifications" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="weekly-summary">Weekly Summary Email</Label>
                      <Switch id="weekly-summary" defaultChecked />
                    </div>
                    
                    <Button variant="outline" className="w-full">Save Preferences</Button>
                  </div>
                </CardContent>
              </EcoCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

// Badge component
const Badge = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

// Switch component
const Switch = ({ id, defaultChecked }: { id: string, defaultChecked?: boolean }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={id}
        className={`block w-10 h-5 rounded-full transition duration-150 ease-in-out cursor-pointer ${
          defaultChecked ? 'bg-eco-primary' : 'bg-eco-neutral/20'
        }`}
      >
        <span
          className={`block w-3 h-3 mt-1 ml-1 bg-white rounded-full transition-transform duration-150 ease-in-out ${
            defaultChecked ? 'transform translate-x-5' : ''
          }`}
        />
      </label>
    </div>
  );
};

export default Profile;
