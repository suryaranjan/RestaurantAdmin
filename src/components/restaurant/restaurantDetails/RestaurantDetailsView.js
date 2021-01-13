import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { displayCuisine, displayType, firstLetterUppercase } from '../../../helpers/sharedMethod';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import { Button, Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import StarRateIcon from '@material-ui/icons/StarRate';

const RestaurantDetailsView = ({ restaurant }) => {
    return (
        <>
            <Grid item xs={9} className="headerName">
                <p >{firstLetterUppercase(restaurant.name)}</p>
            </Grid>
            <Grid item xs={2} className="headerRating">
                <Button>{restaurant.rating}<StarRateIcon /></Button>
            </Grid>
            <Grid item xs={12} className="cuisines">
                <LocalAtmIcon />
                <p >&#8377; {restaurant.averageCost} for 2</p>
                <div className="verticalLine"></div>
                <p>{displayCuisine(restaurant.cuisines)}</p>
            </Grid>
            <Grid item xs={12} className="location">
                <LocationOnIcon />
                <p>{firstLetterUppercase(restaurant.address1)}</p>
                <div className="verticalLine"></div>
                {restaurant.address2 ?
                    <><p>{restaurant.address2}</p>
                        <div className="verticalLine"></div></>
                    : ''}
                <p>{firstLetterUppercase(restaurant.city)}</p>
                <div className="verticalLine"></div>
                <p>{firstLetterUppercase(restaurant.state)}</p>
                <div className="verticalLine"></div>
                <p>{restaurant.country && firstLetterUppercase(restaurant.country.label)}</p>
            </Grid>
            <Grid item xs={12} className="contact location">
                <ContactSupportIcon />
                <p>{restaurant.phoneNumber}</p>
                <div className="verticalLine"></div>
                <p>{restaurant.email}</p>
            </Grid>
            <Divider className="headerDivider" />
            <Grid item xs={12} className="subHeader">
                <p>About</p>
            </Grid>
            <Grid item xs={12} className="about">
                <p>{restaurant.description}</p>
            </Grid>
            <Grid item xs={12} className="details">
                <RestaurantIcon />
                <div className='subDetails'>
                    <p>Cuisines</p>
                    <span>{displayCuisine(restaurant.cuisines)}</span>
                </div>
            </Grid>
            <Grid item xs={12} className="details">
                <LocalDiningIcon />
                <div className='subDetails'>
                    <p>Type</p>
                    <span>{displayType(restaurant)}</span>
                </div>
            </Grid>
            <Grid item xs={12} className="details">
                <LocalAtmIcon />
                <div className='subDetails'>
                    <p>Average Cost</p>
                    <span>&#8377; {restaurant.averageCost} for 2</span>
                </div>
            </Grid>
            {/* <Grid item xs={12} className="details">
                <ShowChartIcon />
                <div className='subDetails'>
                    <p>Best Selling Item</p>
                    <span>{displayBestSellingItem(restaurant)}</span>
                </div>
            </Grid> */}
        </>
    )
}

export default RestaurantDetailsView;