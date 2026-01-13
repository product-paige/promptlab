import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PromptCard from '../components/prompts/PromptCard';
import EmptyState from '../components/prompts/EmptyState';

export default function SavedPrompts() {
  const [sortBy, setSortBy] = React.useState('newest');

  const { data: savedPrompts = [], isLoading: loadingSaved } = useQuery({
    queryKey: ['savedPrompts'],
    queryFn: () => base44.entities.SavedPrompt.list('-created_date'),
    initialData: [],
  });

  const { data: allPrompts = [], isLoading: loadingPrompts } = useQuery({
    queryKey: ['prompts'],
    queryFn: () => base44.entities.Prompt.list(),
    initialData: [],
  });

  const isLoading = loadingSaved || loadingPrompts;

  const savedPromptIds = savedPrompts.reduce((acc, sp) => {
    acc[sp.prompt_id] = sp.id;
    return acc;
  }, {});

  const savedPromptsWithData = savedPrompts
    .map(sp => {
      const prompt = allPrompts.find(p => p.id === sp.prompt_id);
      return prompt ? { ...prompt, savedId: sp.id, savedDate: sp.created_date } : null;
    })
    .filter(Boolean);

  const sortedPrompts = [...savedPromptsWithData].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.savedDate) - new Date(a.savedDate);
    }
    return new Date(a.savedDate) - new Date(b.savedDate);
  });

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Saved Prompts</h1>
        {savedPromptsWithData.length > 0 && (
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-auto border-0 shadow-none">
              <span className="text-sm text-gray-500">Sort by: {sortBy === 'newest' ? 'Newest' : 'Oldest'}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-36 bg-gray-100" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPrompts.map((prompt) => (
            <PromptCard 
              key={prompt.id} 
              prompt={prompt}
              isSaved={true}
              savedPromptId={savedPromptIds[prompt.id]}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="Saved Prompts will appear here"
          description="Save Prompts to see them appear here"
          buttonText="Browse Prompts"
          buttonLink="Prompts"
        />
      )}
    </div>
  );
}