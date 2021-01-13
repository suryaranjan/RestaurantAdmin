import React from 'react';
import { pageNotFoundImage, errorIcon } from '../../constants/icons';
import Divider from '@material-ui/core/Divider';
import './pageNotFound.css';

const PageNotFound = () => {
    return (
        <div className="pageNotFound">
            <div className="pageNotFoundIcons">
                {pageNotFoundImage}
                {errorIcon}
            </div>
            <p>Uh-Oh! We could’nt find the page you were looking for.
Not sure how you landed here?</p>
            <Divider className="paymentModalHeader" />
            <label>Contacts</label>
            <div className='contacts'>
                <span>Restaurant Horizons, 669 W 900 N,
North Salt Lake, UT 84054</span>
                <div className="verticalLine"></div>
                <span>(888) 222-2956</span>
                <div className="verticalLine"></div>
                <span>contactsupport@restauranHorizon.com</span>
            </div>
        </div>
    )
}

export default PageNotFound;