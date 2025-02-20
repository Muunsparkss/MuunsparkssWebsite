import { useState, useEffect } from 'react';
import Loading from '../components/Loading'; // Import the loading component
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start the fade-out transition before hiding the loader
    const timer = setTimeout(() => setFadeOut(true), 1000); // Start fade-out 200ms before hiding
    const hideTimer = setTimeout(() => setLoading(false), 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {loading && (
        <Loading
          className={`transition-opacity duration-200 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
