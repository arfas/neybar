import React, { useState, useEffect } from 'react';
import { Zap, MapPin, UserPlus } from 'lucide-react';

function DemoMatchingScene() {
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotif(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Smart Interest Matching</h3>

        <div className={`bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 shadow-2xl text-white transform transition-all duration-700 ${
          showNotif ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-lg">New Neighbor Alert!</div>
              <div className="text-white/80 text-sm">Someone joined your block</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 text-gray-900">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                CT
              </div>
              <div className="flex-1">
                <div className="font-bold mb-1">Carlos Torres</div>
                <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>Same block • Joined today</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">🐕 Dogs</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">🍳 Cooking</span>
                </div>
                <div className="text-xs text-gray-700 bg-blue-50 border border-blue-200 rounded p-2">
                  <strong>2 shared interests:</strong> Dogs, Cooking
                </div>
              </div>
            </div>
            <button className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 text-sm">
              <UserPlus className="w-4 h-4" />
              Connect Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoMatchingScene;
