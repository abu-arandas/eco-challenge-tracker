
import React, { useState, useMemo } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { useChallenges } from '@/hooks/useChallenges';
import ChallengeCard from '@/components/challenges/ChallengeCard';

const Challenges = () => {
  const { challenges, isLoading, error, joinChallenge, isJoining } = useChallenges();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredChallenges = useMemo(() => {
    if (!challenges) return [];
    return challenges.filter(challenge => 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [challenges, searchQuery]);
  
  const activeCount = filteredChallenges.filter(c => c.user_challenges?.[0]?.status === 'in_progress').length;
  const availableCount = filteredChallenges.filter(c => !c.user_challenges?.[0]).length;
  const completedCount = filteredChallenges.filter(c => c.user_challenges?.[0]?.status === 'completed').length;
  
  if (error) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error loading challenges</h2>
          <p className="text-eco-neutral">Please try again later</p>
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

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eco-neutral" />
        <Input
          type="text"
          placeholder="Search challenges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="active" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableCount})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
        </TabsList>
        
        {['active', 'available', 'completed'].map((status) => (
          <TabsContent key={status} value={status} className="pt-4">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-eco-primary" />
              </div>
            ) : filteredChallenges.filter(c => {
              const userStatus = c.user_challenges?.[0]?.status;
              if (status === 'available') return !userStatus;
              if (status === 'active') return userStatus === 'in_progress';
              return userStatus === 'completed';
            }).length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🌱</div>
                <h3 className="text-lg font-medium mb-1">
                  {searchQuery ? 'No matching challenges found' : `No ${status} challenges`}
                </h3>
                <p className="text-eco-neutral">
                  {searchQuery ? 'Try adjusting your search terms' : (
                    status === 'active' ? "Start a challenge to see it here!" :
                    status === 'available' ? "You've joined all available challenges!" :
                    "Complete challenges to see them here!"
                  )}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
                {filteredChallenges
                  .filter(c => {
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
