import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  const url = process.env.BACKEND_URL;
  return {
    store: {
      tournaments: ["Torneo Maitez", "Torneo Caldos"],
      trials: [
        {
          tournament: "Torneo Maitez",
          name: "Semana 1",
          categories: [
            "Categoría 1",
            "Categoría 2",
            "Categoría 3",
            "Categoría 4",
          ],
          runners: [
            { name: "Prueba1", team: "Equipo A", points: 56 },
            { name: "Prueba2", team: "Equipo C", points: 30 },
            { name: "Prueba3", team: "Equipo B", points: 20 },
            { name: "Prueba4", team: "Equipo D", points: 10 },
          ],
        },
        {
          tournament: "Torneo Caldos",
          name: "Semana 4",
          categories: ["Categoría 1", "Categoría 2", "Categoría 4"],
          runners: [
            { name: "Prueba1", team: "Equipo A", points: 20 },
            { name: "Prueba2", team: "Equipo C", points: 40 },
            { name: "Prueba3", team: "Equipo B", points: 30 },
            { name: "Prueba4", team: "Equipo D", points: 10 },
          ],
        },
        {
          tournament: "Torneo Caldos",
          name: "Semana 5",
          categories: ["Categoría 1", "Categoría 2", "Categoría 4"],
          runners: [
            { name: "Prueba1", team: "Equipo A", points: 20 },
            { name: "Prueba2", team: "Equipo C", points: 40 },
            { name: "Prueba3", team: "Equipo B", points: 30 },
            { name: "Prueba4", team: "Equipo D", points: 10 },
          ],
        },
      ],
    },
    actions: {
      login: async (data) => {
        console.log(data);

        try {
          const response = await axios.post(`${url}login`, data);
          console.log(response);
          if (response?.status === 200) {
            localStorage.setItem("token", response.data.token);
          }

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      signup: async (data) => {
        console.log(data);

        try {
          const response = await axios.post(`${url}signup`, data);
          console.log(response);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      logout: () => {
        console.log("prueba");
        localStorage.removeItem("token");
      },

      /* 

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
		*/
    },
  };
};

export default getState;
