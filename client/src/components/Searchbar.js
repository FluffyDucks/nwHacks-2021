import React, {useRef} from 'react'
import { Form } from 'react-bootstrap'

export default function Searchbar() {
    const searchRef = useRef();
    return (
        <div className="p-2">
        <Form>
            <Form.Group>
                <Form.Control type="text" placeholder="Search City" ref={searchRef} required/>
            </Form.Group>
        </Form>
        </div>
    )
}
