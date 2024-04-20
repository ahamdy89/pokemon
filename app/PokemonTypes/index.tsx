"use client";

import { useQuery } from "@tanstack/react-query";
import getPokemonsTypesList from "../api/listTypes";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

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

const PokemonTypes = () => {
  const [offset, setOffset] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getPokemonsTypesList({ offset }),
    queryKey: ["pokemonTypes", offset],
  });
  const { results, count, next, previous } = data || {};

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Sorry There was an Error</div>;

  const handleNextPage = async () => {
    if (next) {
      const nextOffset = parseInt(next.split("offset=")[1].split("&")[0]);
      setOffset(nextOffset);
    }
  };

  const handlePreviousPage = async () => {
    if (previous) {
      const previousOffset = parseInt(
        previous.split("offset=")[1].split("&")[0]
      );
      setOffset(previousOffset);
    }
  };

  return (
    <Container>
      <PageTiltle>Pokemon Types</PageTiltle>
      <Grid>
        {results?.map((type: { name: string; url: string }) => {
          const id = type.url.split("/")[6];
          return (
            <Card key={type.name}>
              <PokemonName>{type.name.toUpperCase()}</PokemonName>
              <Link
                className="rounded-xl border-solid border-blue-500 border-2 px-8 py-4 text-[1.25rem]"
                href={`/${type.name}/${id}/`}
              >
                View Pokemons
              </Link>
            </Card>
          );
        })}
      </Grid>

      <Pagination>
        <PaginationButton disabled={!previous} onClick={handlePreviousPage}>
          Previous
        </PaginationButton>
        <PageInfo>
          Page {offset / 8 + 1} of {Math.ceil(count / 8)}
        </PageInfo>
        <PaginationButton disabled={!next} onClick={handleNextPage}>
          Next
        </PaginationButton>
      </Pagination>
    </Container>
  );
};

export default PokemonTypes;
