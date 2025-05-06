import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
    try {
        const {
            data: { data },
        } = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            {
                params: {
                    bl_latitude: sw.lat,
                    tr_latitude: ne.lat,
                    bl_longitude: sw.lng,
                    tr_longitude: ne.lng,
                    //   restaurant_tagcategory_standalone: '10591',
                    //   restaurant_tagcategory: '10591',
                    //   limit: '30',
                    //   currency: 'USD',
                    //   open_now: 'false',
                    //   lunit: 'km',
                    //   lang: 'en_US'
                },
                headers: {
                    "x-rapidapi-key":
                        process.env.REACT_APP_RAPIDAPI_API_KEY,
                    "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
                },
            }
        );

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getWeatherData = async (lat, lng) => {
    try {
        const { data } = await axios.get(
            "https://open-weather13.p.rapidapi.com/latlon",
            {
                params: { latitude: lat, longitude: lng },
                headers: {
                    "x-rapidapi-key":
                        process.env.REACT_APP_RAPIDAPI_API_KEY,
                    "x-rapidapi-host": "open-weather13.p.rapidapi.com",
                },
            }
        );
        console.log(data)

        return data;
    } catch (err) {
        console.log(err);
    }
};
