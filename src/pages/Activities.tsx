
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  EcoCard, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/eco-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Home as HomeIcon, Utensils, ShoppingBag, Plane } from 'lucide-react';

const ActivityIcon = ({ type }: { type: string }) => {
  const icons = {
    'transport': Car,
    'home': HomeIcon,
    'food': Utensils,
    'shopping': ShoppingBag,
    'travel': Plane
  };
  
  const IconComponent = icons[type as keyof typeof icons];
  return IconComponent ? <IconComponent size={18} /> : null;
};

const activities = [
  {
    id: 1,
    type: 'transport',
    name: 'Car Commute',
    date: '2025-04-14',
    carbon: 8.2,
    details: '15 km driven in gasoline car'
  },
  {
    id: 2,
    type: 'home',
    name: 'Electricity Usage',
    date: '2025-04-13',
    carbon: 5.7,
    details: '12 kWh electricity consumption'
  },
  {
    id: 3,
    type: 'food',
    name: 'Vegetarian Lunch',
    date: '2025-04-13',
    carbon: -1.8,
    details: 'Plant-based meal instead of meat'
  },
  {
    id: 4,
    type: 'shopping',
    name: 'Secondhand Purchase',
    date: '2025-04-12',
    carbon: -2.5,
    details: 'Bought used clothing instead of new'
  },
  {
    id: 5,
    type: 'travel',
    name: 'Short Flight',
    date: '2025-04-10',
    carbon: 120,
    details: '500 km flight'
  }
];

const transportOptions = [
  { label: 'Car (Gasoline)', value: 'car_gasoline', factor: 0.12 },
  { label: 'Car (Electric)', value: 'car_electric', factor: 0.05 },
  { label: 'Bus', value: 'bus', factor: 0.04 },
  { label: 'Train', value: 'train', factor: 0.03 },
  { label: 'Bicycle', value: 'bicycle', factor: 0 },
  { label: 'Walking', value: 'walking', factor: 0 },
];

const foodOptions = [
  { label: 'Beef Meal', value: 'beef', factor: 6.0 },
  { label: 'Chicken Meal', value: 'chicken', factor: 1.5 },
  { label: 'Vegetarian Meal', value: 'vegetarian', factor: 0.5 },
  { label: 'Vegan Meal', value: 'vegan', factor: 0.3 },
];

const homeOptions = [
  { label: 'Electricity Usage', value: 'electricity', factor: 0.4 },
  { label: 'Natural Gas Usage', value: 'natural_gas', factor: 0.2 },
  { label: 'Water Usage', value: 'water', factor: 0.1 },
];

const Activities = () => {
  const [activeTab, setActiveTab] = useState("log");
  const [searchQuery, setSearchQuery] = useState("");
  const [activityType, setActivityType] = useState<string>("");
  
  // Simple filtering function for activities
  const filteredActivities = activities.filter(activity => 
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Activity Tracker</h1>
        <p className="text-eco-neutral">Track your daily carbon footprint by logging your activities</p>
      </div>
      
      <Tabs defaultValue="log" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="log">Log Activity</TabsTrigger>
          <TabsTrigger value="history">Activity History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="log" className="pt-4">
          <EcoCard>
            <CardHeader>
              <CardTitle>Log New Activity</CardTitle>
              <CardDescription>Record activities that affect your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <Select value={activityType} onValueChange={setActivityType}>
                    <SelectTrigger id="activity-type">
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transport">Transportation</SelectItem>
                      <SelectItem value="food">Food & Diet</SelectItem>
                      <SelectItem value="home">Home Energy</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {activityType === 'transport' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Transportation Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transportation" />
                        </SelectTrigger>
                        <SelectContent>
                          {transportOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="distance">Distance (km)</Label>
                      <Input id="distance" type="number" placeholder="Enter distance" />
                    </div>
                  </div>
                )}
                
                {activityType === 'food' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Meal Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                          {foodOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="meal-size">Quantity</Label>
                      <Select>
                        <SelectTrigger id="meal-size">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small Portion</SelectItem>
                          <SelectItem value="medium">Medium Portion</SelectItem>
                          <SelectItem value="large">Large Portion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {activityType === 'home' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Energy Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select energy type" />
                        </SelectTrigger>
                        <SelectContent>
                          {homeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount (kWh/m³)</Label>
                      <Input id="amount" type="number" placeholder="Enter amount" />
                    </div>
                  </div>
                )}
                
                {activityType && (
                  <Button className="w-full bg-eco-primary hover:bg-eco-primary/80">Calculate & Save</Button>
                )}
              </div>
            </CardContent>
          </EcoCard>
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <EcoCard className="mb-6">
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Your recorded carbon footprint activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input 
                  placeholder="Search activities..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
                
                <div className="space-y-3">
                  {filteredActivities.length === 0 ? (
                    <p className="text-eco-neutral text-center py-4">No activities found</p>
                  ) : (
                    filteredActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.carbon < 0 
                              ? 'bg-emerald-100 text-emerald-600' 
                              : 'bg-amber-100 text-amber-600'
                          }`}>
                            <ActivityIcon type={activity.type} />
                          </div>
                          <div>
                            <div className="font-medium">{activity.name}</div>
                            <div className="text-xs text-eco-neutral">{activity.date} • {activity.details}</div>
                          </div>
                        </div>
                        <div className={`font-medium ${
                          activity.carbon < 0
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        }`}>
                          {activity.carbon < 0 ? activity.carbon : `+${activity.carbon}`} kg
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </EcoCard>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Activities;
