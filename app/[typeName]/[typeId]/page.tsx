import PokemonList from "./PokemonList";

const TypeId = ({ params }: { params: { typeName: string, typeId: string } }) => {

  return <PokemonList typeInfo={params}/>;
};

export default TypeId;
