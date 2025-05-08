import React, { useState, useEffect } from "react";

import { CssBaseline, Grid } from "@mui/material";

import { getPlacesData, getWeatherData } from "./api";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");

    const [cuisine, setCuisine] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCoordinates({ lat: latitude, lng: longitude });
            }
        );
    }, []);

    useEffect(() => {
        const selectedCuisines = Array.isArray(cuisine)
            ? cuisine.map((c) => String(c.value || c).toLowerCase())
            : [];

        const filtered = places.filter((place) => {
            const matchesRating = place.rating >= rating;
            const matchesCuisine = selectedCuisines.length
                ? place.types?.some(
                      (t) =>
                          typeof t === "string" &&
                          selectedCuisines.some((sc) => t.includes(sc))
                  )
                : true;

            return matchesRating && matchesCuisine;
        });
        console.log("Filtered places:", filtered);

        setFilteredPlaces(filtered);
    }, [places, rating, cuisine]);

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
                setWeatherData(data)
            );

            if (!bounds || !bounds.sw || !bounds.ne) return;

            getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
                setPlaces(
                    data?.filter((place) => place.name && place.num_reviews > 0)
                );
                setFilteredPlaces([]);
                setIsLoading(false);
            });
        }
    }, [type, bounds]);
    // console.log(places);
    // console.log(filteredPlaces);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        cuisine={cuisine}
                        setCuisine={setCuisine}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;
