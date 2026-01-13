import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Bookmark, Tag, ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const gradientImages = [
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=200&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=200&fit=crop',
];

const pastelGradients = [
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ee9ca7 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
];

export default function PromptCard({ prompt, isSaved, savedPromptId }) {
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: () => base44.entities.SavedPrompt.create({ prompt_id: prompt.id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedPrompts'] }),
  });

  const unsaveMutation = useMutation({
    mutationFn: () => base44.entities.SavedPrompt.delete(savedPromptId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedPrompts'] }),
  });

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      unsaveMutation.mutate();
    } else {
      saveMutation.mutate();
    }
  };

  const getRandomGradient = () => {
    const index = prompt.id ? prompt.id.charCodeAt(0) % pastelGradients.length : 0;
    return pastelGradients[index];
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group" style={{ border: '1px solid #CACED3' }}>
      <div 
        className="h-36 relative"
        style={{ 
          background: prompt.image_url ? `url(${prompt.image_url}) center/cover` : getRandomGradient()
        }}
      >
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
        >
          <Bookmark 
            className={`w-4 h-4 ${isSaved ? 'fill-gray-900 text-gray-900' : 'text-gray-500'}`} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{prompt.title}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-1">{prompt.description || prompt.title}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Tag className="w-3 h-3" />
            <span>{prompt.category || 'Category tag'}</span>
          </div>
          <Link 
            to={createPageUrl(`PromptDetail?id=${prompt.id}`)}
            className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            View Prompt
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}