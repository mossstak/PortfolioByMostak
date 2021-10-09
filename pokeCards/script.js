const pokedex = document.getElementById('flexbox-container');
const pokemon_number = 152;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};


const fetchPokemon = () =>{
    const promises = [];
    for(let i = 1; i < pokemon_number; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) =>({
            name: result.name,
            front_image: result.sprites['front_default'],
            back_image: result.sprites['back_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            ability: result.abilities.map((ability) => ability.ability.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
    .map((pokeMap) => ` 
    <div class="flexbox-item">
        <img src="${pokeMap.front_image}"/>
        <img src="${pokeMap.back_image}"/>
        <div class="sameline">
        <span>${pokeMap.id}:</span><p>${pokeMap.name}</p>
        </div>
        <p>Type: ${pokeMap.type}</p>
        <p>Ability: ${pokeMap.ability}</p>
    </div>`)

    .join('')

    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();