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
      tournaments: [],
      trials: [],
    },
    actions: {
      firstLoad: async () => {
        const user = localStorage.getItem("user");
        if (user !== null) {
          const store = getStore();
          store.user = JSON.parse(user);
          setStore(user);

          try {
            const response = await axios.get(`${url}trials`, config);
            const tournaments = await axios.get(`${url}tournaments`, config);

            console.log(response.data, response.status);
            console.log(tournaments.data, tournaments.status);

            const store = getStore();
            store.trials = response.data.response;
            store.tournaments = tournaments.data.response;
            setStore(store);

            return 200;
          } catch (error) {
            if (error === undefined) return undefined;
            console.log(error.response?.data, error.response?.status);
            return error.response?.status;
          }
        }
      },

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
