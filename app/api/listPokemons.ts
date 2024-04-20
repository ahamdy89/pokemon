export default async function getPokemonsList({typeId}:{typeId: string}) {
    const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(`https://pokeapi.co/api/v2/type/${typeId}`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}
