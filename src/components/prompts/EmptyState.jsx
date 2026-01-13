import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Button } from "@/components/ui/button";
import { FileText, Bookmark } from 'lucide-react';

export default function EmptyState({ type = 'saved', title, description, buttonText, buttonLink }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-12 flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-32 h-32 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 relative">
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
          <Bookmark className="w-4 h-4 text-gray-300" />
        </div>
        <div className="w-20 h-14 bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-1">
          <div className="w-10 h-1 bg-gray-200 rounded" />
          <div className="w-8 h-1 bg-gray-200 rounded" />
          <div className="w-6 h-1 bg-gray-200 rounded" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title || 'Saved Prompts will appear here'}
      </h3>
      <p className="text-gray-500 mb-6 text-center max-w-sm">
        {description || 'Save Prompts to see them appear here'}
      </p>
      
      <Link to={createPageUrl(buttonLink || 'Prompts')}>
        <Button variant="outline" className="rounded-lg px-6">
          {buttonText || 'Browse Prompts'}
        </Button>
      </Link>
    </div>
  );
}