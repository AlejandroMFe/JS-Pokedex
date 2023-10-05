const curso = "https://www.youtube.com/watch?v=drXkf_rytRs&t=2s"
const URL = "https://pokeapi.co/api/v2/pokemon/"
const listaPokemon = document.getElementById('listaPokemon');
const btnHeaders = document.querySelectorAll('.btn-header');
const allPokemon = [];

// Get all pokemon and save in allPokemon
for (let i = 1; i < 152; i++) {
    fetch(URL + i)
        .then(response => response.json())
        .then(data => {
            mostrarPokemon(data)
            allPokemon.push(data)
        })
}

function mostrarPokemon(poke) {
    
    // Get types of this poke
    let tipos = poke.types.map(item =>
        `<p class="${item.type.name} tipo">${item.type.name}</p>`
    );

    // Convert to string and add space between types
    tipos = tipos.join(" ");

    // Format id like: 001 - 002 - 003
    let pokeId = poke.id.toString().padStart(3, "0")

    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other[ "official-artwork" ].front_default}"
                alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p >
            </div>
        </div>
    `;

    listaPokemon.append(div)
}

// Add event listener to all btns to filter by type
btnHeaders.forEach(btn => btn.addEventListener('click',
    function (event) {

        // Get filter type from btn.id like: fire
        const btnFilter = event.target.id;

        // Clean the pokemon list
        listaPokemon.innerHTML = "";

        if (btnFilter === "ver-todos") {
            allPokemon.forEach(poke => mostrarPokemon(poke))
            return;
        }

        // Filter by types
        allPokemon.forEach(poke => {

            // get types of this poke
            const pokeTypes = poke.types.map(item => item.type.name)
            // out: ['rock', 'water']

            // check if btnFilter is in pokeTypes then mostrarPokemon(poke)
            if (pokeTypes.includes(btnFilter)) {
                mostrarPokemon(poke)
            }
        })

    })
);