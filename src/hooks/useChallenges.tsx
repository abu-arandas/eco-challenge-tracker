
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";
import { useCallback } from "react";

export function useChallenges() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("challenges")
        .select(`
          *,
          user_challenges!left(*)
        `)
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({
          title: "Error loading challenges",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
  });

  const joinChallenge = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to join challenges",
          variant: "destructive",
        });
        throw new Error("No user");
      }
      
      const { data, error } = await supabase
        .from("user_challenges")
        .insert({
          challenge_id: challengeId,
          user_id: user.id,
          status: 'in_progress'
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      toast({
        title: "Success!",
        description: "You've successfully joined the challenge!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join challenge. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    challenges,
    isLoading,
    error,
    joinChallenge: joinChallenge.mutate,
    isJoining: joinChallenge.isPending,
  };
}
