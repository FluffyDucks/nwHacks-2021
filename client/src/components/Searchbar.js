import React, {useState, useEffect} from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'

export default function Searchbar({onSelectCountry}) {
    const [singleSelections, setSingleSelections] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/api/countries')
        .then(res => res.json())
        .then(
            (result) => {
                setItems(result);
            },       
            (error) => {
            }
        );
    }, []);

    function handleSearchChange(countryRef) {
        console.log(countryRef);
        setSingleSelections(countryRef);
        var country = countryRef;
        onSelectCountry(country);
    }

    return (
        <div className="p-2">
            <Typeahead id="basic-typeahead-single" labelKey="name" placeholder="Choose a country" onChange={handleSearchChange} options={items.map(item => (item.Country))} selected={singleSelections}/>
        </div>
    )
}
