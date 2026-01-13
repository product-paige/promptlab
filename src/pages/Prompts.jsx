import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Search, Sparkles, MapPin, Clock, Calendar, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PromptCard from '../components/prompts/PromptCard';

const categories = ['All', 'Copy', 'Sections', 'Images', 'Video / UGC', 'Ads & Campaigns', 'Strategy'];
const aiTools = ['All', 'ChatGPT', 'Shopify AI', 'Claude', 'Gemini', 'Midjourney'];

export default function Prompts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAiTool, setSelectedAiTool] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ['prompts'],
    queryFn: () => base44.entities.Prompt.list('-created_date'),
    initialData: [],
  });

  const { data: savedPrompts = [] } = useQuery({
    queryKey: ['savedPrompts'],
    queryFn: () => base44.entities.SavedPrompt.list(),
    initialData: [],
  });

  const savedPromptIds = savedPrompts.reduce((acc, sp) => {
    acc[sp.prompt_id] = sp.id;
    return acc;
  }, {});

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = !searchQuery || 
      prompt.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory;
    
    const matchesAiTool = selectedAiTool === 'All' || 
      prompt.ai_tools?.includes(selectedAiTool);
    
    return matchesSearch && matchesCategory && matchesAiTool;
  });

  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_date) - new Date(a.created_date);
    }
    return new Date(a.created_date) - new Date(b.created_date);
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedAiTool('All');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedAiTool !== 'All';

  return (
    <div className="max-w-6xl">
      {/* Search & Filters */}
      <div className="mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search Shopify Prompts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200 rounded-lg h-11"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            className={`rounded-full gap-2 ${selectedCategory !== 'All' ? 'bg-gray-100' : ''}`}
          >
            <Sparkles className="w-4 h-4" />
            Category
          </Button>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-auto border-gray-200 rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedAiTool} onValueChange={setSelectedAiTool}>
            <SelectTrigger className="w-auto border-gray-200 rounded-full">
              <div className="flex items-center gap-2">
                <span>🤖</span>
                <span>AI Tool</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {aiTools.map(tool => (
                <SelectItem key={tool} value={tool}>{tool}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              onClick={clearFilters}
              className="text-gray-500 gap-1"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          )}

          <div className="ml-auto text-sm text-gray-500">
            {sortedPrompts.length} prompts found
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Search Prompts</h1>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-auto border-0 shadow-none">
            <span className="text-sm text-gray-500">Sort by: {sortBy === 'newest' ? 'Newest' : 'Oldest'}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Prompts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
              isSaved={!!savedPromptIds[prompt.id]}
              savedPromptId={savedPromptIds[prompt.id]}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No prompts found matching your criteria.</p>
          <Button variant="link" onClick={clearFilters} className="mt-2">
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}