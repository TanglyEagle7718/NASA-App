import axios from "axios";

export default axios.create({
	baseURL:
		"https://api.nasa.gov/planetary/apod?api_key=9YQzzRKo0RzymZ46p8rgS2beZyK4vLozDDBoU0AA",
	headers: {
		Authorization: "Bearer 9YQzzRKo0RzymZ46p8rgS2beZyK4vLozDDBoU0AA",
	},
});
