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
        console.log(data)

        return data;
    } catch (error) {
        console.log(error);
    }
};

// export const getPlacesData = async (sw, ne) => {
//     // Restrict within the map viewport.
//     const { Place, SearchNearbyRankPreference } =
//         await google.maps.importLibrary("places");

//     const centerLat = (sw.lat + ne.lat) / 2;
//     const centerLng = (sw.lng + ne.lng) / 2;

//     let center = new google.maps.LatLng(centerLat, centerLng);
//     const request = {
//         // required parameters
//         fields: [
//             "displayName",
//             "location",
//             "businessStatus",
//             "rating",
//             "types",
//             "websiteURI",
//             "nationalPhoneNumber",
//             "photos",
//             "priceLevel",
//             "priceRange",
//             "primaryType",
//             "userRatingCount",
//             "primaryTypeDisplayName"
//         ],
//         locationRestriction: {
//             center: center,
//             radius: 1500,
//         },
//         includedPrimaryTypes: ["restaurant"],
//         maxResultCount: 20,
//         // rankPreference: SearchNearbyRankPreference.POPULARITY,
//         language: "en-US",
//         region: "us",
//     };
//     const { places } = await Place.searchNearby(request);

//     console.log(places);

//     const formatted = await Promise.all(
//         places.map(async (place) => {
//             // const photoUrls = await Promise.all(
//             //     (place.photos || []).map(async (photo) => {
//             //         const res = await fetch(
//             //             `https://places.googleapis.com/v1/${photo.name}/media?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&maxWidthPx=1980&maxHeightPx=1080`
//             //         );
//             //         return res.url;
//             //     })
//             // );
//             let photoUrl = null;

//             if (place.photos && place.photos.length > 0) {
//                 const firstPhotoName = place.photos[0].name;
//                 const mediaUrl =
//                     `https://places.googleapis.com/v1/${firstPhotoName}/media` +
//                     `?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&maxWidthPx=1980&maxHeightPx=1080`;
//                 const res = await fetch(mediaUrl, {
//                     method: "GET",
//                     redirect: "follow",
//                 });
//                 photoUrl = res.url; // this is the real image URL
//             }

//             return {
//                 name: place.displayName,
//                 rating: place.rating,
//                 status: place.businessStatus,
//                 types: place.types,
//                 website: place.websiteURI,
//                 phone: place.nationalPhoneNumber,
//                 photoUrl,
//                 location: {
//                     lat: place.location.lat(),
//                     lng: place.location.lng(),
//                 },
//                 priceLevel: place.priceLevel,
//                 priceRange: place.priceRange,
//                 primaryType: place.primaryType,
//                 ratingCount: place.userRatingCount,
//                 primaryTypeDisplayName: place.primaryTypeDisplayName,
//             };
//         })
//     );

//     console.log("getPlacesDataByGoogle ->", formatted);

//     return formatted;
// };

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


