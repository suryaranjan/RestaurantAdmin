import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Divider from '@material-ui/core/Divider';
import RestaurantDetailsView from './RestaurantDetailsView';
import history from '../../../helpers/history';
import RestaurantPreview from '../restaurantPreview/RestaurantPreview';
import { useHistory, Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routesConstant';
import SnackbarAlert from '../../sharedComponent/Snackbar';
import './restaurantDetails.css';
import MenuItemFormContainer from '../../../containers/menuItemFormContainer';
import { MessageType } from '../../../constants/notificationMessages';
import MenuItemListView from './MenuItemListView';

const RestaurantDetailsAdmin = (props) => {
    const [showMenuItemForm, setShowMenuItemForm] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        type: '',
        message: ''
    })
    const [restaurant, setRestaurant] = useState({});

    const handleMenuItemForm = () => {
        setShowMenuItemForm(!showMenuItemForm);
        setSelectedMenuItem({});
    }

    const addMenuItem = (itemForm) => {
        let result = props.addMenuItem(itemForm, restaurant.id, handleNotification);
        if (result === MessageType.success) {
            setShowMenuItemForm(false);
        }
    }

    const updateMenuItem = (itemForm) => {
        let result = props.updateMenuItem(itemForm, restaurant.id, handleNotification);
        if (result === MessageType.success) {
            setShowMenuItemForm(false);
            setSelectedMenuItem({});
        }
    }

    const handleNotification = (close, type, message) => {
        let snackbar = {};
        if (close) {
            snackbar = {
                open: false,
                type: '',
                message: ''
            }
        } else {
            snackbar = {
                open: true,
                type: type,
                message: message
            }

        }

        setSnackbar({ ...snackbar });
    }

    useEffect(() => {
        let restaurantId = props.match.params.restaurantId;
        let restaurant = props.restaurantList.filter(r => r.id == restaurantId)[0];
        if (restaurant) {
            setRestaurant(restaurant);
        } else {
            history.push('not defined');
        }

    }, [props.restaurantList])

    const editMenuItem = (value) => {
        setShowMenuItemForm(true);
        setSelectedMenuItem(value);
    }

    const deleteMenuItem = (value) => {
        props.deleteMenuItem(value, restaurant.id, handleNotification);
    }
    const redirecting = (e) => {
        e.stopPropagation();
        // history.push('/');
    }

    const handleCloseRestaurantPreview = () => {
        setShowPreview(!showPreview);
    }

    return (
        <>

            {snackbar.open ?
                <SnackbarAlert
                    snackbar={snackbar}
                    handleShowNotification={handleNotification}
                >
                </SnackbarAlert> : ''
            }
            {showPreview ?
                <RestaurantPreview
                    modalView={showPreview}
                    restaurant={{ ...restaurant }}
                    modalClose={handleCloseRestaurantPreview}
                /> :

                <Grid container spacing={3} className="restaurantDetails">
                    <Grid item xs={6} >
                        <Link to={ROUTES.RESTAURANT_DASHBOARD}  >
                            <div className="headerButton" onClick={(e) => redirecting(e)}>
                                <KeyboardBackspaceIcon /><p>Back To List</p>
                            </div>
                        </Link>
                    </Grid>
                    <Grid item xs={6} className="headerButton saveButton" >
                        <Button variant="contained" onClick={handleCloseRestaurantPreview}>Preview Restaurant</Button>
                    </Grid>
                    <Grid item xs={12} container elevation={3} className="restaurantDetailsContainer">
                        <RestaurantDetailsView
                            restaurant={restaurant}
                        />
                        <Divider className="headerDivider" />
                        <Grid item xs={6} className="menuHeader">
                            <p>Menu Items</p>
                        </Grid>
                        <Grid item xs={6} className="menuHeader saveButton">
                            <Button variant="contained" onClick={handleMenuItemForm}>Add Menu items</Button>
                            {showMenuItemForm ?
                                <MenuItemFormContainer
                                    modalClose={handleMenuItemForm}
                                    addMenuItem={addMenuItem}
                                    updateMenuItem={updateMenuItem}
                                    selectedMenuItem={selectedMenuItem}
                                /> : ''}
                        </Grid>
                        <Grid item xs={12} className="menuItems">
                            <MenuItemListView
                                menuItems={restaurant.menuItems ? [...restaurant.menuItems] : []}
                                editMenuItem={editMenuItem}
                                deleteMenuItem={deleteMenuItem}
                            />
                        </Grid>
                    </Grid>

                </Grid>
            }
        </>
    )
}

export default RestaurantDetailsAdmin;