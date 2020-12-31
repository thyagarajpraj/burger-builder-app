import React, { useCallback, useEffect, useState } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';

const burgerBuilder = props => {
    const [isPurchasing, setIsPurchasing] = useState(false);

    const dispatch = useDispatch();
    const onIngredientsAdded = (ingName) => { dispatch(actions.addIngredient(ingName)) };
    const onIngredientsRemoved = (ingName) => { dispatch(actions.removeIngredient(ingName)) };
    const onInitIngredients = useCallback(() => {
        dispatch(actions.initIngredient())
    }, [dispatch]);
    const onInitPurchase = () => { dispatch(actions.purchaseInit()) };
    const onSetAuthRedirectPath = (path) => { dispatch(actions.setAuthRedirectPath(path)) };

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (!isAuthenticated) {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        } else {
            setIsPurchasing(true);
        }
    }

    const purchaseCancelHandler = () => {
        setIsPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = error ? <p>Ingredients cannot be loaded</p> : <Spinner />
    if (ings) {
        burger = <Auxiliary>
            <Burger ingredients={ings} />
            <BuildControls
                ingredientsAdded={onIngredientsAdded}
                ingredientsRemoved={onIngredientsRemoved}
                disabled={disabledInfo}
                purchasable={updatePurchaseState(ings)}
                ordered={purchaseHandler}
                isAuth={isAuthenticated}
                price={price} />
        </Auxiliary>
        orderSummary = <OrderSummary
            ingredients={ings}
            price={price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />
    }

    // {salad: true, meat: false, ...}
    return (
        <Auxiliary>
            <Modal show={isPurchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
}
export default (withErrorHandler(burgerBuilder, axios));