import { connect } from 'react-redux';
import Action from '../action/index';
import MenuItemForm from '../components/restaurant/restaurantDetails/MenuItemForm';

const mapStateToProps = state => {
    return {
        menuCategories: state.RestaurantReducer.menuCategories,
        menuTypes: state.RestaurantReducer.menuTypes,
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemForm);