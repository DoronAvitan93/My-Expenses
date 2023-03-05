
import { useState, Fragment, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authRedux';

import './LoginForm.css'
import MessageModal from '../MessageModal/MessageModal';




type Props = {
    onCancel: () => void
}


const LoginForm = (props: Props) => {

    //redux dispatch
    const dispatch = useDispatch()

    //email input from user
    const emailRef = useRef<HTMLInputElement>();
    //password input from user
    const passwordRef = useRef<HTMLInputElement>();

    //set the MessaageModal state - popup message
    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    //conditional content
    const [loggedIn, setLoggedIn] = useState(false);


    const loginHandler = async (event) => {
        try {
            event.preventDefault()


            //fetch from the server - check if the user exist in the DB (log-in)
            const response = await fetch("https://my-expenses-web-app.herokuapp.com/ExpenseApp/login/" + emailRef.current.value + "/" + passwordRef.current.value)
            const idFromUserDB = await response.text();

            //if user doesnt exist
            if (response.status === 400) { //BAD REQUEST
                setMessageState({ title: "Wrong E-mail or Password! ", message: "E-mail or Password are incorrect." })
                //response from controller (JAVA SPRING)
                return
            }


            //if response ok (user found (logged in successfully))
            //redux updating UserIdAfterLogin state
            dispatch(authActions.setUserIdAfterLogin(idFromUserDB))

            //set MessageModal state - popup message
            setMessageState({ title: "User logged successfully!", message: "You have been logged in to Expense system!" })

            //print to console the userID
            console.log("dispatch User ID " + idFromUserDB)

            //conditional content
            setLoggedIn(true);


            // restart values
            emailRef.current.value = ''
            passwordRef.current.value = ''
        }

        catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmErrorHandler = () => {
        setMessageState(null);
    }

    const onMessageConfirmSuccessfullHandler = () => {
        setMessageState(null);
        dispatch(authActions.setIsisAuthenticated(true))
    }



    return (
        <Fragment>
            {/* if getting error, will show this popup message */}
            {messageState &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmErrorHandler} />
            }

            {/* if logged in succesfully, will show this popup message */}
            {messageState && loggedIn &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmSuccessfullHandler} />
            }


            <form onSubmit={loginHandler} >

                <label className='label'>E-Mail</label>
                <input className='input' type="email" ref={emailRef} />
                <br />

                <label className='label'>Password</label>
                <input className='input' type="password" ref={passwordRef} />
                <br />
                <br />
                <button type="submit">Login!</button>
                <button onClick={props.onCancel}>Cancel</button>
            </form>
        </Fragment >
    )
}


export default LoginForm;