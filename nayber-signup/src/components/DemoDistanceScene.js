import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

function DemoDistanceScene() {
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setHighlight(prev => (prev + 1) % 3), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">See Closest Neighbors First</h3>
        <div className="space-y-3">
          {[
            { user: 'Mike Rodriguez', distance: 'Same block', avatar: 'MR', content: 'Anyone free for a dog walk?', color: 'green' },
            { user: 'Emma Kim', distance: '0.1 mi away', avatar: 'EK', content: 'Coffee at the cafe?', color: 'blue' },
            { user: 'Sarah Lopez', distance: '0.3 mi away', avatar: 'SL', content: 'Garage sale Saturday!', color: 'purple' }
          ].map((post, i) => (
            <div key={i} className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              highlight === i
                ? 'border-blue-500 bg-blue-50 transform scale-105 shadow-lg'
                : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 text-sm">{post.user}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-semibold text-green-600">{post.distance}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DemoDistanceScene;
