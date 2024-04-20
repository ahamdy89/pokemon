export default async function getPokemonDetails({pokemonId}:{pokemonId: string}) {
    const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}
