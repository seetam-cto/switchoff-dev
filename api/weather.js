import axios from "axios";

export const fetchWeather = async (location) =>
    await axios.get(`https://api.weatherapi.com/v1/current.json?key=8390a4b2bb0c44a9bd114751232107&q=${location}`)
