import { REDUCER } from '../constants/reducerConstants';
import { Message, MessageType } from '../constants/notificationMessages';
import { store } from '../store/index';

const addRestaurant = (restaurant, callback) => {
    return (dispatch) => {
        try {
            let restaurantList = store.getState().RestaurantReducer.restaurantList;
            restaurant.id = Date.now();
            restaurant.menuItems = [];
            restaurantList.push(restaurant);
            callback(false, MessageType.success, Message.addRestaurant);
            dispatch({
                type: REDUCER.ADD_RESTAURANT,
                restaurantList: [...restaurantList]
            })
            return MessageType.success;
        } catch {
            callback(false, MessageType.error, Message.addRestaurantFail);
        }
    }
}

const updateRestaurant = (restaurant, callback) => {
    return (dispatch) => {
        try {
            let restaurantList = store.getState().RestaurantReducer.restaurantList;
            let newlist = restaurantList.map(value => {
                if (value.id == restaurant.id) {
                    return { ...restaurant };
                }
                return { ...value };
            })
            restaurantList[restaurant.id - 1] = { ...newlist };
            callback(false, MessageType.success, Message.updateRestaurant);
            dispatch({
                type: REDUCER.UPDATE_RESTAURANT,
                restaurantList: [...restaurantList]
            })
            return MessageType.success;
        } catch {
            callback(false, MessageType.error, Message.updateRestaurantFail);
        }
    }
}

const addMenuItem = (menuItem, restaurantId, callback) => {
    return dispatch => {
        try {
            let restaurantList = store.getState().RestaurantReducer.restaurantList;
            let newlist = restaurantList.map(value => {
                if (value.id == restaurantId) {
                    let menuItems = value.menuItems;
                    menuItem.id = Date.now();
                    menuItems.push(menuItem);
                    value.menuItems = [...menuItems];
                    return { ...value };
                }
                return { ...value };
            })

            callback(false, MessageType.success, Message.addMenuItem);
            dispatch({
                type: REDUCER.UPDATE_RESTAURANT,
                restaurantList: [...newlist]
            })
            return MessageType.success;
        }
        catch (e) {
            console.log("e", e)
            callback(false, MessageType.error, Message.addMenuItemFail);
        }
    }
}

const updateMenuItem = (menuItem, restaurantId, callback) => {
    return dispatch => {
        try {
            let restaurantList = store.getState().RestaurantReducer.restaurantList;
            let newlist = restaurantList.map(value => {
                if (value.id == restaurantId) {
                    let newItem = value.menuItems.map(item => {
                        if (item.id == menuItem.id) {
                            return { ...menuItem };
                        }
                        return { ...item };
                    })
                    value.menuItems = [...newItem];
                    return { ...value };
                }
                return { ...value };
            })
            callback(false, MessageType.success, Message.updateMenuItem);
            dispatch({
                type: REDUCER.UPDATE_RESTAURANT,
                restaurantList: [...newlist]
            })
            return MessageType.success;
        }
        catch (e) {
            console.log("e", e)
            callback(false, MessageType.error, Message.updateMenuItemFail);
        }
    }
}

const deleteMenuItem = (menuItem, restaurantId, callback) => {
    return dispatch => {
        try {
            let restaurantList = store.getState().RestaurantReducer.restaurantList;
            let newlist = restaurantList.map(value => {
                if (value.id == restaurantId) {
                    let index;
                    let newItem = value.menuItems.map((item, key) => {
                        if (item.id == menuItem.id) {
                            index = key
                            return { ...item };
                        }
                        return { ...item };
                    })
                    if (index >= 0) {
                        newItem.splice(index, 1);
                    }
                    value.menuItems = [...newItem];
                    return { ...value };
                }
                return { ...value };
            })
            callback(false, MessageType.success, Message.deletedMenuItem);
            dispatch({
                type: REDUCER.UPDATE_RESTAURANT,
                restaurantList: [...newlist]
            })
            return MessageType.success;
        }
        catch {
            callback(false, MessageType.error, Message.deletedMenuItemFail);
        }
    }
}


const Restaurant = {
    addRestaurant,
    updateRestaurant,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
}

export default Restaurant;