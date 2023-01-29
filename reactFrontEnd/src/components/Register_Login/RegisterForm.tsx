import { Fragment, useRef, useState } from 'react';
import MessageModal from '../MessageModal/MessageModal';
import './RegisterForm.css'


type Props = {
    onCancel: () => void
}

const RegisterForm = (props: Props) => {


    //name input from user
    const nameRef = useRef<HTMLInputElement>(); //register name
    //email input from user
    const emailRef = useRef<HTMLInputElement>(); //register email
    //password input from user
    const passwordRef = useRef<HTMLInputElement>(); //register password


    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);
    //conditinal content
    const [registerSuccesfully, setRegisterSuccessfully] = useState(false);


    const registerHandler = async (event) => {
        try {
            event.preventDefault()

            //check the inputs 
            if (nameRef.current.value.trim().length === 0 ||
                emailRef.current.value.trim().length === 0 ||
                passwordRef.current.value.trim().length === 0) {

                setMessageState({ title: "Invalid input", message: "Please enter a valid name / email / password (No empty values)" })
                return;
            }


            //user info
            const dataToSend = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            }


            const requestOptions =
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            }

            //fetch from the server - registering user to the DB
            const response = await fetch("https://my-expenses-web-app.herokuapp.com/ExpenseApp/addUser", requestOptions)
            const responseFromDbAfterRegister = await response.text();


            //if E-mail already exist
            if (!response.ok) { //BAD REQUEST
                setMessageState({ title: "E-Mail already in use! ", message: "E-mail already in use, please use different E-mail." })
                //response from controller (JAVA SPRING)
                return
            }

            //response from controller with details if OK
            console.log(responseFromDbAfterRegister)

            //using the error modal also as success registering message
            setMessageState({ title: "User register successfully!", message: "You have been registered to Expense system!" })


            //restart values
            nameRef.current.value = ''
            emailRef.current.value = ''
            passwordRef.current.value = ''

            //conditional content
            setRegisterSuccessfully(true)

            //catching error
        } catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmErrorHandler = () => {
        setMessageState(null);
    }

    const onMessageRegisterConfirm = () => {
        setMessageState(null);
        //conditional content - hide the register form after registering successfully
        props.onCancel();
    }


    return (
        <Fragment>
            {messageState && registerSuccesfully &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageRegisterConfirm} />}

            {messageState && !registerSuccesfully &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmErrorHandler} />}


            <form onSubmit={registerHandler}>
                <label className='label'>Name</label>
                <input className='input' type="text" ref={nameRef} />
                <br />

                <label className='label'>E-Mail</label>
                <input className='input' type="email" ref={emailRef} />
                <br />

                <label className='label'>Password</label>
                <input className='input' type="password" ref={passwordRef} />
                <br />
                <br />
                <button type="submit">Register!</button>
                <button onClick={props.onCancel}>Cancel</button>
            </form>
        </Fragment >
    )
}


export default RegisterForm;
