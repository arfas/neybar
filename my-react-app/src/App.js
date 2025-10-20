const handleSubmit = async () => {
  console.log('=== SIGNUP DEBUG ===');
  console.log('Email:', email);
  console.log('ZIP:', zipCode);
  console.log('URL:', GOOGLE_SCRIPT_URL);
  console.log('URL is placeholder?', GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE'));
  
  if (GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE')) {
    alert('ERROR: Google Sheets URL not configured! Check src/App.js line 27');
    return;
  }
  
  if (email && zipCode && zipCode.length === 5) {
    const payload = {
      email: email,
      zipCode: zipCode,
      interests: selectedInterests.join(', '),
      source: 'github-pages'
    };
    
    console.log('Payload:', payload);
    console.log('Sending to:', GOOGLE_SCRIPT_URL);
    
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
      
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error: ' + error.message);
    }
  }
};
