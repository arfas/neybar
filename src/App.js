import React, { useState, useEffect } from 'react';
import { MapPin, Shield, Users, Zap, Check, Mail, ArrowRight, TrendingUp, Eye, Play, Pause, RotateCcw, UserPlus, X } from 'lucide-react';

const NayberSignupPage = () => {
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [signups, setSignups] = useState(247);
  const [clicks, setClicks] = useState(1543);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const GOOGLE_SCRIPT_URL = 'YOUR_DEPLOYED_SCRIPT_URL_HERE'; // <-- Update with your deployed URL

  const interests = ['Dogs', 'Parenting', 'Local Jobs', 'Safety', 'Gardening', 'Food', 'Sports', 'Events'];

  // Fetch signup count on load
  useEffect(() => {
    const fetchSignupCount = async () => {
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?count=true`);
        const data = await response.json();
        if (data.count) setSignups(data.count);
      } catch {
        console.log('Using default signup count');
      }
    };
    fetchSignupCount();
  }, []);

  // Handle form submit
  const handleSubmit = async () => {
    setErrorMessage('');
    if (!email || zipCode.length !== 5) {
      setErrorMessage('Please enter a valid email and 5-digit ZIP code.');
      return;
    }

    const payload = {
      email,
      zipCode,
      interests: selectedInterests.join(', '),
      source: 'github-pages'
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.result === 'success') {
        setShowSuccess(true);
        setSignups(prev => prev + 1);
        setTimeout(() => {
          setEmail('');
          setZipCode('');
          setSelectedInterests([]);
          setShowSuccess(false);
        }, 3000);
      } else {
        setErrorMessage(data.message || 'Submission failed.');
      }
    } catch (err) {
      setErrorMessage('Error connecting to server. Try again later.');
      console.error(err);
    }
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-3xl font-bold mb-4">Join the Nayber Waitlist</h2>
      {showSuccess ? (
        <div className="bg-green-100 p-6 rounded-xl text-center">
          <Check className="w-10 h-10 text-green-700 mx-auto mb-2" />
          <p className="font-semibold text-green-700">You are on the list!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
          />
          <input
            type="text"
            value={zipCode}
            onChange={e => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="ZIP Code"
            className="w-full border p-3 rounded-xl"
          />
          <div className="flex flex-wrap gap-2">
            {interests.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-lg text-sm ${selectedInterests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {interest}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold"
          >
            Get Early Access
          </button>
        </div>
      )}
      <div className="mt-4 text-gray-500">{signups} people signed up</div>
    </div>
  );
};

export default NayberSignupPage;
