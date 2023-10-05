const curso = "https://www.youtube.com/watch?v=drXkf_rytRs&t=2s"
const URL = "https://pokeapi.co/api/v2/pokemon/"
const listaPokemon = document.getElementById('listaPokemon');
const btnHeaders = document.querySelectorAll('.btn-header');
var allPokemon = [];

for (let i = 1; i < 152; i++) {
    fetch(URL + i)
        .then(response => response.json())
        .then(data => {
            allPokemon.push(data)
            mostrarPokemon(data)
        })
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map(item =>
        `<p class="${item.type.name} tipo">${item.type.name}</p>`
    );
    tipos = tipos.join(" ");

    // format id, out: 001 - 002 - 003
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

// ToDo: filter by type
btnHeaders.forEach(btn => btn.addEventListener('click',
    function (event) {
        const btnFilter = event.target.id; // out: fire

        if (btnFilter === "ver-todos") {
            listaPokemon.innerHTML = "";
            allPokemon.forEach(poke => mostrarPokemon(poke))
            return;
        }

        const filterPokemon = allPokemon.map(poke => {

            var pokeTypes = poke.types.map(item => item.type.name)
            console.log(pokeTypes)

            if (pokeTypes.some(type => type.includes(btnFilter))) {
                return poke;
            }
        });

        console.log(filterPokemon)

        listaPokemon.innerHTML = "";
        filterPokemon.forEach(poke => mostrarPokemon(poke))
    }));