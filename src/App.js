import './App.css';
import axios from "axios";
import { useState } from 'react';

function Estabelecimento(props){
  return (
    <div className="place">
      <h3 className="place-title">{props.name}</h3>
      <div className = "place-content">
        {props.children}
      </div>
      <button className="btn-fav" onClick={()=> props.favoritar(props)}>Quero conhecer!</button>
    </div>
  );
}

function App() {

  const [busca, setBusca] = useState('');

  const options = {
    method: 'GET',
    url: 'https://local-business-data.p.rapidapi.com/search',
    params: {
      query: busca,
      limit: '20',
      lat: '-23.5489',
      lng: '-46.6388',
      zoom: '13',
      language: 'en',
      region: 'us'
    },
    headers: {
      'X-RapidAPI-Key': '5bbd507431msh1ae7c5441acb0e5p143b86jsn75f1097e668e',
      'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
    }
  };

  const Atualiza = (event)=>{
    setBusca(event.target.value);
  };

  const [estabelecimentos, setEstabelecimentos]= useState([]);

  const buscaEstabelecimento = (event) => {
    event.preventDefault();
    axios.request(options).then((res) => {
      setEstabelecimentos(res.data.data);
      setBusca("");
    });
    console.log(estabelecimentos);
  };

  function favoritar(estabelecimento){
    const options = {name: estabelecimento.name, adress: estabelecimento.children};
    fetch('http://localhost:8000/favoritos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    })
  };
    
  return (
    <div className="App">
      <div className="appbar">
            <img src="sp.jpg" className="logo" alt="logo sp"/>
            <h1 className="title">Procura por SP</h1>
      </div>

      <main className="container">
        <form className="form-card" onSubmit={buscaEstabelecimento}>
        <label className="form-card-label">O que deseja visitar?</label>
          <input
          className="form-card-title"
          type="text"
          name="busca"
          placeholder="Bar, Hotel, Parque..."
          onChange={Atualiza}
          value = {busca}
          />
          <button className="btn" type = 'submit'>Pesquisar</button>
        </form>
        <div className = "block_card">
          {estabelecimentos.map((estabelecimento, index) => (
            <Estabelecimento favoritar = {favoritar} id={`estabelecimento__${estabelecimento.id || index}`} name={estabelecimento.name}>{estabelecimento.full_address}</Estabelecimento>
          ))}
      </div>
      </main>
    </div>
  );
}

export default App;
