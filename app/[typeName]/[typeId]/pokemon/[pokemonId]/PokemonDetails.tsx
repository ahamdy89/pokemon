import getPokemonDetails from "@/app/api/pokemonDetails";
import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  height: 50%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); /* Subtle drop shadow */
`;

const Card = styled.div`
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.5rem;
`;

const PokemonDetails = ({ pokemonId }: { pokemonId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getPokemonDetails({ pokemonId: pokemonId }),
    queryKey: ["pokemon", pokemonId],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Sorry There was an Error</div>;

  const chartData = [
    {
      name: "Stats",
      data: data.stats.map((stat: any) => stat.base_stat),
    },
    {
      name: "Effort",
      data: data.stats.map((stat: any) => stat.effort),
    },
  ];

  const options = {
    chart: {
      id: "radar-bar",
    },
    xaxis: {
      categories: data.stats.map((stat: any) => stat.stat.name.toUpperCase()),
    },
  };

  return (
    <Container>
      <Card>
        <p>Name: {data.name.toUpperCase()}</p>
        <p>Height: {data.height}cm</p>
        <p>weight: {data.weight}lb</p>
        <p> Base Experience: {data.base_experience}</p>
      </Card>
      <Chart options={options} series={chartData} type="radar" width="100%" />
    </Container>
  );
};

export default PokemonDetails;
