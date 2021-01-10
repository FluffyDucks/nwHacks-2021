import React, {useState, useEffect} from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

export default function Searchbar() {
    const [singleSelections, setSingleSelections] = useState([]);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/test')
        .then(res => res.json())
        .then(
            (result) => {
                setItems(result);
            },       
            (error) => {
                setError(true);
            }
        );
    }, []);

    return (
        <div className="p-2">
            <Typeahead id="basic-typeahead-single" labelKey="name" placeholder="Choose a country" onChange={setSingleSelections} options={items.map(item => (item.Country))} selected={singleSelections}/>
        </div>
    )
}
