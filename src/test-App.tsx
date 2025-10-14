import { useEffect, useState } from 'react';
import cityrayLogo from '/images/app_icon_cityray.jpg';
import './test-App.css';
import { useCounter } from '@cap-view/hooks';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    count,
    loading: useCountLoading,
    updateHandler,
    refreshHandler
  } = useCounter('/api/v1');

  // Combined loading state
  const isLoading = loading || useCountLoading;

  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true);
      try {
        setError(null);
        await refreshHandler();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchCount();
  }, []);
  
  const handleUpdate = async (increment: number) => {
    setLoading(true);
    try {
      setError(null);
      await updateHandler(increment);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  console.log("App Rednering");

  return (
    <>
      <div>
        <a href="https://apps.cityray.com" target="_blank" rel="noopener noreferrer">
          <img src={cityrayLogo} alt="Cityray logo" />
        </a>
      </div>
      <h1>Cityray App Platform</h1>
      <h2>Development Edition</h2>
      <div className="card">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div>
            <p className="error">Error: {error}</p>
            <button onClick={refreshHandler}>Retry</button>
          </div>
        ) : (
          <>
            <button onClick={() => handleUpdate(1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/test-App.tsx</code> and save to test HMR
            </p>
          </>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Cityray logos to Cityray Application Platform
      </p>
    </>
  );
}

export default App;