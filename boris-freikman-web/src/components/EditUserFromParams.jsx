import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import AdminService from '../services/admin.service';
import EditProfile from './EditProfile';

function EditUserFromParams() {
    let {id} = useParams();
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    async function getUserFromDbByParams(){
        let userFromDb = await AdminService.getUserById(id);
        setUser(userFromDb);
        setIsLoading(false);
    } 

    useEffect(() => {
        getUserFromDbByParams();
    }, [id]);
    

    return (
        <div>
            {isLoading ? 
            <h1>Loading, please wait</h1> : 
            <EditProfile user={user}/>}
        </div>
    )
}

export default EditUserFromParams;
