
import React from 'react';
import { Award, Calendar, Target } from 'lucide-react';
import { 
  EcoCard, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/eco-card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    points: number;
    start_date: string;
    end_date: string;
    user_challenges?: {
      status: string;
      completed_at: string | null;
    }[];
  };
  onJoin: (id: string) => void;
  isJoining: boolean;
}

const ChallengeCard = ({ challenge, onJoin, isJoining }: ChallengeCardProps) => {
  const userChallenge = challenge.user_challenges?.[0];
  const status = userChallenge?.status || 'available';
  const isCompleted = status === 'completed';
  const isActive = status === 'in_progress';
  
  return (
    <EcoCard 
      hover="lift" 
      className={cn(
        'transition-all duration-300 ease-in-out',
        isActive ? 'border-l-4 border-l-eco-primary' : '',
        'hover:shadow-lg'
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Award className={cn(
              "h-6 w-6 transition-colors",
              isCompleted ? "text-eco-orange" : "text-eco-primary"
            )} />
            <CardTitle className="text-lg">{challenge.title}</CardTitle>
          </div>
          <Badge variant={isCompleted ? "secondary" : "outline"} className="animate-fade-in">
            {isCompleted ? "Completed" : `${challenge.points} points`}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-eco-neutral">
              <Calendar className="h-4 w-4" />
              <span>Starts: {format(new Date(challenge.start_date), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2 text-eco-neutral">
              <Target className="h-4 w-4" />
              <span>Ends: {format(new Date(challenge.end_date), 'MMM d, yyyy')}</span>
            </div>
          </div>
          
          {isActive && (
            <div className="animate-fade-in">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span className="text-eco-primary">In Progress</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {status === 'available' && (
          <Button 
            className={cn(
              "w-full bg-eco-primary hover:bg-eco-primary/80 transition-all",
              "hover:translate-y-[-1px]"
            )}
            onClick={() => onJoin(challenge.id)}
            disabled={isJoining}
          >
            {isJoining ? 'Joining...' : 'Join Challenge'}
          </Button>
        )}
        {isActive && (
          <Button 
            className="w-full bg-eco-primary hover:bg-eco-primary/80 transition-all"
          >
            Continue Challenge
          </Button>
        )}
        {isCompleted && (
          <Button 
            className="w-full" 
            variant="outline" 
            disabled
          >
            Completed
          </Button>
        )}
      </CardFooter>
    </EcoCard>
  );
};

export default ChallengeCard;
