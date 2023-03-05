import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authRedux";
import MessageModal from "../MessageModal/MessageModal";
import './GuestLogin.css'



const GuestLogin = () => {


    const dispatch = useDispatch();

    //set the MessaageModal state - popup message
    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);



    const loginGuestHandler = async (event) => {
        try {
            event.preventDefault()

            //fetch from the server - check if the user exist in the DB (log-in)
            //using Guest info
            const response = await fetch("https://my-expenses-web-app.herokuapp.com/ExpenseApp/login/guest@guest/guest")
            const idFromUserDB = await response.text();

            //if ERROR
            if (!response.ok) { //ERROR
                setMessageState({ title: "Something went wrong! ", message: "please try again." })
                //response from controller (JAVA SPRING)
                return
            }


            //if response ok (user found (logged in successfully))
            //redux updating UserIdAfterLogin state
            dispatch(authActions.setUserIdAfterLogin(idFromUserDB))

            //set MessageModal state - popup message
            setMessageState({ title: "Guest logged successfully!", message: "You have been logged in to Expense system!" })
        }

        catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmHandler = () => {
        setMessageState(null);
        dispatch(authActions.setIsisAuthenticated(true))
    }


    return (
        <Fragment>
            {
                messageState &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmHandler} />
            }

            <a className="loginGuestButton" onClick={loginGuestHandler}> Lazy? Continue as a guest</a>
        </Fragment>
    )
}
export default GuestLogin