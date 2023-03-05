import { useState } from 'react'
import Logout from '../Register_Login/Logout'
import ExpenseForm from './ExpenseForm'
import './NewExpense.css'


type Props = {
    getExpenses: () => void
}

const NewExpense = (props: Props) => {
    //conditional content
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const issEditingHandler = () => {
        setIsEditing(true);
    }

    //for conditional content
    const onCancelEditing = () => {
        setIsEditing(false);
    }


    return (
        <div className='new-expense'>
            {isEditing && <ExpenseForm getExpenses={props.getExpenses} onCancel={onCancelEditing} />}
            {!isEditing && <><button onClick={issEditingHandler}>Add New Expense</button>
                <Logout />
            </>}
        </div>
    )
}

export default NewExpense;