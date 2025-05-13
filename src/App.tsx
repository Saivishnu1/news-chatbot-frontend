import { useState, useEffect } from 'react';
import ChatContainer from './components/ChatContainer';

function App() {
  const [backendReady, setBackendReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true; // Track if component is mounted
    
    const checkBackend = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/ping`);
        if (!isSubscribed) return; // Don't update state if unmounted

        if (response.ok) {
          await response.json();
          setBackendReady(true);
          setError(null); // Clear any existing error
        } else {
          setBackendReady(false);
          setError('Backend service is not responding');
        }
      } catch (err) {
        if (!isSubscribed) return;
        setBackendReady(false);
        setError('Backend is taking time to wake up. Please wait...');
      }
    };

    // Initial check
    checkBackend();
    
    // Set up polling
    const interval = setInterval(checkBackend, 5000);
    
    // Cleanup function
    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {!backendReady && error && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-100 p-4 text-center text-yellow-800">
          {error}
        </div>
      )}
      {backendReady ? (
        <ChatContainer />
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-xl font-semibold text-gray-700">
              Waking up the backend service...
            </div>
            <div className="text-sm text-gray-500">
              This may take up to 30 seconds on first load
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;