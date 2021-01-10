import React, {useState} from 'react'
import Searchbar from './Searchbar'
import CountTile from './CountTile'
import GraphTile from './GraphTile'
import ML from './MachineLearningTile'

export default function Main() {

    const [selectedCountry, setSelectedCountry] = useState();

    function handleSelectCountry(e) {
        setSelectedCountry(e);
    }

    return (
        <div className="d-flex flex-column overflow-auto" style={{height: '100vh', color: "white"}}>
            <Searchbar onSelectCountry={handleSelectCountry}/><br/>
            <CountTile propCountry={selectedCountry}/>
            <br/>
            <GraphTile/>
            <br/>
            <ML/>
        </div>
    )
}
