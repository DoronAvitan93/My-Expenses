import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Register: React.FC = () => {

    //Register Section ###
    const [isRegister, setIsRegister] = useState<boolean>(false);

    //conditional content
    const isRegisterHandler = () => {
        setIsRegister(true);
        setIsLogging(false);

    }

    // //conditional content
    const onCancelIsRegister = () => {
        setIsRegister(false);
    }


    //Login Section ###
    //conditional content
    const [isLogging, setIsLogging] = useState<boolean>(false);

    //conditional content
    const isLoggingHandler = () => {
        setIsLogging(true);
        setIsRegister(false);
    }

    //for conditional content
    const onCancelIsLogin = () => {
        setIsLogging(false);
    }


    return (
        <>

            <div className='new-expense'>
                <h1>My Expenses</h1>
            </div>

            <div className='new-expense'>
                <h1> Please Register</h1>
                {!isRegister && <button onClick={isRegisterHandler}>Register</button>}
                {isRegister && <RegisterForm onCancel={onCancelIsRegister} />}

            </div>

            <div className='new-expense'>
                <h1>Log-in</h1>
                {!isLogging && <button onClick={isLoggingHandler}>Login</button>}
                {isLogging && <LoginForm onCancel={onCancelIsLogin} />}

            </div>

            <div>
                <img className='logo-react' width='60px' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React logo" />
            </div>
        </>
    )
}

export default Register;


