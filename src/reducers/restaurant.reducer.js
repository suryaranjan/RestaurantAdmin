import { REDUCER } from '../constants/reducerConstants';
import { cuisines, countries, categories, types, restaurantList } from '../constants/commonConstants';

const RestaurantReducer = (state = {
    restaurantList: restaurantList,
    countries: countries,
    cuisines: cuisines,
    menuCategories: categories,
    menuTypes: types
}, action) => {
    switch (action.type) {
        case REDUCER.ADD_RESTAURANT: return {
            ...state,
            restaurantList: action.restaurantList
        }
        case REDUCER.UPDATE_RESTAURANT: return {
            ...state,
            restaurantList: action.restaurantList
        }

        default:
            return state;
    }
}

export default RestaurantReducer;