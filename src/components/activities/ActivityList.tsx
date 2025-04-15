
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Car, Home, ShoppingBag, Utensils } from "lucide-react";

const getActivityIcon = (type: string) => {
  switch (type) {
    case "transport":
      return Car;
    case "home":
      return Home;
    case "food":
      return Utensils;
    case "shopping":
      return ShoppingBag;
    default:
      return Car;
  }
};

export function ActivityList() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading activities...</div>;
  }

  if (!activities?.length) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No activities recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = getActivityIcon(activity.type);
        return (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 rounded-lg border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium capitalize">{activity.type}</h3>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-medium">
                {activity.carbon_impact} kg CO₂
              </span>
              <p className="text-xs text-muted-foreground">
                {new Date(activity.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  );
}
