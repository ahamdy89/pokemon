"use client";

import PokemonDetails from "./PokemonDetails";

const TypeId = ({
  params,
}: {
  params: { typeName: string; typeId: string; pokemonId: string };
}) => {
  return <PokemonDetails pokemonId={params.pokemonId} />;
};

export default TypeId;
