import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../../helpers/history';
import { ROUTES } from '../../constants/routesConstant';
import Dashboard from '../dashboard/Dashboard';
import PageNotFound from './PageNotFound';

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path={ROUTES.RESTAURANT_DASHBOARD} component={Dashboard} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    )
}

export default Routes;