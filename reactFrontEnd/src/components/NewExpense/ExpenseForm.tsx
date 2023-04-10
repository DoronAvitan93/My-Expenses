import React, { Fragment, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/reduxIndex'
import MessageModal from '../MessageModal/MessageModal'
import './ExpenseForm.css'


type Props = {
    onCancel: () => void
    getExpenses: () => void
}

const ExpenseForm = (props: Props) => {

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    //title input from user
    const titleRef = useRef<HTMLInputElement>(); // expense Title
    //price input from user
    const priceRef = useRef<HTMLInputElement>(); // expense Title
    //date input from user
    const dateRef = useRef<HTMLInputElement>(); // expense Title

    //userID from redux - from log-in method at LoginForm.tsx
    const userIdFromLogin = useSelector<RootState>(state => state.authRedux.userIdAfterLogin);

    //today date for html using
    const todayDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];


    //submit new expense
    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //check valid inputs 
        if (titleRef.current.value === '' || priceRef.current.value === '' || dateRef.current.value === '') {
            console.log("invalid inputs")
            setMessageState({ title: "Oops! Something went wrong!", message: 'Invalid inputs!' })
            // throwing error to stop code to continue and making error
            return;
        }

        //JSON send to the server (JAVA SPRING)
        const dataToSend = {
            title: titleRef.current.value,
            price: priceRef.current.value,
            date: dateRef.current.value,
            userID: userIdFromLogin
        }

        //print to console the data
        // console.log("Sending: " + JSON.stringify(dataToSend))


        const requestOptions =
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend)
        }

        // console.log(JSON.stringify(dataToSend))
        const response = await fetch("https://my-expenses-web-app.herokuapp.com/ExpenseApp/addExpense", requestOptions)

        // const responseFromDB = await response.text();
        // console.log(responseFromDB)

        //restart values
        titleRef.current.value = '';
        priceRef.current.value = '';
        dateRef.current.value = '';

        props.getExpenses()
    }



    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }



    return (
        <Fragment>
            {messageState &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmHandler} />}

            <form onSubmit={submitHandler}>
                <div className='new-expense__controls'>
                    <div className='new-expense__control'>
                        <label>Title</label>
                        <input type="text" ref={titleRef} />
                    </div>

                    <div className='new-expense__control'>
                        <label>Price</label>
                        <input type='number' min='0.01' step='0.01' ref={priceRef} />
                    </div>

                    <div className='new-expense__control'>
                        <label>Date</label>
                        <input type='date' min='2020-01-01' max={todayDate} ref={dateRef} />
                    </div>

                </div>
                <div className='new-expense__actions'>
                    <button onClick={props.onCancel}>Cancel</button>
                    <button type='submit'>Add Expense</button>
                </div>
            </form>
        </Fragment>
    )
}

export default ExpenseForm