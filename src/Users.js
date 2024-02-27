import React, { useEffect, useState } from 'react'
import UserForm from './UserForm'
import UsersTable from './UsersTable'
import { Box } from '@mui/material'
import Axios from 'axios';



function Users() {

    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get('http://localhost:3001/api/users')
            .then(response => {
                setUsers(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios error", error);
            })
    }

    const addUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name: data.name,
        }

        Axios.post('http://localhost:3001/api/createuser', payload)
            .then(() => {

                getUsers();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios error", error);
            })
    }

    const updateUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name: data.name,
        }

        Axios.post('http://localhost:3001/api/updateuser', payload)
            .then(() => {

                getUsers();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios error", error);
            })
    }

    const deleteUSer = (data) =>{
        Axios.post('http://localhost:3001/api/deleteuser',data)

                .then(() => {

                    getUsers();
                    
                })
                .catch(error => {
                    console.error("Axios error", error);
                })
    }


    return (
        <Box>
            <UserForm
                addUser={addUser}
                submitted={submitted}
                data = {selectedUser}
                updateUser = {updateUser}
                isEdit={isEdit}
                />

            <UsersTable
                rows={users}
                selectedUser = {data => {
                    setSelectedUser(data);
                    setIsEdit(true);
                }}

                deleteUser = {data => window.confirm("Are you sure ?") && deleteUSer(data)}
            />
        </Box>

    )

}



export default Users