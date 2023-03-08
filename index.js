const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  let url;

  if (typeof pokemon === "number" && pokemon <= 151) {
    url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  } else if (typeof pokemon === "string" && pokemon.length > 0) {
    const lowercasePokemon = pokemon.toLowerCase();
    const APIResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${lowercasePokemon}`
    );

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();

      if (data.id <= 151) {
        url = `https://pokeapi.co/api/v2/pokemon/${lowercasePokemon}`;
      }
    }
  }

  if (url) {
    const APIResponse = await fetch(url);

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  }

  return null;
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Only the original 151";
    pokemonName.style.cssText =
      "font-size: 25px; color: red; text-align: center;";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value);
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

// create a new paragraph element
const message = document.createElement("p");

// set the message content
message.textContent =
  "Write the Pokemon's name or #. Click on the buttons to go in order.";

// set the message style
message.style.position = "fixed";
message.style.bottom = "0";
message.style.left = "0";
message.style.right = "0";
message.style.padding = "1rem";
message.style.backgroundColor = "#000";
message.style.color = "#fff";
message.style.textAlign = "center";

// add the message to the page
document.body.appendChild(message);

// remove the message after 10 seconds
setTimeout(() => {
  message.remove();
}, 10000);
