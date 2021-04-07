import React, {useState} from 'react'
import AdminService from '../services/admin.service';
import {useParams} from 'react-router-dom';

export default function WithUser({EditProfile}) {
    const [user, setUser] = useState("");
    let { id } = useParams();

    useEffect(()=>{
        let userFromDb = AdminService.getUserById(id);
    }, [id]);

    return (
        <div>
            <EditProfile user={user}/>
        </div>
    )
}
