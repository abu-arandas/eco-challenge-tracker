
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const ACTIVITY_TYPES = [
  { value: "transport", label: "Transport" },
  { value: "home", label: "Home Energy" },
  { value: "food", label: "Food" },
  { value: "shopping", label: "Shopping" },
];

export function AddActivityForm() {
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState("");
  const [carbonImpact, setCarbonImpact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("activities").insert({
        type,
        description,
        carbon_impact: parseFloat(carbonImpact),
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Activity has been recorded.",
      });

      // Reset form
      setType("");
      setDescription("");
      setCarbonImpact("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Select value={type} onValueChange={setType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select activity type" />
          </SelectTrigger>
          <SelectContent>
            {ACTIVITY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Describe your activity..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          step="0.1"
          placeholder="Carbon impact (kg CO₂)"
          value={carbonImpact}
          onChange={(e) => setCarbonImpact(e.target.value)}
          required
        />
      </div>

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Recording..." : "Record Activity"}
      </Button>
    </form>
  );
}
