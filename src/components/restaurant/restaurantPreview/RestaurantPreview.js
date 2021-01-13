import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RestaurantDetailsView from '../restaurantDetails/RestaurantDetailsView';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { firstLetterUppercase } from '../../../helpers/sharedMethod';

const RestaurantPreview = (props) => {
    const showModal = props.modalView;
    const [restaurant, setRestaurant] = useState(props.restaurant);
    const [menuItems, setMenuItems] = useState({});
    const [renderMenuItems, setRenderMenuItems] = useState('');

    const closeModal = () => {
        if (showModal) {
            props.modalClose();
        }
    }

    const displayMenuItemsCards = (value) => {
        return value.map(item => {
            return (
                <div className="item">
                    <FiberManualRecordIcon className={`${item.type.typeName}`} />
                    <p>{firstLetterUppercase(item.name)}</p>
                    <p>&#8377; {parseFloat(item.cost).toFixed(2)}</p>
                </div>
            )
        })
    }

    useEffect(() => {
        let menuItemProps = Object.entries(menuItems);
        let uiValue = menuItemProps.length > 0 ? menuItemProps.map(([key, value]) => {
            return <Accordion className="menuTypeSection">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <p>{firstLetterUppercase(key)}</p>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='menuItemsContainer'>
                        {displayMenuItemsCards(value)}
                    </div>
                </AccordionDetails>
            </Accordion >
        }) : 'No Menu Available'
        setRenderMenuItems(uiValue);
    }, [menuItems])

    useEffect(() => {
        let newMenuItemList = {};
        if (props.restaurant.menuItems && props.restaurant.menuItems.length > 0) {
            props.restaurant.menuItems.map((item) => {
                if (!item) {
                    return;
                }
                let tempItem = newMenuItemList[`${item.category.categoryName}`] ? newMenuItemList[`${item.category.categoryName}`] : [];
                tempItem.push(item);
                newMenuItemList[`${item.category.categoryName}`] = [...tempItem];
            })
            setMenuItems(newMenuItemList);
        } else {
            setMenuItems([])
        }

    }, [props.restaurant]);

    return (
        <Grid container spacing={3} className="  restaurantDetails">
            <Grid item xs={11} className="customerModalHeader">
                <h4>Restaurant Preview</h4>
            </Grid>
            <Grid item xs={1} className="customerModalHeader customerModalFormCancel">
                <CloseIcon onClick={closeModal} />
            </Grid>
            <Grid item xs={12} container elevation={3} className="restaurantDetailsContainer">
                <RestaurantDetailsView
                    restaurant={restaurant}
                />
                <Divider className="headerDivider" />
                <Grid item xs={12} className="menuHeader">
                    <p>Menu Items</p>
                </Grid>
                <Grid item xs={12} className="menuViewAccordion">
                    {renderMenuItems}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RestaurantPreview;