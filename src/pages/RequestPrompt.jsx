import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function RequestPrompt() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    use_case: ''
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.PromptRequest.create(data),
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Request submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit request');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    createMutation.mutate(formData);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Request Submitted!</h2>
          <p className="text-gray-500 mb-6">
            Thank you for your prompt request. Our team will review it and get back to you soon.
          </p>
          <Button 
            onClick={() => {
              setSubmitted(false);
              setFormData({ title: '', description: '', use_case: '' });
            }}
            variant="outline"
            className="rounded-lg"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Request a Prompt</h1>
        <p className="text-gray-500">
          Can't find the prompt you need? Let us know and we'll create it for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Prompt Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Product Description Generator"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe what you want the prompt to do..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="rounded-lg min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="use_case">Use Case</Label>
          <Textarea
            id="use_case"
            placeholder="How do you plan to use this prompt?"
            value={formData.use_case}
            onChange={(e) => setFormData({ ...formData, use_case: e.target.value })}
            className="rounded-lg min-h-[100px]"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gray-900 hover:bg-gray-800 rounded-lg gap-2"
          disabled={createMutation.isPending}
        >
          <Send className="w-4 h-4" />
          {createMutation.isPending ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </div>
  );
}