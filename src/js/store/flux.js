import { useParams } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			people:[],
			vehicles:[],
			planets:[],
			person:[],
			singleVehicle:[],
			singlePlanet:[]

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
				
			},
			getPeople: () => {
				const store = getStore();
				fetch("https://www.swapi.tech/api/people/" , {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				})
					.then((resp) => {
						return resp.json();
					})
					.then(data => {
						//return data;
						let dataGathered = data.results.map((item,index) => {
							return {...item,index:index};
						}); 

						setStore({people : dataGathered});
					})
				   
			},
			getPerson: (uid) => {
				const store = getStore();
				console.log("uid on flux" , uid)

				fetch("https://www.swapi.tech/api/people/" + uid, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				})
					.then((resp) => {
						return resp.json();
					})
					.then(data => {
						//return data;
						let dataGathered = data.result.properties;

						setStore({person : dataGathered});
					})
				   
			},
			
			getVehicles: () => {
				const store = getStore();
				fetch("https://www.swapi.tech/api/vehicles/", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				})
					.then((resp) => {
						return resp.json();
					})
					.then(data => {
						//return data;
						let dataGathered = data.results.map((item,index) => {
							return {...item,index:index};
						}); 

						setStore({vehicles : dataGathered});
					})
			},

			getSingleVehicle: (uid) => {
				const store = getStore();
				console.log("uid on flux" , uid)

				fetch("https://www.swapi.tech/api/vehicles/" + uid, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				})
					.then((resp) => {
						return resp.json();
					})
					.then(data => {
						//return data;
						let dataGathered = data.result.properties;

						setStore({singleVehicle : dataGathered});
					})
				   
			},

			getPlanets: () => {
				const store = getStore();
				fetch("https://www.swapi.tech/api/planets/", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				})
					.then((resp) => {
						return resp.json();
					})
					.then(data => {
						//return data;
						let dataGathered = data.results.map((item,index) => {
							return {...item,index:index};
						}); 

						setStore({planets : dataGathered});
					})
			},

			getSinglePlanet: (uid) => {
				const store = getStore();
				console.log("uid on flux" , uid)

				fetch("https://www.swapi.tech/api/planets/" + uid, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				})
					.then((resp) => {
						return resp.json();
					})
					.then(data => {
						//return data;
						let dataGathered = data.result.properties;

						setStore({singlePlanet : dataGathered});
					})
				   
			},

		}
	};
};

export default getState;
