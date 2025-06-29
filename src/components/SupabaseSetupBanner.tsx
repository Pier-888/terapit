import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import Card from './Card';
import Button from './Button';

const SupabaseSetupBanner: React.FC = () => {
  if (isSupabaseConfigured) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <span className="font-medium">
            🚨 Supabase non configurato - App in modalità DEMO
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm">
            Clicca "Connect to Supabase" in alto a destra →
          </span>
          <Button
            variant="outline"
            size="sm"
            className="border-white text-white hover:bg-white hover:text-red-500"
            onClick={() => {
              // Scroll to top per vedere il pulsante Connect
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Configura Ora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupabaseSetupBanner;