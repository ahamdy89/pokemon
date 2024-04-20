import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import getPokemonsList from "@/app/api/listPokemons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  height: 100%;
  gap: 4rem;
`;

const PageTiltle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
`;

const Card = styled.div`
  background-image: linear-gradient(
    to right,
    rgb(153, 204, 255) 0%,
    rgb(102, 153, 204) 100%
  );
  transition: background-image 5s ease-in-out;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 20rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  &:hover {
    background-image: linear-gradient(
      to right,
      rgb(158, 235, 123) 0%,
      rgb(34, 139, 34) 100%
    );
  }
`;

const PokemonName = styled.h1`
  font-weight: bold;
  margin-block-start: 1rem;
  font-size: 2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
`;

const PageInfo = styled.span`
  font-weight: bold;
`;

const PaginationButton = styled.button`
  padding-inline: 20px;
  padding-block: 10;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f0f0f0;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
`;

const PokemonList = ({
  typeInfo,
}: {
  typeInfo: { typeName: string; typeId: string };
}) => {
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getPokemonsList({ typeId: typeInfo.typeId }),
    queryKey: ["pokemons", typeInfo.typeId],
  });
  const { pokemon } = data || {};

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Sorry There was an Error</div>;

  const handleNextPage = async () => {
    setOffset((prevOffset) => prevOffset + 12);
  };

  const handlePreviousPage = async () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - 12));
  };
  const slicedPokemon = pokemon.slice(offset, offset + 12);

  return (
    !isLoading && (
      <Container>
        <PageTiltle>{typeInfo.typeName.toUpperCase()} Pokemons</PageTiltle>
        <Grid>
          {slicedPokemon?.map((pokemon: any) => {
            const pokemonId = pokemon.pokemon.url.split("/")[6];
            return (
              <Card key={pokemon.pokemon.name}>
                <PokemonName>{pokemon.pokemon.name.toUpperCase()}</PokemonName>
                <Link
                  className="rounded-xl border-solid border-blue-500 border-2 px-8 py-4 text-[1.25rem]"
                  href={`/${typeInfo.typeName}/${typeInfo.typeId}/pokemon/${pokemonId}`}
                >
                  View Details
                </Link>
              </Card>
            );
          })}
        </Grid>

        <Pagination>
          <PaginationButton
            onClick={handlePreviousPage}
            disabled={offset === 0}
          >
            Previous
          </PaginationButton>
          <PageInfo>
            Page {offset / 12 + 1} of {Math.ceil(pokemon.length / 12)}
          </PageInfo>
          <PaginationButton
            onClick={handleNextPage}
            disabled={offset + 12 >= pokemon.length}
          >
            Next
          </PaginationButton>
        </Pagination>
      </Container>
    )
  );
};

export default PokemonList;
