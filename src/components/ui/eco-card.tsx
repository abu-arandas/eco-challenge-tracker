
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const ecoCardVariants = cva(
  "transition-all",
  {
    variants: {
      variant: {
        default: "bg-white border",
        gradient: "bg-gradient-to-br from-eco-primary/10 to-eco-secondary/30 border-0",
        accent: "border-l-4 border-l-eco-primary",
      },
      size: {
        default: "p-0",
        sm: "p-0",
        lg: "p-0",
      },
      hover: {
        default: "",
        lift: "hover:shadow-md hover:-translate-y-1",
        glow: "hover:shadow-[0_0_15px_rgba(155,135,245,0.3)]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "default",
    }
  }
);

export interface EcoCardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof ecoCardVariants> {}

const EcoCard = React.forwardRef<
  HTMLDivElement,
  EcoCardProps & React.ComponentPropsWithoutRef<typeof Card>
>(({ className, variant, size, hover, ...props }, ref) => {
  return (
    <Card 
      className={cn(ecoCardVariants({ variant, size, hover }), className)}
      ref={ref}
      {...props} 
    />
  );
});

EcoCard.displayName = "EcoCard";

export { EcoCard, ecoCardVariants, CardContent, CardHeader, CardTitle, CardDescription, CardFooter };
