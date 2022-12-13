import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {User} from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export function AppContainer() {
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isLoading) return;

    (async () => {
      try {
        const response = await fetch('/.auth/me')
        const json = await response.json();
        console.log(json);
        if (json.clientPrincipal != null) {
          setUser(new User(json.clientPrincipal.userDetails, json.clientPrincipal.userId));
          setAuthenticated(true);
        } else {
          setUser(null);
          setAuthenticated(false);
        }
      } catch (e) {
        console.log(e);
        setAuthenticated(false);
      }
      setLoading(false);
    })();
  }, []);

  const body = () => {
    if (isLoading) {
      return <div>Application is loading...</div>
    } else if (!isAuthenticated) {
      return <div>Please log in...</div>
    } else {
      return <App user={user}></App>
    }
  };

  return body();
}
