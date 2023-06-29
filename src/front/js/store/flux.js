import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  const url = process.env.BACKEND_URL;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    },
  };
  return {
    store: {
      user: {},
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
        data.firstField = data.firstField.toLowerCase().replaceAll(" ", "");

        try {
          const response = await axios.post(`${url}login`, data, config);
          console.log(response.data, response.status);
          if (response?.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log(response.data.user);

            const store = getStore();
            store.user = response.data.user;
            setStore(store);
          }

          return 200;
        } catch (error) {
          if (error === undefined) return undefined;
          console.log(error.response?.data, error.response?.status);
          return error.response?.status;
        }
      },
      signup: async (data) => {
        data.email = data.email.toLowerCase().replaceAll(" ", "");
        data.mobile = data.mobile.replaceAll(" ", "");
        data.name = data.name.toLowerCase().replaceAll(" ", "");
        data.subName = data.subName.toLowerCase();
        data.username = data.username.toLowerCase().replaceAll(" ", "");
        data.dni = data.dni.toLowerCase().replaceAll(" ", "");
        console.log(data);

        try {
          const response = await axios.post(`${url}signup`, data, config);
          console.log(response);
          return true;
        } catch (error) {
          console.log(error.response.data, error.response.status);
          return false;
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        const store = getStore();
        store.user = {};
        setStore(store);
      },

      editProfile: async (data) => {
        console.log(data);
        data.email = data.email.toLowerCase().replaceAll(" ", "");
        data.phone = parseInt(data.phone.toString().replaceAll(" ", ""));
        data.name = data.name.replaceAll(" ", "");
        data.subname = data.subname;
        data.username = data.username.toLowerCase().replaceAll(" ", "");
        data.dni = data.dni.toLowerCase().replaceAll(" ", "");

        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
            Authorization: "Bearer " + token,
          },
        };
        try {
          const response = await axios.put(`${url}profile/edit`, data, config);
          console.log(response.data, response.status);

          const user = JSON.parse(localStorage.getItem("user"));
          user.user_name = data.username;
          user.name = data.name;
          user.subname = data.subname;
          user.dni = data.dni;
          user.phone = data.phone;
          user.email = data.email;
          localStorage.setItem("user", JSON.stringify(user));

          const store = getStore();
          store.user = user;
          setStore(store);

          return true;
        } catch (error) {
          console.log(error.response.data, error.response.status);
          return false;
        }
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
