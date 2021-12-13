import React, { useState, useEffect } from "react";
import Axios from "axios";
import Display from "../Display";
import Loader from "../../shared/components/Loader/Loader";
import CircularProgress from "@mui/material/CircularProgress";

function Pilots(props) {
  const [vehiclesPilots, setVehiclesPilots] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    addAllPilots();
  }, []);

  useEffect(() => {
    if (vehiclesPilots.length > 0) {
      getPilots();
    }
  }, [vehiclesPilots]);

  async function addAllPilots() {
    props.vehicles.map((vehicle, index) => {
      const newVehiclePilot = {
        id: index + 1,
        pilots: vehicle.pilots,
        vehicle: vehicle.name,
      };
      addVehiclesPilots(newVehiclePilot);
    });
  }

  const addVehiclesPilots = (newVehiclePilot) =>
    setVehiclesPilots((vehiclesPilots) => [...vehiclesPilots, newVehiclePilot]);

  async function getPilots() {
    let id = 1;
    vehiclesPilots.map(async (currentVehicle, index) => {
      await currentVehicle.pilots.map(async (pilot) => {
        const pilotResponse = await Axios.get(pilot)
          .then((pilotResponse) => {
            return pilotResponse;
          })
          .catch((err) => {
            return err;
          });
        const planetResponse = await Axios.get(pilotResponse.data.homeworld)
          .then((planetResponse) => {
            return planetResponse;
          })
          .catch((err) => {
            return err;
          });
        let newPilot = {
          id: id,
          name: pilotResponse.data.name,
          vehicleName: currentVehicle.vehicle,
          planetUrl: pilotResponse.data.homeworld,
          planetName: planetResponse.data.name,
          planetPopulation: parseInt(planetResponse.data.population),
        };
        id = id + 1;
        if (index < vehiclesPilots.length - 1) {
          await addPilots(newPilot);
        } else {
          await addPilots(newPilot);
          setLoading(false);
          setFinish(true);
        }
      });
    });
  }

  const addPilots = (newPilot) => {
    setPilots((pilots) => [...pilots, newPilot]);
  };

  async function addAllPlanets() {
    pilots.map(async (pilot, index) => {
      const response = await Axios.get(pilot.planet).then((response) => {
        console.log(response.data);
        return response;
      });
    });
  }

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <Display
        pilots={pilots}
        vehicles={props.vehicles}
        finish={finish}
        loading={loading}
      />
    </div>
  );
}

export default Pilots;
