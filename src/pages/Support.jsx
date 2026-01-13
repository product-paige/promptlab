import React from 'react';
import { HelpCircle, MessageSquare, Mail, FileText, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

const supportOptions = [
  {
    title: 'Help Center',
    description: 'Browse our knowledge base for answers to common questions.',
    icon: FileText,
    action: 'Browse Articles',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Contact Support',
    description: 'Get in touch with our support team for personalized help.',
    icon: Mail,
    action: 'Send Email',
    color: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: 'Community Forum',
    description: 'Connect with other merchants and share tips and tricks.',
    icon: MessageSquare,
    action: 'Join Community',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600'
  }
];

const faqs = [
  {
    question: 'How do I save a prompt?',
    answer: 'Click the bookmark icon on any prompt card to save it to your collection. You can find all saved prompts in the "Saved Prompts" section.'
  },
  {
    question: 'Can I edit prompts before using them?',
    answer: 'Yes! On the prompt detail page, you can edit the prompt text directly in the text area before copying it to your clipboard.'
  },
  {
    question: 'How do I request a new prompt?',
    answer: 'Go to "Request a Prompt" from the sidebar and fill out the form with details about what you need. Our team will review and create it.'
  },
  {
    question: 'What AI tools work with these prompts?',
    answer: 'Our prompts are designed to work with various AI tools including ChatGPT, Shopify AI, Claude, and more. Check each prompt for compatible tools.'
  }
];

export default function Support() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Support</h1>
        <p className="text-gray-500">
          Need help? We're here for you. Choose from the options below or browse our FAQs.
        </p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {supportOptions.map((option, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center mb-4`}>
              <option.icon className={`w-6 h-6 ${option.iconColor}`} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{option.description}</p>
            <Button variant="outline" className="w-full rounded-lg gap-2">
              {option.action}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
              <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 mb-4">
          Still have questions? We'd love to hear from you.
        </p>
        <Button className="bg-gray-900 hover:bg-gray-800 rounded-lg">
          <Mail className="w-4 h-4 mr-2" />
          Contact Us
        </Button>
      </div>
    </div>
  );
}