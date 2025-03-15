import React, { useContext  } from 'react';
import { SearchBox } from '@mapbox/search-js-react';
import { MapContext } from '../../context/MapContext';

const AutoCompleteAddress = () => {

    const { fromValue, toValue, setFromValue, setToValue, handleCalculateRoute } = useContext(MapContext);

        console.log(import.meta.env.MAPBOX_ACCESS_TOKEN);
    return (
        <div>
            <div>
                <label className='text-primaryGray'>Where From?</label>
                <SearchBox
                    accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                    options={{
                        language: 'en',
                        country: 'IN'
                    }}
                    value={fromValue}
                    onChange={(value) => {
                        setFromValue(value);
                        // console.log(value);
                    }}
                />
            </div>
            <div className='mt-3'>
                <label className='text-primaryGray'>Where To?</label>
                <SearchBox
                    accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                    options={{
                        language: 'en',
                        country: 'IN'
                    }}
                    value={toValue}
                    onChange={(value) => {
                        setToValue(value);
                        // console.log(value);
                    }}
                />
            <button onClick={handleCalculateRoute} className='bg-primaryGreen mt-2 p-2 text-white rounded-md'>Show Route</button>
            </div>
        </div>
    );
};

export default AutoCompleteAddress;