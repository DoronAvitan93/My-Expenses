import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import NewExpense from '../NewExpense/NewExpense';
import './Expenses.css'


type Props = {

}



const Expenses: React.FC<Props> = () => {

    //filter expenses by year
    const [yearSelect, setYearSelect] = useState('')
    //expenses that will be set from the DB
    const [expenses, setExpenses] = useState([]);
    //using userID to add expenses specific to the user
    const userIdFromLogin = useSelector<RootState>(state => state.authRedux.userIdAfterLogin);


    //fetch function expenses from the server (JAVA SPRING)
    const getExpensesHandler = async () => {
        try {
            const response1 = await fetch("https://my-expenses-web-app.herokuapp.com/ExpenseApp/findExpenseUserID/" + userIdFromLogin)
            const data = await response1.json();

            //print to console for checking
            console.log("Got Expenses: " + JSON.stringify(data))

            //copying the data to reverse the expenses array (to show the newest expense)
            const dataCopy = await data.slice(0);
            //reverse array
            const reversedDataCopy = await dataCopy.reverse();
            //set the data we fetch to the expenses state
            setExpenses(reversedDataCopy)
        }
        catch (error) {
            console.log("catching: " + error.message)
        }
    }

    //delete expense
    const deleteExpense = async (id: number) => {
        try {
            const requestOptions =
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            }
            const response = await fetch("https://my-expenses-web-app.herokuapp.com/ExpenseApp/deleteExpense/" + id, requestOptions)
            console.log(response)

            //updating expenses list after deleting
            getExpensesHandler();
        } catch (error) {
            //print error to console
            console.log('catching' + error.message)
        }
    }


    //expenses year filter
    const onYearSelect = (event) => {
        setYearSelect(event.target.value)
        console.log(event.target.value)
    }


    //calling the function
    useEffect(() => {
        getExpensesHandler();
    }, []
    );


    return (
        <Fragment>
            <NewExpense getExpenses={getExpensesHandler} />

            {/* year filter selection */}
            <div className='expenses-div'>
                <div className='expenses-filter '>
                    <div className='expenses-filter__control'>
                        <label>Filter by year</label>
                        <select onChange={onYearSelect}>
                            <option selected hidden>Year</option>
                            <option value=''>All</option>
                            <option value='2023'>2023</option>
                            <option value='2022'>2022</option>
                            <option value='2021'>2021</option>
                            <option value='2020'>2020</option>
                        </select>
                    </div>
                </div>

                {/* filtering the expenses by year and display them in a list */}
                {expenses && expenses.filter(expense => expense.date.includes(yearSelect)).map(filteredExpense =>
                    <ul key={filteredExpense.id} className='expenses-list'>
                        <li>
                            <div className='expense-item'>
                                <div className="expense-date">
                                    <div className="expense-date_fullDate">{filteredExpense.date}</div>
                                </div>
                                <div className='expense-item__description'>
                                    <h2 className=''>{filteredExpense.title}</h2>
                                    <div className='expense-item__price'>{filteredExpense.price}₪
                                    </div>
                                    <button className='button' onClick={(e: any) => deleteExpense(filteredExpense.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                )
                }
            </div >
        </Fragment>
    )
}
export default Expenses







// return (
//     <Fragment>
//         <NewExpense getExpenses={getExpensesHandler} />
//         <div className='expenses-div'>
//             {expenses && expenses.filter(expense => expense.date.includes('2023')).map(filteredExpense =>
//                 <ul key={filteredExpense.id} className='expenses-list'>
//                     <li>
//                         <div className='expense-item'>
//                             <div className="expense-date">
//                                 <div className="expense-date_fullDate">{filteredExpense.date}</div>
//                             </div>
//                             <div className='expense-item__description'>
//                                 <h2 className=''>{filteredExpense.title}</h2>
//                                 <div className='expense-item__price'>{filteredExpense.price}₪
//                                 </div>
//                                 <button className='button' onClick={(e: any) => deleteExpense(filteredExpense.id)}>Delete</button>
//                             </div>
//                         </div>
//                     </li>
//                 </ul>
//             )
//             }
//         </div >
//     </Fragment>
// )
// }