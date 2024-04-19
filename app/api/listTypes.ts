export default async function getPokemonsList({offset = 0}:{offset:number}) {
    const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(`https://pokeapi.co/api/v2/type?limit=8&offset=${offset}`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}
