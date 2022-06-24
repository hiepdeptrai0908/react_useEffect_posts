
import './App.css';
import Content from './Content';
import { useState } from 'react'

function App() {

  const [ tongle, setTongle ] = useState(false)

  return (
    <div className="App">
      <button className='app-tongle' onClick={() => setTongle(!tongle)}>Tongle</button>
      {tongle && (
        <Content />
      )}
    </div>
  );
}

export default App;
