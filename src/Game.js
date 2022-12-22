import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

export function GameList() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      if (!isLoading) return;
      setGames(await fetchGames());
      setIsLoading(false);
    })();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Games</h1>
      <div><Link to={'/games/new'}>New Game</Link></div>
      <div>
        <ul>{games}</ul>
      </div>
    </div>
  )
}

export function GameNew() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({target}) => {
    const {name, value} = target;
    const newData = Object.assign({}, data, {[name]: value});
    setData(newData);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    (async () => {
      console.log('save games');
      // result = await saveGame(data);
      // history.state.push('api/games/' + result._id);
    })();
  }

  return (
    <div>
      <h1>New Game</h1>
      <div>
        <label>Name</label>
        <input type="text"
               name="name"
               onChange={handleChange}
               value={data.name}
               disabled={isLoading} />
      </div>
      <div>
        <button onClick={handleSubmit} disabled={isLoading}>Save</button>
      </div>
    </div>
  )
}

export function GameView() {
  return (
    <div>
      <h1>[Game Description]</h1>
    </div>
  )
}

const apiGames = 'api/games';

async function fetchGames() {
  try {
    const response = await fetch(apiGames);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw (e);
  }
}
