import './App.css';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const apiPath = window.location.hostname === 'localhost' ? 'http://localhost:7071/' : '';

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
        setData(json.message);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return <div>Message: {data}</div>
}

export function UserInfo(props) {
  return (
    <div>
      <div>User: {props.user.username}</div>
      <div>User: {props.user.userId}</div>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.instanceOf(User)
}

export default App;
