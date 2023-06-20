import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

let SearchRent = ({ category, subcategories }) => {

    return (
        <Accordion flush defaultActiveKey="0">
            <Accordion.Item>
                <Accordion.Header className="text-capitalize text-medium">
                    {/* {category.name} */}
                </Accordion.Header>
                <Accordion.Body>
                    <div className="d-flex flex-column">

                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
SearchRent = React.memo(SearchRent)

export default SearchRent;