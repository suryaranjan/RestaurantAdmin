import { connect } from 'react-redux';
import Action from '../action/index';
import RestaurantModalForm from '../components/restaurant/RestaurantModalForm';

const mapStateToProps = state => {
    return {
        states: state.RestaurantReducer.states,
        countries: state.RestaurantReducer.countries,
        cuisines: state.RestaurantReducer.cuisines,
    }
}

const mapDispatchToProps = dispatch => ({
    addRestaurant: (restaurant, callback) => dispatch(Action.Restaurant.addRestaurant(restaurant, callback)),
    updateRestaurant: (restaurant, callback) => dispatch(Action.Restaurant.updateRestaurant(restaurant, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantModalForm);