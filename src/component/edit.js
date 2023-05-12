import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';

function UserUpdate(){
    const {id} = useParams();
    const[inputs, setInputs] = useState([]);
    const[user,setUser]=useState('');
    
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

    const updateUser=(evt)=>{
        evt.preventDefault();
        fetch(`http://localhost:8080/api/user/updateuser?id=${id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: inputs.name,
                username: inputs.username,
                password: inputs.password,
                email: inputs.email
            }),
            headers: {
                "Content-Type": "application/json; chardet-UTF-8",
            }
        })
        .then(res => res.json())
        .then(json => console.log(json));
    }

    const handleChange=(e)=>{
        e.persist();
        setInputs(inputs =>({
            ...inputs,
            [e.target.name]: e.target.value
        }));
    }

    return(
        <>
            <form onSubmit={updateUser}>
                <h3>Update User Info</h3>
                <div className="mb-3">
                    <label>Name: </label>
                    <input 
                        type="text"
                        name='name'
                        className='form-control'
                        onChange={handleChange}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label>Userame: </label>
                    <input 
                        type="text"
                        name='username'
                        className='form-control'
                        // onChange={evt => setUsername(evt.target.value)}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label>Password: </label>
                    <input 
                        type="password"
                        name='password'
                        className='form-control'
                        // onChange={evt => setPassword(evt.target.value)}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label>Email: </label>
                    <input 
                    type="text"
                        name='email'
                        className='form-control'
                        //onChange={evt => setEmail(evt.target.value)}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className='d-grid'>
                    <button type="submit" className='btn btn-primary'>Submit</button>
                    <Link to={`/`}>
                        <button className="btn">Home</button>
                    </Link>
                </div>
            </form>
        </>
    );
}

export default UserUpdate;