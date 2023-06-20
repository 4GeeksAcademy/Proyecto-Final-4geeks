import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	const url = process.env.BACKEND_URL
	return {
		store: {


		},
		actions: {

			login: async (data) => {
				console.log(data);

				try {
					const response = await axios.post(`${url}login`, data)
					console.log(response);
					if (response?.status === 200) {
						localStorage.setItem("token", response.data.token);
					}

					return true

				} catch (error) {
					console.log(error);
					return false
				}

			},
			signup: async (data) => {
				console.log(data);

				try {
					const response = await axios.post(`${url}signup`, data)
					console.log(response);
					return true

				} catch (error) {
					console.log(error);
					return false
				}
			}

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
		}
	};
};

export default getState;
