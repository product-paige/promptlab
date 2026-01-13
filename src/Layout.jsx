import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { 
  Home, 
  FileText, 
  Bookmark, 
  GraduationCap, 
  User, 
  Send, 
  HelpCircle,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const navItems = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'Prompts', icon: FileText, page: 'Prompts', count: prompts.length },
    { name: 'Saved Prompts', icon: Bookmark, page: 'SavedPrompts', count: savedPrompts.length },
    { name: 'Learn', icon: GraduationCap, page: 'Learn' },
    { name: 'Profile', icon: User, page: 'Profile' },
  ];

  const bottomNavItems = [
    { name: 'Request a Prompt', icon: Send, page: 'RequestPrompt' },
    { name: 'Support', icon: HelpCircle, page: 'Support' },
  ];

  const isActive = (page) => currentPageName === page;

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-[10px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap');
        body {
          font-family: 'Geist', sans-serif;
        }
        h1, h2, h3, h4, h5, h6 {
          font-weight: 500;
        }
      `}</style>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 flex items-center justify-between px-4">
        <span className="font-semibold text-lg">ProductPrompt™</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 pt-16">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.page) 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.count > 0 && (
                  <span className="text-xs text-gray-400">{item.count}</span>
                )}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-[10px] top-[10px] bottom-[10px] w-64 z-30 rounded-lg" style={{ background: '#EFEFEF' }}>
        <div className="p-6 pb-4">
          <span className="font-semibold text-lg">ProductPrompt™</span>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                isActive(item.page) 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {item.count > 0 && (
                <span className="text-xs text-gray-400">{item.count}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-4 space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
          <Button className="w-full mt-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg">
            <Zap className="w-4 h-4 mr-2" />
            Become a pro
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[284px] pt-16 lg:pt-0 bg-white rounded-lg" style={{ margin: '10px', marginRight: '10px', minHeight: 'calc(100vh - 20px)' }}>
        <div className="flex justify-end p-4 lg:p-6">
          <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: '#F7F7F7' }}>
            <span className="text-sm">Hi, 👋</span>
          </div>
        </div>
        <div className="px-4 lg:px-8 pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}