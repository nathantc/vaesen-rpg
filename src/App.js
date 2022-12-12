import './App.css';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

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
      <UserInfo user={props.user}></UserInfo>
      <ApiMessage></ApiMessage>
    </div>
  );
}

App.propTypes = {
  user: PropTypes.instanceOf(User)
}

function ApiMessage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      try {
        const data = await fetch('/api/message');
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

function UserInfo(props) {
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
