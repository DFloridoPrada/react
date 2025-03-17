import Header from "./components/Header";
import './App.css';
import {dbPromise} from './database/database.js';
import { useEffect } from "react";

function App() {

  const db = undefined;

  useEffect(async () => {
    db = await dbPromise;
  }, []);

  console.log(db.all('SELECT * FROM NOTES'));

  return (
    <div className="app-container">
      <Header />
    </div>
  );
}

export default App;