import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {Profile} from './api-data';
import {fetchUserProfile, ApiMessage} from './api-services';
import {UserProfileView, UserName} from './UserProfileView';
import {CharacterList} from './CharacterList';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      await onProfileUpdate();
      setIsLoading(false);
    })();
  }, []);

  const onProfileUpdate = () => {
    (async () => {
      try {
        setUser(await fetchUserProfile());
      } catch (e) {
        console.log(e);
      }
    })();
  }

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
        <div className="route-wrapper">
          <Routes>
            <Route exact path='/' element={<Home user={user}/>}/>
            <Route exact path='home' element={<Home user={user}/>}/>
            <Route exact path='characters' element={<CharacterList/>}/>
            <Route exact path='login' element={<Login/>}/>
            <Route exact path='profile' element={<UserProfileView profile={user} onProfileUpdate={onProfileUpdate}/>}/>
            <Route exact path='*' element={<div>No Path</div>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Header({profile}) {
  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div>Welcome to Vaesen RPG</div>
        <Link to="profile">
          <UserName profile={profile}/>
        </Link>
      </div>
    </div>
  )
}
Header.propTypes = {
  profile: PropTypes.instanceOf(Profile)
}

function NavBar() {
  return (
    <div className="nav-wrapper">
      <div className="nav-content">
        <div><Link to="/">Home</Link></div>
        <div><Link to="characters">Characters</Link></div>
        <div><Link to="build">Character Builder</Link></div>
      </div>
    </div>
  )
}

function Login() {
  return (
    <div>
      Choose login method:
      <a onClick={() => {
        window.location = '/.azure/login/github'
      }}>Github</a>
    </div>
  )
}

function Home() {
  const logout = () => {
    // window.history.pushState({}, undefined, '/.azure/logout');
    window.location = '.azure/logout'
  }

  return (
    <>
      <div><a onClick={logout}>Logout</a></div>
      <ApiMessage></ApiMessage>
    </>
  )
}

export default App;
