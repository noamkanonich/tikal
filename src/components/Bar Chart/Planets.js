import React, { useState, useEffect } from "react";
import Axios from "axios";
import BarChart from "./BarChart";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../../shared/components/Loader/Loader";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNext, setIsNext] = useState(true);
  const url = `https://swapi.py4e.com/api/planets/?page=`;

  useEffect(() => {
    setLoading(true);
    getPlanets();
  }, []);

  async function getPlanets() {
    let pageNumber = 1;
    while (isNext) {
      const currentPlanets = await Axios.get(url + `${pageNumber}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          return err;
        });
      currentPlanets.results.map(async (planet, index) => {
        if (
          planet.name === "Tatooine" ||
          planet.name === "Alderaan" ||
          planet.name === "Naboo" ||
          planet.name === "Bespin" ||
          planet.name === "Endor"
        ) {
          const newPlanet = {
            id: index + 1,
            name: planet.name,
            population: parseInt(planet.population),
          };
          addPlanet(newPlanet);
        }
      });
      if (!currentPlanets.next) {
        setIsNext(false);
        setLoading(false);
        return;
      }
      pageNumber = pageNumber + 1;
    }
  }

  const addPlanet = (newPlanet) =>
    setPlanets((planets) => [...planets, newPlanet]);

  if (planets && !loading) {
    console.log(planets);
  }

  return loading ? (
    <div>
      <div>
        <h1>
          Loading planets bar chart...
          <Loader />
        </h1>
      </div>
    </div>
  ) : (
    <div>
      <h1>Planets Bar Chart</h1>
      <BarChart planets={planets} finish={isNext} />
    </div>
  );
}

export default Planets;
