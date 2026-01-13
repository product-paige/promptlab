import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { User, Mail, Calendar, Bookmark, FileText, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import moment from 'moment';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ full_name: '' });

  const { data: user, isLoading: loadingUser, refetch: refetchUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: savedPrompts = [] } = useQuery({
    queryKey: ['savedPrompts'],
    queryFn: () => base44.entities.SavedPrompt.list(),
    initialData: [],
  });

  const { data: prompts = [] } = useQuery({
    queryKey: ['prompts'],
    queryFn: () => base44.entities.Prompt.list(),
    initialData: [],
  });

  useEffect(() => {
    if (user) {
      setFormData({ full_name: user.full_name || '' });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await base44.auth.updateMe({ full_name: formData.full_name });
      await refetchUser();
      setIsEditing(false);
      toast.success('Profile updated!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  if (loadingUser) {
    return (
      <div className="max-w-2xl mx-auto animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          
          {isEditing ? (
            <div className="w-full max-w-xs space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 rounded-lg"
                >
                  Save
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.full_name || 'User'}
              </h2>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="mt-3 text-gray-500"
              >
                <Settings className="w-4 h-4 mr-1" />
                Edit Profile
              </Button>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-1">
              <Bookmark className="w-4 h-4" />
              <span className="text-sm">Saved Prompts</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{savedPrompts.length}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Member Since</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {user?.created_date ? moment(user.created_date).format('MMM YYYY') : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Account</h3>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="w-full rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}