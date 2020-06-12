import React, {Component} from 'react'

import Aux from '../../hoc/Aux/Aux';
import Burger from "../../components/Burger/Burger"
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6,
}

class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el)=>{
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0})
    }
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const priceAddtion = INGREIDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = priceAddtion + oldPrice
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients,
        })
        this.updatePurchaseState(updateIngredients);
    }
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const priceDeduction = INGREIDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice =  oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients,
        })
        this.updatePurchaseState(updateIngredients);
    }
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () =>{
        alert('You did it!')
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0)
            
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder