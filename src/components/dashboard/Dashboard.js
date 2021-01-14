import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { ROUTES } from '../../constants/routesConstant';
import { Switch, Route, Router } from "react-router-dom";
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import history from '../../helpers/history';
import RestaurantDashboard from '../restaurant/RestaurantDashboard';
import RestaurantDetailsContainer from '../../containers/restaurantDetailsContainer';
import './dashboard.css';
import PageNotFound from '../routes/PageNotFound';

const Dashboard = (props) => {

    return (
        <div className="mainContainer">
            <Navbar />
            <div className="dashboardBox">
                <Container maxWidth="xl" className="dashboardContainer" >
                    <Router history={history}>
                        <Switch>
                            <Route exact path={ROUTES.RESTAURANT_DASHBOARD} component={RestaurantDashboard} />
                            <Route path={`${ROUTES.RESTAURANT_DETAILS}/:restaurantId`} component={RestaurantDetailsContainer} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Router>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;