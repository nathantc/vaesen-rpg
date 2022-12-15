import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import './App.css';

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
      if (user != null) return;
      try {
        const data = await fetch('.auth/me');
        const json = await data.json();
        console.log(json);
        if (json.clientPrincipal != null) {
          setUser(new User(json.clientPrincipal.userId, json.clientPrincipal.userDetails));
        } else {
          setUser(null);
        }
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
    window.history.pushState({}, undefined, '/login');
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          Welcome to Vaesen RPG
        </header>
        <Routes>
          <Route exact path='/' element={<Home user={user}/>}/>
          <Route exact path='login' element={<Login/>}/>
          <Route exact path='*' element={<div>No Path</div>}/>
        </Routes>
      </div>
    </Router>
  );
}

function Login() {
  return (
    <div>
      Choose login method:
      <a onClick={() => {
        window.location = '/.auth/login/github'
      }}>Github</a>
    </div>
  )
}

function Home({user}) {
  const logout = () => {
    // window.history.pushState({}, undefined, '/.auth/logout');
    window.location = '.auth/logout'
  }

  return (
    <>
      <div><a onClick={logout}>Logout</a></div>
      <ApiMessage></ApiMessage>
      <UserInfo user={user}></UserInfo>
    </>
  )
}

Home.propTypes = {
  user: PropTypes.instanceOf(User)
}

export function ApiMessage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      try {
        const data = await fetch('api/message');
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

export function UserInfo({user}) {
  const [user2, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    if (user2) return;
    (async () => {
      const response = await fetch('api/user');
      const data = await response.json();

      setUser(data);
    })()
  })

  if (user2 == null) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>User ID: {user2.userId}</div>
      <div>Username: {user2.username}</div>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.instanceOf(User)
}

export default App;
