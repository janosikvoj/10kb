// app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/login', {
        // Call the new login API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Or 'application/json' if sending JSON
        },
        body: new URLSearchParams({
          //  Encode form data for x-www-form-urlencoded
          username: username,
          password: password,
        }).toString(),
      });

      if (response.ok) {
        // Login API route set the cookie on success
        router.push('/admin'); // Redirect to /admin page after successful API login
      } else if (response.status === 401) {
        setLoginError('Invalid username or password.');
      } else {
        setLoginError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setLoginError('Login failed. Please try again.');
    }
  };

  return (
    <div className="h-screen flex items-center">
      <h1>Admin Login</h1>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
