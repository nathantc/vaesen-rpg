import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {Profile} from './api-data';
import {ApiMessage} from './api-services';
import {CharacterList} from './CharacterList';
import {CharacterNew, CharacterEdit} from './CharacterNew';
import {GameList, GameNew, GameView} from './Game';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      const response = await fetch('/.auth/me');
      const data = await response.json();
      if (data.clientPrincipal != null) {
        setProfile(new Profile(data.clientPrincipal.userDetails));
      }
      setIsLoading(false);
    })();
  }, []);

  console.log('isLoading: ', isLoading);
  console.log('profile', profile);
  if (isLoading) {
    return <div>Loading....</div>
  }

  if (profile == null) {
    console.log('login redirect=', window.location);
    return <Login></Login>;
  }

  return (
    <Router>
      <div className="App">
        <Header></Header>
        <NavBar></NavBar>
        <div className="route-wrapper">
          <Routes>
            <Route exact path='/' element={<Home user={profile}/>}/>
            <Route exact path='home' element={<Home user={profile}/>}/>
            <Route exact path='characters' element={<CharacterList/>}/>
            <Route exact path='characters/new' element={<CharacterNew/>}/>
            <Route exact path='characters/:characterId' element={<CharacterEdit/>}/>
            <Route exact path='games' element={<GameList/>}/>
            <Route exact path='games\new' element={<GameNew/>}/>
            <Route exact path='games\:gameId' element={<GameView/>}/>
            <Route exact path='login' element={<Login/>}/>
            <Route exact path='*' element={<div>No Path</div>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Header() {
  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div>Welcome to Vaesen RPG</div>
        <div>profile name</div>
        <div><a href={'/.auth/logout?post_logout_redirect_uri=' + window.location.pathname}>Logout</a></div>
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
      <a href={'/.auth/login/github?post_login_redirect_uri=' + window.location.pathname}>Github</a>
    </div>
  )
}

function Home() {
  return (
    <>
      <div>Home Page</div>
      <ApiMessage></ApiMessage>
    </>
  )
}

export default App;
