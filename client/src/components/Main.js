import React from 'react'
import Searchbar from './Searchbar'
import Sidebar from './Sidebar'
import CountTile from './CountTile'
import GraphTile from './GraphTile'
import ML from './MachineLearningTile'
import Map from './MapTile'

export default function Main() {
    return (
        <div className="d-flex flex-column overflow-auto" style={{height: '100vh'}}>
            <Sidebar/>
            <Searchbar/>
            <CountTile/>
            <br/>
            <GraphTile/>
            <br/>
            <ML/>
            <br/>
            <Map/>
        </div>
    )
}
