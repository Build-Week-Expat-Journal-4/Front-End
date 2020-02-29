import React, {useState} from 'react'

function SignUp() {

    const [newUser, setNewUser] = useState({
        username:'',
        password:''
    })

    const handleChanges = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            {/* insert form here */}
        </div>
    )
}

export default SignUp
