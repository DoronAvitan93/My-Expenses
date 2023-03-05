import { Fragment } from "react";
import { useDispatch } from "react-redux"
import { authActions } from "../../store/authRedux";









const Logout = () => {
    const dispatch = useDispatch()

    //using redux to change the isAuth state to false, then App.tsx will re render the application
    const onClickLogoutHandler = () => {
        dispatch(authActions.setIsisAuthenticated(false));
    }


    return (
        <Fragment>
            <button onClick={onClickLogoutHandler}>Logout</button>
        </Fragment>
    )
}

export default Logout