import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { BookOpen, Play, FileText, ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const resources = [
  {
    title: 'Getting Started with AI Prompts',
    description: 'Learn the basics of crafting effective AI prompts for your Shopify store.',
    icon: BookOpen,
    type: 'Guide',
    duration: '5 min read',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Product Description Masterclass',
    description: 'Create compelling product descriptions that convert visitors into customers.',
    icon: Play,
    type: 'Video',
    duration: '12 min',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Email Marketing Templates',
    description: 'Ready-to-use email templates powered by AI for your marketing campaigns.',
    icon: FileText,
    type: 'Template',
    duration: '10 templates',
    color: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: 'SEO Optimization Guide',
    description: 'Boost your store\'s visibility with AI-powered SEO strategies.',
    icon: Sparkles,
    type: 'Guide',
    duration: '8 min read',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  {
    title: 'Customer Service Automation',
    description: 'Set up AI-powered customer service responses for common inquiries.',
    icon: Play,
    type: 'Video',
    duration: '15 min',
    color: 'bg-pink-50',
    iconColor: 'text-pink-600'
  },
  {
    title: 'Social Media Content Calendar',
    description: 'Plan and create engaging social media content with AI assistance.',
    icon: FileText,
    type: 'Template',
    duration: '30-day plan',
    color: 'bg-cyan-50',
    iconColor: 'text-cyan-600'
  }
];

export default function Learn() {
  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Learn & Playbooks</h1>
        <p className="text-gray-500 max-w-2xl">
          We have curated resources to help you get better at using AI for your Shopify store. 
          From beginner guides to advanced techniques.
        </p>
      </div>

      {/* Featured Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mb-10 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-medium bg-white/10 px-3 py-1 rounded-full">
              Featured Playbook
            </span>
            <h2 className="text-2xl font-semibold mt-4 mb-2">
              Complete Guide to AI-Powered E-commerce
            </h2>
            <p className="text-gray-300 max-w-lg">
              Everything you need to know about leveraging AI to grow your Shopify store. 
              From product descriptions to customer service.
            </p>
          </div>
          <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg shrink-0">
            Start Learning
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className={`w-12 h-12 ${resource.color} rounded-xl flex items-center justify-center mb-4`}>
              <resource.icon className={`w-6 h-6 ${resource.iconColor}`} />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {resource.type}
              </span>
              <span className="text-xs text-gray-400">{resource.duration}</span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-500">
              {resource.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-gray-50 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Can't find what you're looking for?
        </h3>
        <p className="text-gray-500 mb-6">
          We're constantly adding new resources. Let us know what you'd like to learn about.
        </p>
        <Link to={createPageUrl('RequestPrompt')}>
          <Button variant="outline" className="rounded-lg">
            Request a Topic
          </Button>
        </Link>
      </div>
    </div>
  );
}