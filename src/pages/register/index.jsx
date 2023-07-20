import RegisterComponent from '@/components/auth/register'
import React from 'react'

const Register = () => {
    return (
        <RegisterComponent />
    )
}

Register.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}


export default Register