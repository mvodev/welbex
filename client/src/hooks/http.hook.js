import { useState } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const request = async (url, method = 'GET', body, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      if (!response.ok) {
        setErrorMessage(JSON.stringify(response));
        setError(true);
        return;
      }
      setLoading(false);
      const data = await response.json();
      return data;
    } catch (e) {
      setLoading(false);
      setError(true);
      setErrorMessage(e);
    }
  };

  const clearError = () => setError(false);

  return {
    loading,
    request,
    error,
    clearError,
    errorMessage,
  };
};

export default useHttp;
