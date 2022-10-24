import "./App.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "@emotion/styled";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr key={pokemon.id}>
    <td>{pokemon.name.english} </td>
    <td>{pokemon.type.join(", ")} </td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select!</button>
    </td>
  </tr>
);

const PokemonInfo = ({ name, base }) => (
  <div className="card">
    <h2>{name.english}</h2>
    <table>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PokemonRow.prototype = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func,
  }),
};

PokemonInfo.prototype = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number,
    "Sp. Attack": PropTypes.number,
    "Sp. Defense": PropTypes.number,
    Speed: PropTypes.number,
  }),
};

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  width: 800px;
  margin: auto;
  padding-top: 1rem;
`;

const InputField = styled.input`
  width: 100%;
  font-size: large;
  padding: 10px;
  border: 3px solid #bbb;
  border-radius: 10px;
  margin-bottom: 15px;
`;

function App() {
  const [filter, setFilter] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [pokemon, setPokemon] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/react-refresh/pokemon.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
      });
  }, []);
  return (
    <Container>
      <Title className="title">Pokemon Search</Title>
      <InputField
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <TwoColumnLayout>
        <div>
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) =>
                  pokemon.name.english.toLowerCase().includes(filter)
                )
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelect={(pokemon) => setSelectedItem(pokemon)}
                  ></PokemonRow>
                ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem}></PokemonInfo>}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
