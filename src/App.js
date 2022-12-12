import './App.css';
import {useEffect, useState} from 'react';

// const apiHost = window.location.hostname === 'localhost' ? 'http://localhost:7071' : '';
const apiHost = '';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Vaesen RPG
      </header>
      <ApiMessage></ApiMessage>
      <UserInfo></UserInfo>
    </div>
  );
}

function ApiMessage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      try {
        const data = await fetch(`${apiHost}/api/message`);
        const json = await data.json();
        setData(json.message);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return <div>Message: {data}</div>
}

function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${apiHost}/.auth/me`)
        const json = await response.json();
        console.log(json);
        setUser(json.clientPrincipal.userDetails);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return <div>User: {user}</div>
}

export default App;
