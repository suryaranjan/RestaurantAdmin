import { connect } from 'react-redux';
import Action from '../action/index';
import RestaurantDetailsAdmin from '../components/restaurant/restaurantDetails/RestaurantDetailsAdmin';

const mapStateToProps = state => {
    return {
        restaurantList: state.RestaurantReducer.restaurantList
    }
}

const mapDispatchToProps = dispatch => ({
    addMenuItem: (menuItem, restaurantId, callback) => dispatch(Action.Restaurant.addMenuItem(menuItem, restaurantId, callback)),
    updateMenuItem: (menuItem, restaurantId, callback) => dispatch(Action.Restaurant.updateMenuItem(menuItem, restaurantId, callback)),
    deleteMenuItem: (menuItem, restaurantId, callback) => dispatch(Action.Restaurant.deleteMenuItem(menuItem, restaurantId, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetailsAdmin);