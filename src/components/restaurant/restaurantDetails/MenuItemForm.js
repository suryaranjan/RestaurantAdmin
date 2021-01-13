import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import './menuItemForm.css';

const MenuItemForm = (props) => {
    const [itemForm, setItemForm] = useState({
        name: '',
        type: '',
        category: "",
        cost: ''
    })

    const handleSubmitItemForm = () => {
        let valid = checkFormValidation(itemForm, true);
        if (valid) {
            if (props.selectedMenuItem && props.selectedMenuItem.id) {
                props.updateMenuItem(itemForm);
            } else {
                props.addMenuItem(itemForm);
            }
        }
    }

    const checkFormValidation = (itemForm, submitValue) => {
        let tempItemForm = { ...itemForm };
        let valid = true;
        let tempValid = false;
        let itemFormProps = Object.entries(itemForm);
        itemFormProps.map(([key, value]) => {
            let result = [false, tempItemForm];

            if ((key.includes('Error'))) {
                return [key, value];
            }
            else {
                result = handleValidation(key, value, tempItemForm, submitValue);
            }
            tempValid = result[0];
            tempItemForm = result[1];
            if (valid && !tempValid) {
                valid = tempValid;
            }
            return [key, value];
        });
        setItemForm({ ...tempItemForm });
        return valid;
    }

    const handleInputChange = (e, type, value) => {
        let tempItemForm = { ...itemForm };
        let tempValue;
        if (type === 'name' || type === 'cost') {
            tempItemForm[type] = e.target.value;
            tempValue = e.target.value;
        } else if (type === 'category' || type === 'type') {
            tempItemForm[type] = value;
            tempValue = value;
        }
        let result = handleValidation(type, tempValue, tempItemForm, false);
        setItemForm({
            ...result[1]
        })
    }

    const handleValidation = (key, value, itemForm, submited) => {
        let valid = true;
        let tempItemForm = { ...itemForm };

        if (key === 'name' || key === 'cost') {
            if (!value && submited) {
                valid = false;
                tempItemForm[`${key}Error`] = `${key} is required`;
            } else {
                valid = true;
                tempItemForm[`${key}Error`] = ``;
            }
        } else if (key === 'category' || key === 'type') {
            if (!value && submited) {
                valid = false;
                tempItemForm[`${key}Error`] = `${key} is required`;
            } else {
                valid = true;
                tempItemForm[`${key}Error`] = ``;
            }
        }
        if (key === 'cost' && value <= 0) {
            valid = false;
            tempItemForm.costError = 'Should be greater than 0';
        }
        return [valid, tempItemForm];
    }

    useEffect(() => {
        if (props.selectedMenuItem && props.selectedMenuItem.id) {
            setItemForm({ ...props.selectedMenuItem });
        }
    }, [props.selectedMenuItem])

    return (
        <Grid container spacing={3} className='itemFormContainer'>
            <Grid item xs={11} className="customerModalHeader">
                <h4>{`${props.editMenuItem ? 'Update' : 'Add'}`} Item</h4>
            </Grid>
            <Grid item xs={1} className="customerModalHeader customerModalFormCancel">
                <CloseIcon onClick={props.modalClose} />
            </Grid>
            <Grid item xs={12} className="customerInfoEditForm customerModalInfoEdit">
                <div className="customerAddressFormBox customerModalFormBox itemForm">
                    <label >Item Name</label>
                    <TextField
                        value={itemForm.name}
                        onChange={e => handleInputChange(e, 'name')}
                        error={itemForm.nameError ? true : false}
                        helperText={itemForm.nameError}
                        variant="outlined"
                        placeholder="Item Name"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: false,
                        }}
                    />
                </div>
                <div className="customerAddressFormBox customerModalFormBox itemForm">
                    <label >Cost</label>
                    <TextField
                        value={itemForm.cost}
                        type="number"
                        onChange={e => handleInputChange(e, 'cost')}
                        error={itemForm.costError ? true : false}
                        helperText={itemForm.costError}
                        variant="outlined"
                        placeholder="Cost"
                        defaultValue=""
                        InputLabelProps={{
                            shrink: false,
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={12} className="customerInfoEditForm customerModalInfoEdit">
                <div className="customerAddressFormBox customerModalFormBox itemForm">
                    <label >Type</label>
                    <Autocomplete
                        clearOnBlur={true}
                        options={props.menuCategories}
                        getOptionLabel={(option) => option.categoryName ? option.categoryName : ''}
                        onChange={(e, value) => handleInputChange(e, 'category', value)}
                        value={itemForm.category}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Category"
                                error={itemForm.categoryError ? true : false}
                                helperText={itemForm.categoryError}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: false,
                                }}
                            />
                        )}
                    />
                </div>
                <div className="customerAddressFormBox customerModalFormBox itemForm">
                    <label >Type</label>
                    <Autocomplete
                        clearOnBlur={true}
                        options={props.menuTypes}
                        getOptionLabel={(option) => option.typeName ? option.typeName : ''}
                        onChange={(e, value) => handleInputChange(e, 'type', value)}
                        value={itemForm.type}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Type"
                                error={itemForm.typeError ? true : false}
                                helperText={itemForm.typeError}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: false,
                                }}
                            />
                        )}
                    />
                </div>
            </Grid>
            <div className="customerAddressFormButton customerModalFormButton">
                <Grid item xs={6} className="customerAddressFormBox cancelButton">
                    <Button variant="outlined" onClick={props.modalClose}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={6} className="customerAddressFormBox saveButton">
                    <Button variant="contained" onClick={handleSubmitItemForm} >
                        Save
                    </Button>
                </Grid>
            </div>

        </Grid>
    )
}

export default MenuItemForm;