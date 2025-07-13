import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CompetencyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const CompetencyCard = ({ icon: Icon, title, description, delay = 0 }: CompetencyCardProps) => {
  return (
    <Card 
      className="p-6 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 rounded-full bg-primary/10">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};