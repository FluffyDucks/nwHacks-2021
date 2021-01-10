import React, {useState} from 'react'
import Searchbar from './Searchbar'
import CountTile from './CountTile'
import PredictTile from './PredictTile'
import GraphTile from './GraphTile'

export default function Main() {

    const [selectedCountry, setSelectedCountry] = useState();

    function handleSelectCountry(e) {
        setSelectedCountry(e);
    }

    return (
        <div className="d-flex flex-column overflow-auto" style={{height: '100vh', color: "white"}}>
            <Searchbar onSelectCountry={handleSelectCountry}/><br/>
            <h4 className="text-center"> Current Totals</h4>
            <CountTile propCountry={selectedCountry}/>
            <br/>
            <h4 className="text-center"> Tomorrow's Totals (Estimated)</h4>
            <PredictTile propCountry={selectedCountry}/>
            <br/>
            <GraphTile/>
        </div>
    )
}
