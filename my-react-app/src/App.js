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

    {/* THIS IS THE IMPORTANT BUTTON */}
    <button
      onClick={handleSubmit}  {/* ← THIS MUST BE HERE */}
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
