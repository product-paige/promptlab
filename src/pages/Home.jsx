import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Search, BookOpen, ArrowUpRight } from 'lucide-react';
import PromptCard from '../components/prompts/PromptCard';

export default function Home() {
  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ['prompts'],
    queryFn: () => base44.entities.Prompt.list('-created_date', 6),
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

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Welcome to the<br />Shopify Prompt<br />Library
          </h1>
          <p className="text-gray-500">
            We stay true to our word. Your next role is here.<br />
            Don't hold the ball, get it rolling.
          </p>
        </div>
        
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            to={createPageUrl('Prompts')}
            className="bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
            style={{ border: '1px solid #CACED3' }}
          >
            <div className="w-16 h-16 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Search for Prompts</h3>
            <p className="text-gray-500 text-sm mb-4">
              Start searching for the perfect prompt to transform your store.
            </p>
            <span className="flex items-center gap-1 text-sm font-medium text-gray-900 group-hover:gap-2 transition-all">
              Search Prompts
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
          
          <Link 
            to={createPageUrl('Learn')}
            className="bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
            style={{ border: '1px solid #CACED3' }}
          >
            <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-stone-600" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How to use</h3>
            <p className="text-gray-500 text-sm mb-4">
              We have curated resources to help you get better at using AI.
            </p>
            <span className="flex items-center gap-1 text-sm font-medium text-gray-900 group-hover:gap-2 transition-all">
              See Playbooks
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#CACED3] my-12" />

      {/* Latest Prompts Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Latest Prompts</h2>
          <Link 
            to={createPageUrl('Prompts')}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            See all prompts
          </Link>
        </div>
        
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
        ) : prompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt}
                isSaved={!!savedPromptIds[prompt.id]}
                savedPromptId={savedPromptIds[prompt.id]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No prompts yet. Check back soon!
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#CACED3] my-12" />

      {/* Saved Prompts Section */}
      {savedPrompts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Saved Prompts</h2>
            <Link 
              to={createPageUrl('SavedPrompts')}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPrompts.slice(0, 3).map((savedPrompt) => {
              const prompt = prompts.find(p => p.id === savedPrompt.prompt_id);
              return prompt ? (
                <PromptCard 
                  key={prompt.id} 
                  prompt={prompt}
                  isSaved={true}
                  savedPromptId={savedPrompt.id}
                />
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}