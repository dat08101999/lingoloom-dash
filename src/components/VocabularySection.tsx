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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Your Vocabulary</h2>
          <p className="text-muted-foreground">{vocabulary.length} words mastered</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm bg-primary/10 border-primary/20 text-primary">
          <Star className="w-4 h-4 mr-2 fill-primary" />
          {vocabulary.filter(v => v.mastery === "advanced").length} Advanced
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vocabulary.map((vocab, index) => (
          <Card 
            key={index}
            className="p-4 border-none shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <Badge variant="outline" className="text-xs">
                {vocab.category}
              </Badge>
              <Badge variant="outline" className={`text-xs ${masteryColors[vocab.mastery]}`}>
                {vocab.mastery}
              </Badge>
            </div>

            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground">{vocab.word}</h3>
                <Volume2 className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              </div>
              <p className="text-muted-foreground">{vocab.translation}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3" />
                Practiced {vocab.practiced}x
              </span>
              <span className="text-primary font-medium">Review →</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
