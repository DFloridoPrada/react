import { sayHello, handleChange } from './events/events';
import './App.css'

import ButtonComponent from './components/ButtonComponent'
import HeaderComponent from './components/HeaderComponent'
import { useState } from 'react';

function App() {
  
  // let number = 0;´
  const [number, setNumber] = useState(0);
  // const [myValue, setMyValue] = useState('');

  let myPlaceholder = 'Write here';

  const addOne = () : void => {
    setNumber(number + 1);
    console.log(number);
  }

  return (
    <>
      <HeaderComponent />
      
      <main className='main-content'>
        <h1 onClick={sayHello}>Hello world</h1>
        <h2 onClick={addOne}>Number {number}</h2>
        <input placeholder={myPlaceholder} type="text" onChange={handleChange} />

        <br />
        <br />


        <ButtonComponent />
      </main>
    </>
  )
}

export default App
