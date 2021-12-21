/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import './App.css';

import axios from "axios"

export async function envAPI(url) {
  try {
    const response = await axios({
      url: `https://myheroacademiaapi.com/api/${url}`,
      method:`GET`,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

function App() {
  const [dataDeku, setDataDeku] = useState(null);
  const [personajes, setPersonajes] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const response = async (name) => envAPI(name);
  useEffect(() => {
    async function loadapi() {
        const resp = await response("character");
        const data = resp?.data;
        setDataDeku(data);   
    }
    loadapi();
    return function cleanup() {
        loadapi();
    }
  }, []);

  useEffect(() => {
    console.log(dataDeku);
    if (dataDeku !== null) {
      setPersonajes(dataDeku.results);
      console.log(dataDeku?.results[0].images);
      console.log(personajes);
    }
  }, [dataDeku]);

  useEffect(() => {
    console.log(personajes);
  }, [personajes]);

  const valor = 5;
  
  return (
    <div className="App">
      <header className="App-header">
        
        {personajes.length !== 0 && 
          personajes.map((item, index) => {
            console.log(item)
            return (
              <div key={index}>
                <img src={item.images} className="App-logo" alt="logo" />
                <p>Nombre: {item.name}</p>
                <p>Especie: {item.species}</p>
              </div>
              
            );
          })}

      </header>
    </div>
  );
}

export default App;