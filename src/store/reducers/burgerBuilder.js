import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.6
};

const initialState = {
	ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
      const newIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1} 
      const updatedIngredients = updateObject(state.ingredients, newIngredient)
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true

      }
			return updateObject(state, updatedState);
		case actionTypes.REMOVE_INGREDIENT:
			const newIngredientRemove = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1} 
      const updatedIngredientsRemove = updateObject(state.ingredients, newIngredientRemove)
      const updatedStateRemove = {
        ingredients: updatedIngredientsRemove,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
			return updateObject(state, updatedStateRemove);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        building: false,
        error: false})  

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {error: true})

		default:
			return state;
	}
};

export default reducer;
