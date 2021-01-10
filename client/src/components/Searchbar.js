import React, {useState} from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

export default function Searchbar() {
    const [singleSelections, setSingleSelections] = useState([]);

    return (
        <div className="p-2">
            <Typeahead id="basic-typeahead-single" labelKey="name" placeholder="Choose a country" onChange={setSingleSelections} options={["Canada", "USA", "Mexico"]} selected={singleSelections}/>
        </div>
    )
}
