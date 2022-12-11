import './App.css';
import {useEffect, useState} from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Vaesen RPG
      </header>
      <ApiMessage></ApiMessage>
    </div>
  );
}

function ApiMessage() {
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const data = await fetch('/api/message');
      const json = await data.json();
      setData(json.message);
    })();
  }, []);

  return <span>{data}</span>
}

export default App;
