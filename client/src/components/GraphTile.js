import React from 'react'
import someGraph from '../Canada-Confirmed.png'

export default function GraphTile() {
    return (
        <div className="mx-auto p-2" style={{width: "90vw", height: "400px"}}>
            <img className="img-fluid img-thumbnail" src={someGraph} alt="graph" style={{background: "none"}}></img>
        </div>
    )
}
