import './user.css';
import {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
function User(){
    //const id = useParams();
    const {id} = useParams();
    const[user,setUser] = useState('');

    useEffect(()=>{
        console.log("Id: "+id);
        fetch(`http://localhost:8080/api/user/getuserbyId?id=${id}`)
        .then(res => res.json())
        .then(
            (data)=>{
                setUser(data);
            }
        )
    }, [])

    return(
        <div className='user-details-table'>
            <h1>{user.name}'s Details</h1>
            <ul className="list-group">
                <li className='list-group-item'>{user.id}</li>
                <li className='list-group-item'>{user.username}</li>
                <li className='list-group-item'>{user.email}</li>
            </ul>
        </div>
    );
}

export default User;