import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import axios from 'axios'
import './App.css';
import io from 'socket.io-client'
import Start from './Components/Start/Start';
import NewGameForm from './Components/NewGameForm/NewGameForm';
const socket = io('http://localhost:3111')
  
socket.once('connect', () => {
  console.log('connected')
})


const App = () => {
  const [state, setState] = useState([])

  return (
    <div className="App">
      <Start />
    </div>
  );
}

export default App;
