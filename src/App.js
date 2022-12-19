import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {Profile} from './api-data';
import {fetchUserProfile} from './api-services';
import {UserProfileView, UserName} from './UserProfileView';

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

  if (user == null) {
    window.history.pushState({}, undefined, '/login');
  }

  return (
    <Router>
      <div className="App">
        <Header profile={user}></Header>
        <NavBar></NavBar>
        <Routes>
          <Route exact path='/' element={<Home user={user}/>}/>
          <Route exact path='home' element={<Home user={user}/>}/>
          <Route exact path='login' element={<Login/>}/>
          <Route exact path='profile' element={<UserProfileView profile={user}/>}/>
          <Route exact path='*' element={<div>No Path</div>}/>
        </Routes>
      </div>
    </Router>
  );
}

function Header({profile}) {
  return (
    <header className="App-header">
      <div>Welcome to Vaesen RPG</div>
      <Link to="profile">
        <UserName profile={profile}/>
      </Link>
    </header>
  )
}
Header.propTypes = {
  profile: PropTypes.instanceOf(Profile)
}

function NavBar() {
  return (
    <div className="App-navigation">
      <div><Link to="/">Home</Link></div>
      <div><Link to="characters">Characters</Link></div>
      <div><Link to="build">Character Builder</Link></div>
      <div><Link to="profile">Profile</Link></div>
    </div>
  )
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
