const pokemonNome = document.querySelector('.pokemonNome');
const pokemonNumero = document.querySelector('.pokemonNumero');
const pokemonImagem = document.querySelector('.pokemonImagem');

const form = document.querySelector('.form');
const input = document.querySelector('.pesquisa2');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonNome.innerHTML = 'Loading...';
  pokemonNumero.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = 'Not found :c';
    pokemonNumero.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);