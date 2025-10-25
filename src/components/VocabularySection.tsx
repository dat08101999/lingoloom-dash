import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, Star, RotateCcw } from "lucide-react";

interface VocabWord {
  word: string;
  translation: string;
  category: string;
  practiced: number;
  mastery: "beginner" | "intermediate" | "advanced";
}

const vocabulary: VocabWord[] = [
  { word: "Hello", translation: "Bonjour", category: "Greetings", practiced: 15, mastery: "advanced" },
  { word: "Thank you", translation: "Merci", category: "Phrases", practiced: 12, mastery: "advanced" },
  { word: "Beautiful", translation: "Belle", category: "Adjectives", practiced: 8, mastery: "intermediate" },
  { word: "Journey", translation: "Voyage", category: "Nouns", practiced: 5, mastery: "beginner" },
  { word: "Learning", translation: "Apprentissage", category: "Verbs", practiced: 10, mastery: "intermediate" },
  { word: "Friend", translation: "Ami", category: "Nouns", practiced: 14, mastery: "advanced" },
  { word: "Happy", translation: "Heureux", category: "Adjectives", practiced: 9, mastery: "intermediate" },
  { word: "Goodbye", translation: "Au revoir", category: "Greetings", practiced: 11, mastery: "advanced" },
];

const masteryColors = {
  beginner: "bg-[hsl(32,95%,60%)]/10 text-[hsl(32,95%,60%)] border-[hsl(32,95%,60%)]/20",
  intermediate: "bg-secondary/10 text-secondary border-secondary/20",
  advanced: "bg-accent/10 text-accent border-accent/20",
};

export const VocabularySection = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-0.5">Vocabulary</h2>
          <p className="text-xs text-muted-foreground">{vocabulary.length} words</p>
        </div>
        <Badge variant="outline" className="px-3 py-1 text-xs bg-primary/10 border-primary/20 text-primary">
          <Star className="w-3 h-3 mr-1 fill-primary" />
          {vocabulary.filter(v => v.mastery === "advanced").length} mastered
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {vocabulary.map((vocab, index) => (
          <Card 
            key={index}
            className="p-3 border-none shadow-lg active:scale-95 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col gap-2 mb-2">
              <Badge variant="outline" className="text-[9px] self-start px-1.5 py-0.5">
                {vocab.category}
              </Badge>
              <Badge variant="outline" className={`text-[9px] self-start px-1.5 py-0.5 ${masteryColors[vocab.mastery]}`}>
                {vocab.mastery}
              </Badge>
            </div>

            <div className="mb-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-sm font-semibold text-foreground leading-tight">{vocab.word}</h3>
                <Volume2 className="w-3 h-3 text-muted-foreground active:text-primary transition-colors cursor-pointer flex-shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground leading-tight">{vocab.translation}</p>
            </div>

            <div className="flex items-center justify-between text-[9px] text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <RotateCcw className="w-2.5 h-2.5" />
                {vocab.practiced}x
              </span>
              <span className="text-primary font-medium">Review</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
