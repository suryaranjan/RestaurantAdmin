import { connect } from 'react-redux';
import Action from '../action/index';
import RestaurantList from '../components/restaurant/RestaurantList';

const mapStateToProps = state => {
    return {
        restaurantList: state.RestaurantReducer.restaurantList
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);