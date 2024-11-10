import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function employeelist() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
        useEffect(() => {
            axios.get('http://localhost:3001/getUsers')
            .then(users => setUsers(users.data))
            .catch(err => console.log(err))
        },[])

    return(
        <div className='w-100 vh-100 d-flex justify-content-center aligin-items-center'>
            <div className='w-50'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Mobile No
                            </th>
                            <th>
                                Designation
                            </th>
                            <th>
                                Gender
                            </th>
                            <th>
                                Course
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                            return <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobileNo}</td>
                                    <td>{user.designation}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.course}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <button
                        type="button"
                        className="btn btn-secondary mb-3"
                        onClick={() => navigate('/dashboard')}
                    >
                    Back
                    </button>
            </div>
                        
        </div>
        
    )
    
}

export default employeelist