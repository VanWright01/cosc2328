// HW7 – COSC 2328 – Professor McCurry
// Implemented by: Van Wright

function PokemonCard(props) {
  return (
    <div className="card">
      <img src={"https://placehold.co/150x150/4FC3F7/333333?text=" + props.name} />
      <h2>{props.name}</h2>
      <p className="letters">{props.name.length} letters</p>
    </div>
  );
}

function PokemonRoster(props) {
  return (
    <div className="pokedex">
      {props.pokemon.map(entry => <PokemonCard key={entry.name} name={entry.name} />)}
    </div>
  );
}

function App(props) {
  return (
    <div>
      <header>
        <h1>{`Showing ${props.roster.length} short-named Pokemon, shortest name first`}</h1>
      </header>
      <PokemonRoster pokemon={props.roster} />
    </div>
  );
}

async function loadPokedex() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    const data = await response.json();
    const shortNames = data.results.filter(pokemon => pokemon.name.length <= 6);
    const sortedArray = shortNames.sort((a, b) => a.name.length - b.name.length);

    const root = ReactDOM.createRoot(document.querySelector("#root"));
    root.render(<App roster={sortedArray} />);

  } catch (error) {
    document.querySelector("#root").innerHTML = '<p class="error-message">Something went wrong.</p>';
  }
}

loadPokedex();