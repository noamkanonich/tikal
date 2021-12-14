import React, { useState, useEffect } from "react";
import "./Display.css";
import Planets from "./Bar Chart/Planets";
import Loader from "../shared/components/Loader/Loader";

function Display(props) {
  const [allVehiclesToShow, setAllVehiclesToShow] = useState(null);
  const [vehicleToShow, setVehicleToShow] = useState({
    vehicleName: "VEHICLE",
    pilots: [],
    homeworlds: [],
    sumPopulation: 0,
  });
  const [showBarChart, setShowBarChart] = useState(false);
  const [showFullTable, setShowFullTable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.finish) {
      getMaxPopulationVehicle();
    }
  }, [props.finish]);

  async function getMaxPopulationVehicle() {
    let allVehicles = [];
    props.vehicles.map(async (vehicle) => {
      let maxPopulationVehicle = {
        vehicleName: vehicle.name,
        pilots: [],
        homeworlds: [],
        sumPopulation: 0,
      };
      let sumPopulation = 0;
      props.pilots.map(async (pilot) => {
        if (pilot.vehicleName === vehicle.name) {
          sumPopulation = sumPopulation + pilot.planetPopulation;
          maxPopulationVehicle.pilots.push(pilot.name);
          maxPopulationVehicle.homeworlds.push({
            name: pilot.planetName,
            population: pilot.planetPopulation ? pilot.planetPopulation : 0,
          });
          maxPopulationVehicle.sumPopulation = sumPopulation;
        }
      });
      allVehicles.push(maxPopulationVehicle);
    });
    setAllVehiclesToShow(allVehicles);

    const maxVehicle = allVehicles.reduce((prevVehicle, currentVehicle) =>
      +prevVehicle.sumPopulation > +currentVehicle.sumPopulation
        ? prevVehicle
        : currentVehicle
    );
    setVehicleToShow(maxVehicle);
    setLoading(false);
  }

  console.log(allVehiclesToShow)
  return (
    !loading && (
      <div>
        <table id="table">
          <tr>
            <th colSpan={3}>Vehicle With Maximum Sum Of Population</th>
          </tr>
          <tr>
            <td>Vehicle Name</td>
            <td>{vehicleToShow.vehicleName}</td>
          </tr>
          <tr>
            <td>Home Planets</td>
            <td>
              {vehicleToShow.homeworlds.map((planet, index) => {
                return (
                  <div key={index}>
                    <span>
                      {planet.name}, {planet.population}
                    </span>
                    <br />
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td>Pilots Names</td>
            <td>
              {vehicleToShow.pilots.map((pilot, index) => {
                return (
                  <div key={index}>
                    <span>{pilot}</span>
                    <br />
                  </div>
                );
              })}
            </td>
          </tr>
        </table>

        {showFullTable ? (
          <table id="table">
            <tr>
              <th>Vehicle Names</th>
              <th>Related Pilots Names</th>
              <th>Related Home Planets</th>
            </tr>

            {allVehiclesToShow.map((vehicle, index) => {
              return (
                <tr key={index}>
                  <td>{vehicle.vehicleName}</td>
                  <td>
                    {vehicle.pilots.map((pilot, index) => {
                      return (
                        <div>
                          <span key={index}>{pilot}</span>
                          <br />
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    {vehicle.homeworlds.map((planet, index) => {
                      return (
                        <div>
                          <span key={index}>
                            {planet.name},{" "}
                            {planet.population ? planet.population : "unknown"}
                          </span>
                          <br />
                        </div>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </table>
        ) : (
          <></>
        )}

        <div className="btnsDiv">
          {showFullTable ? (
            <button
              className="barChartButton"
              onClick={() => setShowFullTable(!showFullTable)}
            >
              Close Full Vehicles Table
            </button>
          ) : (
            <button
              className="barChartButton"
              onClick={() => {
                setShowFullTable(!showFullTable);
              }}
            >
              Show Full Vehicles Table
            </button>
          )}

          {showBarChart ? <Planets /> : <></>}

          {showBarChart ? (
            <button
              className="barChartButton"
              onClick={() => setShowBarChart(!showBarChart)}
            >
              Close Bar Chart
            </button>
          ) : (
            <button
              className="barChartButton"
              onClick={() => setShowBarChart(!showBarChart)}
            >
              Show Bar Chart
            </button>
          )}
        </div>
      </div>
    )
  );
}

export default Display;
