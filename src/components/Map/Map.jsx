import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, makeStyles, useMediaQuery } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@mui/material/Rating";

import useStyles from "./styles";

import mapStyles from "./mapStyles";

const Map = ({
    setCoordinates,
    setBounds,
    coordinates,
    places,
    setChildClicked,
    weatherData,
}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery("(min-width:600px)");

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                // options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({
                        ne: e.marginBounds.ne,
                        sw: e.marginBounds.sw,
                    });
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, index) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={index}
                    >
                        {!isDesktop ? (
                            <LocationOnOutlinedIcon
                                color="primary"
                                fontSize="large"
                            />
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography
                                    className={classes.typography}
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    {place.name}
                                </Typography>
                                <img
                                    className={classes.pointer}
                                    src={
                                        place.photo
                                            ? place.photo.images.large.url
                                            : "https://res.klook.com/image/upload/c_fill,w_750,ar_16:9,q_auto/activities/ivtizrfcye0uvxyzceiy.webp"
                                    }
                                    alt={place.name}
                                />
                                <Rating
                                    size="small"
                                    value={Number(place.rating)}
                                    readOnly
                                />
                            </Paper>
                        )}
                    </div>
                ))}
                {weatherData?.list?.map((data, index) => (
                    <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
                        <img
                            height={100}
                            src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                            alt={data.weather[0].description}
                        />
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
