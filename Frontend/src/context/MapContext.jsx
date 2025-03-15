import { createContext, useState, useEffect } from "react";

export const MapContext = createContext(null);

const MapContextProvider = ({ children }) => {

    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);
    const [coords1, setCoords1] = useState(null);
    const [coords2, setCoords2] = useState(null);
    const [route, setRoute] = useState(null);
    const [distance, setDistance] = useState(0);


 

    const getCoordinates = async (address) => {
        const response = await fetch(`${import.meta.env.VITE_GEOCODING_URL}${encodeURIComponent(address)}.json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
        const data = await response.json();
        console.log(data);
        if (data.features && data.features.length > 0) {
            return data.features[0].center;
        }
        return null;
    };

    const getRoute = async (start, end) => {
        const response = await fetch(`${import.meta.env.VITE_DIRECTIONS_URL}${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
        const data = await response.json();
        console.log(data);
        if (data.routes && data.routes.length > 0) {
            return data.routes[0].geometry;
        }
        return null;
    };

    const getDistance = async (start, end) => {
        const response = await fetch(`${import.meta.env.VITE_DIRECTIONS_URL}${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
        const data = await response.json();
    
        if (data.routes && data.routes.length > 0) {
            return data.routes[0].distance;
        }
        return null;
    };

    const handleCalculateRoute = async () => {
        const coordsA = await getCoordinates(fromValue);
        const coordsB = await getCoordinates(toValue);

        setCoords1(coordsA);
        setCoords2(coordsB);

        if (coordsA && coordsB) {
            const routeGeometry = await getRoute(coordsA, coordsB);
            setRoute(routeGeometry);
            const totalDistance = await getDistance(coordsA, coordsB);
            const convertedDistance = (totalDistance / 1000).toFixed(2);
            setDistance(convertedDistance);
            // console.log(totalDistance);
        }
    };

    // useEffect(() => {
    //     console.log(`Distance has changed to: ${distance}`);
    // }, [distance]);

    return (
        <MapContext.Provider value={{ fromValue, toValue, selectedCar, coords1, coords2, route, distance, setFromValue, setToValue, handleCalculateRoute, setSelectedCar}}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContextProvider;
