import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

function DemoProfileScene() {
  const [activeProfile, setActiveProfile] = useState(0);
  const profiles = [
    { name: 'Verified', emoji: '👤', color: 'blue' },
    { name: 'Parent', emoji: '👶', color: 'purple' },
    { name: 'Anonymous', emoji: '🔒', color: 'gray' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveProfile(prev => (prev + 1) % 3), 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Switch Profiles Instantly</h3>
        <p className="text-gray-600 mb-8">Be yourself - all versions</p>

        <div className="grid grid-cols-3 gap-4 max-w-2xl">
          {profiles.map((profile, i) => (
            <div key={i} className={`bg-white rounded-xl p-6 border-4 transition-all duration-500 ${
              activeProfile === i
                ? 'border-blue-500 shadow-2xl transform scale-110'
                : 'border-gray-200 opacity-60'
            }`}>
              <div className="text-4xl mb-3">{profile.emoji}</div>
              <div className="font-bold text-gray-900">{profile.name}</div>
              {activeProfile === i && (
                <div className="mt-3 inline-flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                  <Check className="w-3 h-3" />
                  Active
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DemoProfileScene;
