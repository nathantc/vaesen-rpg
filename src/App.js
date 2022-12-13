import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import './App.css';

const apiPath = '';// window.location.hostname === 'localhost' ? 'http://localhost:7071/' : '';

export class User {
  constructor(userId, username) {
    this.userId = userId;
    this.username = username;
  }
}

function App(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      try {
        const data = await fetch('.auth/me');
        const json = await data.json();
        console.log(json);
        setUser(new User(json.clientPrincipal.userId, json.clientPrincipal.userDetails));
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading....</div>
  }

  if (!user) {
    window.location = '/.auth/login/github';
    return <div></div>
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          Welcome to Vaesen RPG
        </header>
        <ApiMessage></ApiMessage>
        <UserInfo user={ user }></UserInfo>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <div>Welcome to Vaesen...</div>
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

export function UserInfo({ user }) {
  return (
    <div>
      <div>User ID: {user.userId}</div>
      <div>Username: {user.username}</div>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.instanceOf(User)
}

export default App;
