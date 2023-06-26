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
            {
              name: "Alejandro",
              team: "Equipo A",
              points: 56,
              categorie: "Categoría 1",
            },
            {
              name: "Carlos",
              team: "Equipo C",
              points: 30,
              categorie: "Categoría 1",
            },
            {
              name: "Antonio",
              team: "Equipo B",
              points: 20,
              categorie: "Categoría 1",
            },
            {
              name: "Rafael",
              team: "Equipo D",
              points: 10,
              categorie: "Categoría 4",
            },
          ],
        },
        {
          tournament: "Torneo Caldos",
          name: "Semana 4",
          categories: ["Categoría 1", "Categoría 2", "Categoría 4"],
          runners: [
            {
              name: "Javier",
              team: "Equipo A",
              points: 20,
              categorie: "Categoría 1",
            },
            {
              name: "Lucía",
              team: "Equipo C",
              points: 40,
              categorie: "Categoría 4",
            },
            {
              name: "Sandra",
              team: "Equipo B",
              points: 30,
              categorie: "Categoría 2",
            },
            {
              name: "Rafael",
              team: "Equipo D",
              points: 10,
              categorie: "Categoría 1",
            },
          ],
        },
        {
          tournament: "Torneo Caldos",
          name: "Semana 5",
          categories: ["Categoría 1", "Categoría 2", "Categoría 4"],
          runners: [
            {
              name: "Javier",
              team: "Equipo A",
              points: 10,
              categorie: "Categoría 1",
            },
            {
              name: "Lucía",
              team: "Equipo C",
              points: 30,
              categorie: "Categoría 4",
            },
            {
              name: "Sandra",
              team: "Equipo B",
              points: 70,
              categorie: "Categoría 2",
            },
            {
              name: "Lucian",
              team: "Equipo D",
              points: 10,
              categorie: "Categoría 4",
            },
          ],
        },
      ],
    },
    actions: {
      login: async (data) => {
        console.log(data);

        try {
          const response = await axios.post(`${url}api/login`, data);
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
          const response = await axios.post(`${url}api/signup`, data);
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
