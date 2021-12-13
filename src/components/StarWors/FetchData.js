import React, { useState, useEffect } from "react";
import Axios from "axios";
import Pilots from "./Pilots";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../../shared/components/Loader/Loader";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNext, setIsNext] = useState(true);
  // const url = `https://swapi.dev/api/vehicles/?page=`;
  
  const url = `https://swapi.py4e.com/api/vehicles?page=`;

  useEffect(() => {
    // setLoading(true);
    getVehicles(url);
  }, []);

  // async function getVehiclesNewUrl() {
  //   const numOfPages = await Axios.get("https://www.swapi.tech/api/vehicles")
  //     .then((response) => {
  //       return response.data.total_pages;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  //   for (let pageNumber = 1; pageNumber < numOfPages + 1; pageNumber++) {
  //     const vehiclesUrls = await Axios.get(
  //       `https://www.swapi.tech/api/vehicles?page=${pageNumber}&limit=10`
  //     ).then((response) => {
  //       return response.data.results;
  //     });
  //     vehiclesUrls.map(async (vehicle) => {
  //       const currentVehicle = await Axios.get(vehicle.url)
  //         .then((response) => {
  //           return response.data.result.properties;
  //         })
  //         .catch((err) => {
  //           return err;
  //         });
  //       if (currentVehicle.pilots.length > 0) {
  //         addVehicle(currentVehicle);
  //       }
  //     });
  //   }
  //   setLoading(false)
  // }

  async function getVehicles(url) {
    let pageNumber = 1;
    while (isNext) {
      const currentVehicles = await Axios.get(url + `${pageNumber}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
      if (currentVehicles) {
        currentVehicles.results.map((vehicle) => {
          if (vehicle.pilots.length > 0) {
            addVehicle(vehicle);
          }
        });

        if (!currentVehicles.next) {
          setTimeout(() => {
            setIsNext(false);
            setLoading(false);
          }, 2000)
          return;
        }
        pageNumber = pageNumber + 1;
      }
    }
  }

  const addVehicle = (newVehicle) =>
    setVehicles((vehicles) => [...vehicles, newVehicle]);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <Pilots vehicles={vehicles} loading={loading} />
    </div>
  );
}

export default Vehicles;
