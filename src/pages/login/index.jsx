import React from 'react'
import LoginComponent from '@/components/auth/login'

const Login = () => {
    return (
        <LoginComponent />
    )
}

Login.getLayout = function PageLayout(page) {
    return (
        <>
            {page}
        </>
    )
}

export default Login