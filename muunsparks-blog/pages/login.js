import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState(null); // State for session ID
  const router = useRouter();

  // Retrieve session ID from localStorage on the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSessionId = localStorage.getItem('sessionId');
      setSessionId(storedSessionId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError('');
    console.log('Session ID:', sessionId); // Log session ID for debugging

    try {
      const response = await fetch('http://localhost:8800/logAtt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uName: username, pwd: password, sId: sessionId }),
      });

      const result = await response.json();
      console.log(result.auth)
      if (response.ok && result.auth) {
        // Store session ID in local storage
        if (typeof window !== 'undefined') {
          localStorage.setItem('sessionId', result.id);
        }
        console.log("Session ID saved:", result.id);
        // Redirect to /write page after successful login
        router.push('/write');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-black shadow-md page-content">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="username" className="block text-lg font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 mt-2 border rounded input-field"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 mt-2 border rounded input-field"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button type="submit" className="btn w-full mt-4">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}
