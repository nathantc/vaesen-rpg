import './App.css';
import {useEffect, useState} from 'react';

const apiHost = window.location.hostname === 'localhost' ? 'http://localhost:7071' : '';

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
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(`${apiHost}/api/message`);
        const json = await data.json();
        setData(json.message);
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
        setUser(json.message);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return <div>User: {user}</div>
}

export default App;
