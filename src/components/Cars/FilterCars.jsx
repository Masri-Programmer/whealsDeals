import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux'
import { setSubCategoriesIds } from '@slices';

let FilterCars = ({ category, subCat, setSubCat }) => {
    const dispatch = useDispatch();
    const { subcategories, subcategoriesIds } = useSelector((state) => state.cars);

    const handleSubcategoriesChange = (e, subId, catId) => {
        const selected = subCat[catId] || [];
        if (e.target.checked) {
            setSubCat({ ...subCat, [catId]: [...selected, subId] });
            dispatch(setSubCategoriesIds([...subcategoriesIds, subId]));
        } else {
            dispatch(setSubCategoriesIds(subcategoriesIds.filter(id => id !== subId)));
            if (selected.includes(subId)) {
                setSubCat({
                    ...subCat,
                    [catId]: selected.filter((option) => option !== subId),
                });
            }
        }
    };


    const filteredSubcategories = subcategories?.filter((subCategory) => {
        return subCategory.r_category_id === category.id;
    });

    const isSubChecked = (id) => {
        return subcategoriesIds.includes(id);
    }
    return (
        <div>
            {category && (
                <Accordion flush defaultActiveKey="0">
                    <Accordion.Item>
                        <Accordion.Header className="text-capitalize text-medium">
                            {category.name}
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="d-flex flex-column">
                                {filteredSubcategories && filteredSubcategories.map((subCategory) => (
                                    <div key={subCategory.id}>
                                        <Form.Check
                                            className="mx-2 checkboxes"
                                            type="checkbox"
                                            id={subCategory.id}
                                            label={
                                                <>
                                                    <div className="text-regular text-capitalize">
                                                        {subCategory.name}
                                                    </div>
                                                </>
                                            }
                                            checked={isSubChecked(subCategory.id)}
                                            onChange={(e) => { handleSubcategoriesChange(e, subCategory.id, category.id) }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )}
        </div>
    );
}
FilterCars = React.memo(FilterCars)

export default FilterCars;