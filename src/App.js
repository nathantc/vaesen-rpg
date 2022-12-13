import './App.css';
import {useEffect, useState} from 'react';

const apiPath = '';// window.location.hostname === 'localhost' ? 'http://localhost:7071/' : '';

export class User {
  constructor(userId, username) {
    this.userId = userId;
    this.username = username;
  }
}

function App(props) {
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

export function ApiMessage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      try {
        const data = await fetch(`${apiPath}api/message`);
        const json = await data.json();
        setData(json.text);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return <div>Message: {data}</div>
}

export function UserInfo() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(new User('', ''));

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      try {
        const data = await fetch('.auth/me');
        const json = await data.json();
        console.log(json);
        setData(json.clientPrincipal);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading User Policy....</div>
  }

  return (
    <div>
      <div>User ID: {data.userId}</div>
      <div>Username: {data.userDetails}</div>
    </div>
  )
}

//
// UserInfo.propTypes = {
//   user: PropTypes.instanceOf(User)
// }

export default App;
