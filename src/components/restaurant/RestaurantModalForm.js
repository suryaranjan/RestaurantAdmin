import React, { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import ModalCloseHelper from '../sharedComponent/ModalCloseHelper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import AdvancePhoneNumber from '../sharedComponent/AdvancePhoneNumber';
import './restaurantModalForm.css';
import { emailRegexExpression } from '../../constants/commonConstants';
import { MessageType } from '../../constants/notificationMessages';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const RestaurantModalForm = (props) => {
    const wrapperRef = useRef(null);
    const modalRef = useRef(null);
    const [restaurantForm, setRestaurantForm] = useState({
        name: '',
        cuisines: [],
        rating: 0,
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        averageCost: '',
        email: '',
        phoneNumber: '',
        description: '',
        bar: false,
        buffet: false,
        dining: false,
        pureVeg: false,
        petFriendly: false,
        outdoorSitting: false
    })
    const showModal = props.modalView;
    const closeModal = () => {
        if (showModal) {
            props.modalClose();
        }
    }

    const handleCheckboxChange = (e, type) => {
        setRestaurantForm({
            ...restaurantForm,
            [type]: e.target.checked
        })
    }

    const handleInputChange = (e, type, country) => {
        let tempRestaurantForm = { ...restaurantForm };
        let value = type === 'phoneNumber' ? e : e.target.value;
        if ((type !== 'phoneNumber' && e.target.value === ' ') || e === ' ') {
            return;
        }
        tempRestaurantForm[type] = value;
        if (type === 'phoneNumber') {
            tempRestaurantForm.phoneCountry = country;
        }

        let result = handleTextValidation(type, value, tempRestaurantForm, false, tempRestaurantForm.phoneCountry);

        tempRestaurantForm = result[1];
        setRestaurantForm({
            ...tempRestaurantForm
        });
    }

    const handleTextValidation = (key, value, tempRestaurantForm, submited, country) => {
        let valid = false;
        if (submited && value === '') {
            valid = false;
            tempRestaurantForm = {
                ...tempRestaurantForm,
                [`${key}Error`]: `${key.split(/(?=[A-Z])/).join(" ")} Required`.replace("Id", " ")
            }
        } else {
            valid = true;
            tempRestaurantForm = {
                ...tempRestaurantForm,
                [`${key}Error`]: ''
            }
        }
        if (key === 'phoneNumber' && value !== '') {
            let phNumber = value;
            let countryCode = country.dialCode;
            phNumber = phNumber.replace(/[^0-9]/g, '');
            phNumber = phNumber.replace(countryCode, '');
            if (phNumber.length < 10 || phNumber.length >= 11) {
                valid = false;
                tempRestaurantForm.phoneNumberError = 'Phone Number is not valid';
            }
        }
        if ((key === 'name') && value !== '') {
            if (value.length < 1 || value.length > 30) {
                valid = false;
                tempRestaurantForm[`${key}Error`] = `${key} must be between 4 to 20 characters`;
            }
        }
        if ((key === 'address1') && value !== '') {
            if (value.length < 1 || value.length > 30) {
                valid = false;
                tempRestaurantForm[`${key}Error`] = `${key} must be between 5 to 50 character`;
            }
        }
        if (key === 'address2' && value !== '') {
            if (value.length < 1 || value.length > 50) {
                valid = false;
                tempRestaurantForm[`${key}Error`] = `${key} must be between 5 to 50 character`;
            } else {
                valid = true;
                tempRestaurantForm[`${key}Error`] = ``;
            }
        }
        if (key === 'city' && value !== '') {
            if (value.length < 1 || value.length > 30) {
                valid = false;
                tempRestaurantForm[`${key}Error`] = `${key} must be between 3 to 50 character`;
            }
        }
        if (key === 'email' && value !== '') {
            let res = emailRegexExpression;
            if (!res.test(value)) {
                valid = false;
                tempRestaurantForm = {
                    ...tempRestaurantForm,
                    emailError: 'Proper Email Required'
                }
            }
        }
        if ((key === 'province' && value === '') || key === 'state') {
            if (value.length <= 0) {
                valid = false;
                tempRestaurantForm.stateError = 'State/Province is required';
            } else if (value.length < 1 || value.length > 30) {
                valid = false;
                tempRestaurantForm.stateError = 'State/Province mudt between 5 to 50 character';
            }
        }
        return [valid, tempRestaurantForm];
    }

    const handleCusisineSelectChange = (e, value) => {
        let tempRestaurantForm = { ...restaurantForm }
        let cuisinesId = [];
        let cuisines = [];
        if (value.length > 0) {
            value.map(val => {
                cuisinesId.push(val.cuisineId);
                cuisines.push(val)
                return val;
            })
        }
        tempRestaurantForm.cuisineId = cuisinesId;
        tempRestaurantForm.cuisines = cuisines;

        let result = handleDropDownValidation('cuisineId', tempRestaurantForm.cuisineId, tempRestaurantForm, false);
        tempRestaurantForm = result[1];
        setRestaurantForm({
            ...tempRestaurantForm
        });
    }

    const handleDropDownValidation = (key, value, tempRestaurantForm, submited) => {
        let valid = false;
        if (key === 'country') {
            if (!value) {
                valid = false;
                tempRestaurantForm.countryError = 'country required'
            } else {
                valid = true;
                tempRestaurantForm.countryError = ''
            }
        }

        return [valid, tempRestaurantForm];
    }

    const handleNumericInputChange = (e, type) => {
        let tempRestaurantForm = { ...restaurantForm };
        let value = parseInt(e.target.value);
        if ((type === 'postalCode' || type === 'rating') && isNaN(e.target.value)) {
            return;
        }
        if (type === 'rating' && e.target.value > 5) {
            return;
        }
        tempRestaurantForm[type] = e.target.value;
        let result = handleNumericValidation(type, parseInt(value), tempRestaurantForm, false)
        tempRestaurantForm = result[1];

        setRestaurantForm({
            ...tempRestaurantForm
        });
    }

    const handleNumericValidation = (key, value, tempRestaurantForm, submited) => {
        let valid = false;
        if (submited && (!parseInt(value) || parseInt(value) <= 0)) {
            valid = false;
            tempRestaurantForm = {
                ...tempRestaurantForm,
                [`${key}Error`]: `${key.split(/(?=[A-Z])/).join(" ")} Required`.replace("Id", " ")
            }
        } else if (!parseInt(value) || parseInt(value) <= 0) {
            valid = false;
            tempRestaurantForm = {
                ...tempRestaurantForm,
                [`${key}Error`]: key === 'PostalCode' ? '' : `Should be greater than 0`
            }
        } else {
            valid = true;
            tempRestaurantForm = {
                ...tempRestaurantForm,
                [`${key}Error`]: ``
            }
        }
        if (key === 'postalCode' && (value.toString().length < 4 || value.toString().length > 20)) {
            valid = false;
            tempRestaurantForm.postalCodeError = 'Should be between 5 to 20 character';
        }
        return [valid, tempRestaurantForm];
    }

    const handleDropdownChange = (e, value, type) => {
        let tempRestaurantForm = { ...restaurantForm };
        tempRestaurantForm.countryError = '';
        if (type === 'country') {
            tempRestaurantForm.phoneCountry = {
                countryCode: value ? (value.code ? value.code : '') : ''
            }
            tempRestaurantForm.country = value;
        }
        let result = handleDropDownValidation(`${type}Id`, value, tempRestaurantForm, false)
        tempRestaurantForm = result[1];
        setRestaurantForm({
            ...tempRestaurantForm
        });
    }

    const restaurantFormValidation = (restaurant, submitValue) => {
        let tempRestaurantForm = { ...restaurant };
        let valid = true;
        let tempValid = false;
        let restaurantProps = Object.entries(restaurant);
        restaurantProps.map(([key, value]) => {
            let result = [false, tempRestaurantForm];
            if (key === 'buffet' || key === 'bar' || key === 'dining' || key === 'petFriendly'
                || key === 'outdoorSitting' || key === 'pureVeg' || key === 'phoneCountry' || key === 'cuisines') {
                return [key, value];
            }
            if ((key.includes('Error'))) {
                return [key, value];
            }
            if (key === 'address2') {
                if (value !== '') {
                    result = handleTextValidation(key, value, tempRestaurantForm, submitValue, tempRestaurantForm.phoneCountry);
                } else {
                    return [key, value];
                }
            }
            else if (key === 'name' || key === 'address1' || key === 'province' || key === 'description'
                || key === 'city' || key === 'email' || key === 'phoneNumber' || key === 'state') {
                result = handleTextValidation(key, value, tempRestaurantForm, submitValue, tempRestaurantForm.phoneCountry);
            } else if (key === 'country') {
                result = handleDropDownValidation(key, value, tempRestaurantForm, submitValue);
            } else {
                result = handleNumericValidation(key, value, tempRestaurantForm, submitValue);
            }
            tempValid = result[0];
            tempRestaurantForm = result[1];
            if (valid && !tempValid) {
                valid = tempValid;
            }
            return [key, value];
        });
        setRestaurantForm({ ...tempRestaurantForm });
        return valid;
    }

    const handleSubmitRestaurantForm = () => {
        let valid = restaurantFormValidation(restaurantForm, true);
        if (valid) {
            let result = false;
            let countryCode = restaurantForm.phoneCountry.dialCode;
            let phNumber = restaurantForm.phoneNumber;
            let newPhNumber;
            phNumber = phNumber.replace(/[^0-9]/g, '');
            phNumber = phNumber.replace(countryCode, '');
            newPhNumber = `+${countryCode}-${phNumber}`;
            restaurantForm.phoneNumber = newPhNumber;
            if (props.editRestaurant) {
                result = props.updateRestaurant(restaurantForm, props.handleNotification);
            } else {
                result = props.addRestaurant(restaurantForm, props.handleNotification);
            }
            if (result === MessageType.success) {
                props.modalClose();
            }
        }
    }

    useEffect(() => {
        if (props.selectedRestaurant && props.selectedRestaurant.id) {
            let restaurant = props.selectedRestaurant;
            if (restaurant.phoneCountry) {
                let countryCode = restaurant.phoneCountry.dialCode;
                let phNumber = restaurant.phoneNumber;
                let newPhNumber;
                phNumber = phNumber.replace(/[^0-9]/g, '');
                phNumber = phNumber.replace(countryCode, '');
                newPhNumber = `+${countryCode}-${phNumber}`;
                restaurant.phoneNumber = newPhNumber;
            }
            setRestaurantForm({ ...restaurant });
        }
    }, [props.editRestaurant])
    ModalCloseHelper(wrapperRef, modalRef, closeModal);
    return (
        <div className="customerModalFormContainer" ref={wrapperRef} style={{ display: showModal ? 'block' : 'none' }}>
            <Grid container spacing={3} backdrop="true" ref={modalRef} keyboard="true" className="customerInfoContainer customerModalForm">
                <Grid item xs={11} className="customerModalHeader">
                    <h4>{`${props.editRestaurant ? 'Update' : 'Add'}`} Restaurant</h4>
                </Grid>
                <Grid item xs={1} className="customerModalHeader customerModalFormCancel">
                    <CloseIcon onClick={closeModal} />
                </Grid>
                <Divider className="headerDivider" />
                <Grid item xs={12} className="customerInfoHeader customerModalSubHeader">
                    Identification
                </Grid>
                <Grid item xs={12} className="customerInfoEditForm customerModalInfoEdit">
                    <div className="customerAddressFormBox customerModalFormBox customerName">
                        <label >Restaurant Name</label>
                        <TextField
                            value={restaurantForm.name}
                            onChange={e => handleInputChange(e, 'name')}
                            error={restaurantForm.nameError ? true : false}
                            helperText={restaurantForm.nameError}
                            variant="outlined"
                            placeholder="Restaurant Name"
                            defaultValue=""
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                    </div>
                    <div className="customerAddressFormBox productInventoryForm partnerForm">
                        <label >Cuisines</label>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={props.cuisines}
                            value={[...restaurantForm.cuisines]}
                            onChange={(e, value) => handleCusisineSelectChange(e, value)}
                            clearOnBlur={true}
                            getOptionLabel={(cuisine) => cuisine.cuisineName ? cuisine.cuisineName : ''}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.cuisineName}
                                </React.Fragment>
                            )}
                            style={{ width: 400 }}
                            renderInput={(params) => (
                                <TextField
                                    error={restaurantForm.cuisineIdsError ? true : false}
                                    helperText={restaurantForm.cuisineIdsError}
                                    {...params}
                                    variant="outlined"
                                    placeholder="Cuisines"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="customerAddressFormBox customerModalFormBox">
                        <label >Rating</label>
                        <TextField
                            variant="outlined"
                            type='number'
                            placeholder="Rating"
                            onChange={(e) => handleNumericInputChange(e, 'rating')}
                            value={restaurantForm.rating}
                            error={restaurantForm.ratingError ? true : false}
                            helperText={restaurantForm.ratingError}
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                    </div>
                    <div className="customerAddressFormBox customerModalFormBox">
                        <label >Average Cost For 2</label>
                        <TextField
                            variant="outlined"
                            type='number'
                            placeholder="Average cost"
                            onChange={(e) => handleNumericInputChange(e, 'averageCost')}
                            value={restaurantForm.averageCost}
                            error={restaurantForm.averageCostError ? true : false}
                            helperText={restaurantForm.averageCostError}
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} className="customerInfoEditForm">
                    <div className="customerAddressFormBox customerModalFormBox customerDescription">
                        <label >Description</label>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Description"
                            value={restaurantForm.description}
                            onChange={(e) => handleInputChange(e, 'description')}
                        />
                        {restaurantForm.descriptionError ? <p className="error">{restaurantForm.descriptionError}</p> : ''}
                    </div>
                </Grid>
                <Grid item xs={12} className="customerInfoEditForm">
                    <div className="userModalFormCheckBox">
                        <Checkbox
                            onChange={e => handleCheckboxChange(e, 'bar')}
                            checked={restaurantForm.bar}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            name="checked" />
                        <label>Bar</label>
                    </div>
                    <div className="userModalFormCheckBox">
                        <Checkbox
                            onChange={e => handleCheckboxChange(e, 'buffet')}
                            checked={restaurantForm.buffet}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            name="checked" />
                        <label>Buffet</label>
                    </div>
                    <div className="userModalFormCheckBox">
                        <Checkbox
                            onChange={e => handleCheckboxChange(e, 'dining')}
                            checked={restaurantForm.dining}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            name="checked" />
                        <label>Dining</label>
                    </div>
                    {/* <div className="userModalFormCheckBox">
                        <Checkbox
                            onChange={e => handleCheckboxChange(e, 'cuisine')}
                            checked={restaurantForm.cuisine}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            name="checked" />
                        <label>Cuisine</label>
                    </div> */}
                    <div className="userModalFormCheckBox">
                        <Checkbox
                            onChange={e => handleCheckboxChange(e, 'pureVeg')}
                            checked={restaurantForm.pureVeg}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            name="checked" />
                        <label>Pure Veg</label>
                    </div>
                    <div className="userModalFormCheckBox">
                        <Checkbox
                            onChange={e => handleCheckboxChange(e, 'petFriendly')}
                            checked={restaurantForm.petFriendly}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            name="checked" />
                        <label>Pet Friendly</label>
                    </div>
                    <div className="userModalFormCheckBox">
                        <Checkbox
                            onChange={e => handleCheckboxChange(e, 'outdoorSitting')}
                            checked={restaurantForm.outdoorSitting}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            name="checked" />
                        <label>Outdoor Sitting</label>
                    </div>
                </Grid>
                <Divider className="generalDivider" />
                <Grid item xs={12} className="customerInfoHeader customerModalSubHeader">
                    Address
                </Grid>
                <Grid item xs={12} className="customerInfoEditForm">
                    <div className="customerAddressFormBox customerModalFormBox customerFormAddress1">
                        <label >Address 1</label>
                        <TextField
                            onChange={(e) => handleInputChange(e, 'address1')}
                            value={restaurantForm.address1}
                            error={restaurantForm.address1Error ? true : false}
                            helperText={restaurantForm.address1Error}
                            type="text"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: false,
                            }}
                            placeholder="Address 1"
                        />
                    </div>
                    <div className="customerAddressFormBox customerModalFormBox customerFormAddress1">
                        <label >Address 2</label>
                        <TextField
                            onChange={(e) => handleInputChange(e, 'address2')}
                            value={restaurantForm.address2}
                            type="text"
                            error={restaurantForm.address2Error ? true : false}
                            helperText={restaurantForm.address2Error}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: false,
                            }}
                            placeholder="Address 2"
                        />
                    </div>
                    <div className="customerAddressFormBox country customerModalFormBox">
                        <label >Country</label>
                        <Autocomplete
                            clearOnBlur={true}
                            options={props.countries}
                            getOptionLabel={(option) => option.label ? option.label : ''}
                            onChange={(e, value) => handleDropdownChange(e, value, 'country')}
                            value={restaurantForm.country}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Country"
                                    error={restaurantForm.countryError ? true : false}
                                    helperText={restaurantForm.countryError}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="customerAddressFormBox customerModalFormBox customerFormAddress1">
                        <label >State/Province</label>
                        <TextField
                            onChange={(e) => handleInputChange(e, 'state')}
                            value={restaurantForm.state}
                            error={restaurantForm.stateError ? true : false}
                            helperText={restaurantForm.stateError}
                            type="text"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: false,
                            }}
                            placeholder="State/Province"
                        />
                    </div>

                </Grid>
                <Grid item xs={12} className="customerModalFormAddressSection">
                    <div className="customerAddressFormBox customerModalFormBox city">
                        <label >City</label>
                        <TextField
                            variant="outlined"
                            placeholder="City"
                            onChange={(e) => handleInputChange(e, 'city')}
                            value={restaurantForm.city}
                            error={restaurantForm.cityError ? true : false}
                            helperText={restaurantForm.cityError}
                            defaultValue=""
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                    </div>
                    <div className="customerAddressFormBox customerModalFormBox">
                        <label >Postal Code</label>
                        <TextField
                            variant="outlined"
                            placeholder="Postal Code"
                            onChange={(e) => handleNumericInputChange(e, 'postalCode')}
                            value={restaurantForm.postalCode}
                            error={restaurantForm.postalCodeError ? true : false}
                            helperText={restaurantForm.postalCodeError}
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                    </div>
                </Grid>
                <Divider className="generalDivider" />
                <Grid item xs={12} className="customerInfoHeader customerModalSubHeader">
                    Contact
                </Grid>
                <Grid item xs={6} className="customerInfoEditForm contactForm">
                    <div className="customerAddressFormBox customerModalFormBox customerFormAddress1">
                        <label >Email Address</label>
                        <TextField
                            onChange={(e) => handleInputChange(e, 'email')}
                            value={restaurantForm.email}
                            error={restaurantForm.emailError ? true : false}
                            helperText={restaurantForm.emailError}
                            type="text"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: false,
                            }}
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="customerAddressFormBox customerModalFormBox customerFormAddress1 phoneNumber">
                        <label >Phone Number</label>
                        <AdvancePhoneNumber
                            defaultCountry={restaurantForm.phoneCountry}
                            phoneNumber={restaurantForm.phoneNumber}
                            onChange={(number, country) => handleInputChange(number, 'phoneNumber', country)}
                        />
                        {restaurantForm.phoneNumberError ? <p className="phoneError error">{restaurantForm.phoneNumberError}</p> : ''}
                    </div>
                </Grid>
                <div className="customerAddressFormButton customerModalFormButton">
                    <Grid item xs={6} className="customerAddressFormBox cancelButton">
                        <Button variant="outlined" onClick={props.modalClose}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6} className="customerAddressFormBox saveButton">
                        <Button variant="contained" onClick={handleSubmitRestaurantForm} >
                            Save
                        </Button>
                    </Grid>
                </div>
            </Grid>
        </div>
    )
}

export default RestaurantModalForm;