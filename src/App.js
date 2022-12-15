import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {fetchUserProfile, UserName} from './UserProfile';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      try {
        setUser(await fetchUserProfile());
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
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
          <UserName userProfile={user}></UserName>
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

function Home() {
  const logout = () => {
    // window.history.pushState({}, undefined, '/.auth/logout');
    window.location = '.auth/logout'
  }

  return (
    <>
      <div><a onClick={logout}>Logout</a></div>
      <ApiMessage></ApiMessage>
    </>
  )
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

export default App;
