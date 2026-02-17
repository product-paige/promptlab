import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Bookmark, 
  MessageSquare, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Calendar,
  Copy,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import moment from 'moment';

export default function PromptDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const promptId = urlParams.get('id');
  const queryClient = useQueryClient();
  const [promptText, setPromptText] = useState('');

  const { data: prompt, isLoading } = useQuery({
    queryKey: ['prompt', promptId],
    queryFn: async () => {
      const prompts = await base44.entities.Prompt.list();
      const found = prompts.find(p => p.id === promptId);
      if (found) {
        setPromptText(found.prompt_text || '');
      }
      return found;
    },
    enabled: !!promptId,
  });

  const { data: savedPrompts = [] } = useQuery({
    queryKey: ['savedPrompts'],
    queryFn: () => base44.entities.SavedPrompt.list(),
    initialData: [],
  });

  const isSaved = savedPrompts.some(sp => sp.prompt_id === promptId);
  const savedPromptRecord = savedPrompts.find(sp => sp.prompt_id === promptId);

  const saveMutation = useMutation({
    mutationFn: () => base44.entities.SavedPrompt.create({ prompt_id: promptId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedPrompts'] }),
  });

  const unsaveMutation = useMutation({
    mutationFn: () => base44.entities.SavedPrompt.delete(savedPromptRecord.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedPrompts'] }),
  });

  const handleBookmark = () => {
    if (isSaved) {
      unsaveMutation.mutate();
    } else {
      saveMutation.mutate();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promptText);
    toast.success('Copied to clipboard!');
  };

  const resetPrompt = () => {
    setPromptText(prompt?.prompt_text || '');
    toast.success('Prompt reset!');
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Prompt not found</p>
        <Link to={createPageUrl('Prompts')}>
          <Button variant="outline">Back to Prompts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to={createPageUrl('Prompts')} className="hover:text-gray-900 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-50 rounded-lg">
          <div className="w-4 h-4 bg-pink-200 rounded" />
          <span className="font-medium text-gray-700">{prompt.title}</span>
        </div>
        <span>Posted {moment(prompt.created_date).format('MMM D, YYYY')}</span>
        
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1 text-gray-500">
            <CheckCircle className="w-4 h-4" />
            Mark as tried
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{prompt.title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBookmark}
            className="rounded-lg"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-gray-900' : ''}`} />
          </Button>
          <Button variant="outline" className="rounded-lg gap-2">
            Give feedback
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-500 mb-2">Categories</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-full px-3 py-1 bg-white">
            {prompt.category || 'UX/UI'}
          </Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1 bg-white">
            Wireframing
          </Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1 bg-white">
            Tailwind CSS
          </Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1 bg-white">
            Typography
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
          
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 mb-2">Description</p>
            <p className="text-gray-700 leading-relaxed">
              {prompt.details || prompt.description || 'Join Atlassian and be part of a team that\'s redefining the way the world works! At Atlassian, we are passionate about innovation and collaboration, and we\'re constantly pushing boundaries to deliver exceptional solutions that empower teams to achieve more.'}
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500 mb-2">AI Tools</p>
            <div className="flex flex-wrap gap-2">
              {(prompt.ai_tools || ['ChatGPT', 'Shopify AI']).map((tool, i) => (
                <Badge key={i} variant="outline" className="rounded-full px-3 py-1 bg-white">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Rate</p>
            <p className="text-gray-900 font-medium">$90-120/hr</p>
          </div>
        </div>

        {/* Prompt Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Prompt</h2>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-4 min-h-[160px]">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full h-full min-h-[140px] bg-transparent resize-none text-gray-700 text-sm leading-relaxed focus:outline-none"
              placeholder="Enter your prompt..."
            />
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={copyToClipboard}
              className="flex-1 bg-gray-900 hover:bg-gray-800 rounded-lg gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy to clipboard
            </Button>
            <Button 
              variant="outline"
              onClick={resetPrompt}
              className="flex-1 rounded-lg gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Description Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {prompt.description || 'This prompt helps you create compelling product descriptions for your Shopify store.'}
          </p>
        </div>

        {/* Tutorials Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tutorials</h2>
          <ul className="space-y-3">
            {(prompt.tutorials || [
              'Innovative Work: Join projects that define the future of collaboration and productivity.',
              'Professional Growth: Access learning opportunities, mentorship programs, and clear career progression paths.'
            ]).map((tutorial, i) => (
              <li key={i} className="flex gap-2 text-gray-600 text-sm">
                <span className="text-gray-400">•</span>
                <span><strong>{tutorial.split(':')[0]}:</strong>{tutorial.split(':')[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}