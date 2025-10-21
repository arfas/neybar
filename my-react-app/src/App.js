import React, { useState, useEffect } from 'react';
import { MapPin, Shield, Users, Zap, Check, X, Mail, ArrowRight, TrendingUp, Eye, Play, Pause, RotateCcw, UserPlus, Heart, MessageCircle, ChevronDown, Bell, Clock } from 'lucide-react';

const NayberSignupPage = () => {
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [signups, setSignups] = useState(247);
  const [clicks, setClicks] = useState(1543);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [demoScene, setDemoScene] = useState(0);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  // ✅ YOUR GOOGLE SHEETS API URL - CONFIGURED AND READY
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxkvoxKJbadUdK8LDd9jwJdSj7o2Dn1r-IBVjs9ANgOVhgV8BO_5citTdOpU2S_qIX/exec';

  const demoScenes = [
    { title: "Distance-First", component: DemoDistanceScene },
    { title: "Multiple Profiles", component: DemoProfileScene },
    { title: "Smart Matching", component: DemoMatchingScene }
  ];

  const interests = ['Dogs', 'Parenting', 'Local Jobs', 'Safety', 'Gardening', 'Food', 'Sports', 'Events'];

  // Fetch real signup count from Google Sheets on load
  useEffect(() => {
    const fetchSignupCount = async () => {
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?count=true`);
        const data = await response.json();
        if (data.count) {
          setSignups(data.count);
        }
      } catch (error) {
        console.log('Using default signup count');
      }
    };
    
    fetchSignupCount();
  }, []);

  useEffect(() => {
    if (isDemoPlaying && demoScene < demoScenes.length - 1) {
      const timer = setTimeout(() => {
        setDemoScene(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (isDemoPlaying && demoScene === demoScenes.length - 1) {
      setIsDemoPlaying(false);
    }
  }, [isDemoPlaying, demoScene]);

  const handleSubmit = async () => {
    console.log('=== SIGNUP DEBUG ===');
    console.log('Email:', email);
    console.log('ZIP:', zipCode);
    console.log('URL:', GOOGLE_SCRIPT_URL);
    
    if (email && zipCode && zipCode.length === 5) {
      const payload = {
        email: email,
        zipCode: zipCode,
        interests: selectedInterests.join(', '),
        source: 'github-pages'
      };
      
      console.log('Payload:', payload);
      console.log('Sending to Google Sheets...');
      
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        console.log('✅ Request sent! Check Google Sheets in 5-10 seconds');
        setShowSuccess(true);
        setSignups(prev => prev + 1);
        
        setTimeout(() => {
          setEmail('');
          setZipCode('');
          setSelectedInterests([]);
          setShowSuccess(false);
        }, 3000);
        
      } catch (error) {
        console.error('❌ Error:', error);
        alert('Signup failed: ' + error.message);
      }
    } else {
      console.log('⚠️ Validation failed - Email or ZIP missing');
      alert('Please enter a valid email and 5-digit ZIP code');
    }
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const scrollToSignup = (source) => {
    setClicks(prev => prev + 1);
    console.log('CTA Click from:', source);
    const el = document.getElementById('signup-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">{signups} Early Signups</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="font-semibold">{clicks} Interested</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-20 h-20 md:w-28 md:h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-500 rounded-3xl rotate-6"></div>
            <div className="absolute inset-0 bg-purple-500 rounded-3xl -rotate-6"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl w-full h-full flex items-center justify-center">
              <MapPin className="w-10 h-10 md:w-14 md:h-14 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Real</span> Neighbors
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-3">
            Not 5 miles away. Right on your block.
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Multiple identities. Hyperlocal jobs. Interest-based matching. Finally, a neighborhood app that gets it right.
          </p>
          
          <button 
            onClick={() => scrollToSignup('hero')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition text-lg shadow-lg"
          >
            Get Early Access
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Coming Soon</span>
            </div>
            <span className="hidden sm:inline">-</span>
            <span>100% Free</span>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              See Nayber in Action
            </h2>
            <p className="text-xl text-gray-600">
              Watch how it works in under 30 seconds
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 shadow-2xl">
            <div className="aspect-video bg-white rounded-xl overflow-hidden relative">
              {!showDemo ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                  <button
                    onClick={() => {
                      setShowDemo(true);
                      setIsDemoPlaying(true);
                      setDemoScene(0);
                    }}
                    className="group"
                  >
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition">
                      <Play className="w-12 h-12 text-blue-600 ml-2" />
                    </div>
                    <div className="mt-4 text-white font-semibold text-lg">Watch Demo</div>
                  </button>
                </div>
              ) : (
                <>
                  {React.createElement(demoScenes[demoScene].component)}
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur rounded-full px-6 py-3 flex items-center gap-4">
                    <button 
                      onClick={() => {
                        setDemoScene(0);
                        setIsDemoPlaying(true);
                      }}
                      className="text-white hover:text-blue-400 transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setIsDemoPlaying(!isDemoPlaying)}
                      className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition"
                    >
                      {isDemoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <div className="flex gap-2">
                      {demoScenes.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setDemoScene(i); setIsDemoPlaying(false); }}
                          className={`h-2 rounded-full transition ${i === demoScene ? 'bg-blue-500 w-8' : 'bg-gray-400 w-2'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur rounded-full px-4 py-2 text-white text-sm font-medium">
                    {demoScenes[demoScene].title}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Tired of neighborhood apps that miss the mark?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Too Broad', desc: 'See posts from 5 miles away? That is not your neighborhood.' },
              { title: 'One Identity', desc: 'Cannot separate your parent life from professional networking.' },
              { title: 'No Matching', desc: 'New neighbors join but you never know if you share interests.' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border-2 border-red-200">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
            Introducing Nayber
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            The hyperlocal social network built for real neighborhoods
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Same Block First</h3>
              <p className="text-gray-700 mb-4">
                See posts from people on your actual block, then nearby streets. Distance shown on every post.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <MapPin className="w-4 h-4" />
                  <span>Mike Rodriguez - Same block</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Multiple Profiles</h3>
              <p className="text-gray-700 mb-4">
                Be yourself - all versions. Switch between Verified, Parent, Professional, or Anonymous profiles instantly.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['Verified', 'Parent', 'Anonymous'].map((profile, i) => (
                  <div key={i} className="bg-white rounded-lg px-3 py-2 text-xs font-medium text-gray-700">
                    {profile}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Matching</h3>
              <p className="text-gray-700 mb-4">
                Get notified when someone with shared interests joins your block. Connect with people you will actually vibe with.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <div className="text-green-600 font-medium">New neighbor alert!</div>
                <div className="text-gray-600 text-xs mt-1">Emma shares: Dogs, Coffee</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200">
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Local Job Board</h3>
              <p className="text-gray-700 mb-4">
                Hire your neighbor to walk your dog, fix your fence, or babysit. All vetted, all hyperlocal.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <div className="font-medium text-gray-900">Part-time Dog Walker</div>
                <div className="text-gray-600 text-xs">$20/hr - Same block</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div id="signup-section" className="bg-gradient-to-br from-blue-500 to-purple-600 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
              Join the Waitlist
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Be among the first to experience Nayber in your neighborhood
            </p>

            {showSuccess ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You are on the list!</h3>
                <p className="text-gray-600">We will email you when Nayber launches in your area.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="12345"
                      maxLength={5}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Interests (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          selectedInterests.includes(interest)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!email || zipCode.length !== 5}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get Early Access
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We will never spam you. Unsubscribe anytime.
                </p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{signups}</div>
                  <div>Early signups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">🚀</div>
                  <div>Coming Soon</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div>Free forever</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why people are excited
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', location: 'Seattle, WA', quote: 'Finally! An app that shows me who is actually on my block, not 5 miles away.' },
              { name: 'David L.', location: 'Austin, TX', quote: 'Love the multiple profile idea. I can be a parent in one group and professional in another.' },
              { name: 'Jennifer K.', location: 'Portland, OR', quote: 'The smart matching is genius. Found 3 dog owners on my street in the first week!' }
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
                <p className="text-gray-700 mb-4 italic">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to meet your real neighbors?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join {signups}+ people waiting for launch
          </p>
          <button 
            onClick={() => scrollToSignup('footer')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition text-lg shadow-lg"
          >
            Get Early Access
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl font-bold mb-2">Nayber</div>
          <p className="text-gray-400 text-sm">Your neighborhood, your way.</p>
          <div className="mt-4 text-xs text-gray-500">
            2025 Nayber. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Scene Components
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
            { user: 'Mike Rodriguez', distance: 'Same block', avatar: 'MR', content: 'Anyone free for a dog walk?' },
            { user: 'Emma Kim', distance: '0.1 mi away', avatar: 'EK', content: 'Coffee at the cafe?' },
            { user: 'Sarah Lopez', distance: '0.3 mi away', avatar: 'SL', content: 'Garage sale Saturday!' }
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

function DemoProfileScene() {
  const [activeProfile, setActiveProfile] = useState(0);
  const profiles = [
    { name: 'Verified', emoji: '👤' },
    { name: 'Parent', emoji: '👶' },
    { name: 'Anonymous', emoji: '🔒' }
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
                ? 'border-blue-500 shadow-2xl transform
