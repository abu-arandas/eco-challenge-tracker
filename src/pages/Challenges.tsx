
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useChallenges } from '@/hooks/useChallenges';
import ChallengeCard from '@/components/challenges/ChallengeCard';

const Challenges = () => {
  const { challenges, isLoading, joinChallenge, isJoining } = useChallenges();
  
  const activeCount = challenges?.filter(c => c.user_challenges?.[0]?.status === 'in_progress').length || 0;
  const availableCount = challenges?.filter(c => !c.user_challenges?.[0]).length || 0;
  const completedCount = challenges?.filter(c => c.user_challenges?.[0]?.status === 'completed').length || 0;
  
  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-eco-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Eco-Challenges</h1>
        <p className="text-eco-neutral">Complete sustainability challenges to earn badges and reduce your footprint</p>
      </div>
      
      <Tabs defaultValue="active" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableCount})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
        </TabsList>
        
        {['active', 'available', 'completed'].map((status) => (
          <TabsContent key={status} value={status} className="pt-4">
            {challenges?.filter(c => {
              const userStatus = c.user_challenges?.[0]?.status;
              if (status === 'available') return !userStatus;
              if (status === 'active') return userStatus === 'in_progress';
              return userStatus === 'completed';
            }).length === 0 ? (
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
                  ?.filter(c => {
                    const userStatus = c.user_challenges?.[0]?.status;
                    if (status === 'available') return !userStatus;
                    if (status === 'active') return userStatus === 'in_progress';
                    return userStatus === 'completed';
                  })
                  .map((challenge) => (
                    <ChallengeCard 
                      key={challenge.id} 
                      challenge={challenge} 
                      onJoin={joinChallenge}
                      isJoining={isJoining}
                    />
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
