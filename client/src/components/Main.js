import React from 'react'
import Searchbar from './Searchbar'
import Sidebar from './Sidebar'

export default function Main() {
    return (
        <div className="d-flex flex-column" style={{height: '100vh'}}>
            <Sidebar/>
            <Searchbar/>
        </div>
    )
}
