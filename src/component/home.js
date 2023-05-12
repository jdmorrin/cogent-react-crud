import './home.css'
import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


function Home(){
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() =>{
        fetch("http://localhost:8080/api/user/getallusers")
        .then(res => res.json())
        .then(
            (data) =>{
                setIsLoaded(true);
                setUsers(data);
            },
            (error) =>{
                setIsLoaded(true);
                setError(error);
            }
        )
    }, []); // What is the empty array at the end of useEffect?

    const deleteUser=async(id)=>{
        console.log("Here we're going to delete a user");
        // console.log("event: " + e);
        // console.log("Event Tagregt: "+ e.target);
        // console.log("Event target value: "+e.target.value);
        console.log("id: " + id);

        await fetch(`http://localhost:8080/api/user/delete?id=${id}`, {
            method: "DELETE"     
        })
        .then(res => res.json)
        .then(json => console.log(json));
        window.location.reload();

    }

    const editUser=()=>{
        console.log("Edit user info");
    }

    // const storUser=(id)=>{
    
    // }

    if(error){
        return <div>Error: {error.message}</div>
    } else if(!isLoaded){
        return <div>Loading...</div>
    }
    else{
        return(
            <div className='user-list-div'>
                <h1>User List</h1>
                {/* <ul className='list-group'>
                    {users.map(user =>(
                    <li key={user.id} className='list-group-item'>
                        <div className='px-0'>
                            <img src={user.img_src}/>
                            <Link to={`user/${user.id}`}>
                                {user.username}
                            </Link>
                            <button onClick={()=>deleteUser(user.id)} className='btn tbn-dark'>Delete</button>
                            <Link to={`edit/${user.id}`}>
                                <button onClick={editUser} className='btn tbn-dark'>Edit</button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul> */}
            <table className='table'>
                <tbody>
                    {users.map(user =>(
                        <tr key={user.id}>
                            <th scope='row'>{user.id}</th>
                            <td>
                                <img src={user.img_src}/>
                                
                            </td>
                            <td>
                                <h5>{user.username}</h5>
                            </td>
                            <td>
                                <Link to={`user/${user.id}`}>
                                    <button className='btn btn-dark'>Show Details</button>
                                </Link>
                            </td>
                            <td>
                                <Link to={`edit/${user.id}`}>
                                    <button onClick={editUser} className='btn btn-dark'>Edit</button>
                                </Link>
                                <button onClick={()=>deleteUser(user.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`create/`}>
                <button className='btn btn-dark'>Add New User</button>
            </Link>
            {/* <button>Add User</button> */}
            </div>

        );
    }
}

export default Home;