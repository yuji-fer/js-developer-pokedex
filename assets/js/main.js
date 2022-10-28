const pokemonListElement = document.getElementById('pokemonList');
const loadMoreButtonElement = document.getElementById('loadMoreButton');
const pokemonDetailModalElement = document.getElementById('pokemonDetailModal');

const maxRecords = 151;
const limit = 10;
let offset = 0;
let pokemonList = [];

function convertPokemonToButton(pokemon) {
    return `
        <button class="pokemon_button" onclick="showPokemonDetail(${pokemon.number})">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        </button>
    `;
}

function showPokemonDetail(id) {
    // stats = [];
    const pokemon = pokemonList.find((item) => item.number === id);
    const newHtml = `
        <div class="pokemonDetailModalContent ${pokemon.type}">
            <div class="header">
                <span class="close">&times;</span>
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </div>
            <div class="footer">
                <div class="tab">
                    <button id="AboutTitle" class="tablinks" onclick="openFeature('About')">About</button>
                    <button id="BaseStatsTitle" class="tablinks" 
                    onclick="openFeature('BaseStats')">Base Stats</button>
                </div>
                <div id="About" class="feature">
                    <div class="featureItem">
                        <span>Abilities</span>
                        <p>${pokemon.abilities.join(', ')}</p>
                    </div>
                    <div class="featureItem">
                        <span>Height</span>
                        <p>${pokemon.height}m</p>
                    </div>
                    <div class="featureItem">
                        <span>Weight</span>
                        <p>${pokemon.weight}Kg</p>
                    </div>
                </div>
                <div id="BaseStats" class="feature" style="display:none;">
                    ${pokemon.stats.map((item) => ( `
                        <div class="featureItem">
                            <span>${item.name}</span>
                            <p>${item.value}</p>
                        </div>
                    `)).join('')}
                </div>
            </div>
        </div>
    `;
    pokemonDetailModalElement.innerHTML = newHtml;
    pokemonDetailModalElement.style.display = "block";
}

function openFeature(title) {
    var i;
    var x = document.getElementsByClassName("feature");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    document.getElementById(title).style.display = "block";

    x = document.getElementsByClassName("tablinks");
    for (i = 0; i < x.length; i++) {
        x[i].style.color = "#ccc";
        x[i].style.textDecoration = "none";
    }
    x = document.getElementById(`${title}Title`);
    x.style.color = "black";
    x.style.textDecoration = "underline";
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.push(...pokemons);
        const newHtml = pokemons.map(convertPokemonToButton).join('');
        pokemonListElement.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButtonElement.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButtonElement.parentElement.removeChild(loadMoreButtonElement);
    } else {
        loadPokemonItens(offset, limit);
    }
});

window.addEventListener('click', (event) => {
    const spanElement = document.getElementsByClassName("close")[0];
    if (event.target == pokemonDetailModalElement || event.target == spanElement) {
        pokemonDetailModalElement.style.display = "none";
    }
});

