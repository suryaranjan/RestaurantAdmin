export const displayCuisine = (cuisines) => {
    let cuisineList = [];
    cuisines && cuisines.map(cuisine => {
        cuisineList.push(cuisine.cuisineName);
    })
    return cuisineList.join(', ');
}

export const firstLetterUppercase = (word) => {
    return word && word.charAt(0).toUpperCase() + word.slice(1);
}

export const displayType = (restaurant) => {
    let restaurantProps = Object.entries(restaurant);
    let typeValues = [];
    restaurantProps.map(([key, value]) => {
        if (['bar', 'dining', 'outdoorSitting', 'petFriendly', 'buffet', 'pureVeg'].includes(key) && value) {
            typeValues.push(firstLetterUppercase(key));
        }
        return [key, value];
    })
    return typeValues.join(', ')
}
