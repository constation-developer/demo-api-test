import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import './Users.css';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: "GET"
        }).then((res) => res.json()).then((data) => {
            setUsers(data);
        }).catch((err) => console.log(err));
    }, []);

    const [newUsers, setNewUsers] = useState({
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
        },
        phone: "",
        website: "",
        company: {
            company_name: "",
            catchPhrase: "",
            bs: ""
        }
    })

    const addUsers = (e) => {
        setNewUsers(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    console.log(newUsers);

    const handleSubmit = async (e) => {
        /* try-catch Kodu test ederek ve catch olunca hatalarını görebilmek için kullanıyoruz. */
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/comments", {
                method: "POST",
                body: JSON.stringify({
                    name: newUsers.name,
                    username: newUsers.username,
                    email: newUsers.email,
                    address: {
                        street: newUsers.street,
                        suite: newUsers.suite,
                        city: newUsers.city,
                        zipcode: newUsers.zipcode,
                    },
                    phone: newUsers.phone,
                    website: newUsers.website,
                    company: {
                        name: newUsers.company_name,
                        catchPhrase: newUsers.catchPhrase,
                        bs: newUsers.bs
                    }
                }),
                /* Content type'ı karşı tarafa json veri gönderiyorsak eğer "headers" alanını zorunlu belirtmek zorundayız içeriğe bkz. */
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((res) => res.json()).then((data) => {
                console.log(data);

                let newUsers = [...users];
                newUsers.push(data);
                setUsers(newUsers);

                console.log(newUsers);
                // getPosts();s
            })
        } catch (err) {
            // console.log(err);
            alert('error');
        }
    }

    return (
        <div className="d-flex gap-3 flex-column mb-5">
            <div className="col-md-12 add-wrapper-area border rounded py-4 px-2">
                <div className="d-flex flex-row flex-wrap">
                    <div className="col-md-12 px-2 mb-2 fs-4 fw-bolder">
                        <span>Add User</span>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">Name</label>
                        <input type="text" onChange={addUsers} name="name" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Title.."></input>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">User Name</label>
                        <input type="text" onChange={addUsers} name="username" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">E-mail</label>
                        <input type="email" onChange={addUsers} name="email" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="d-inline-block mx-2 my-2 border-bottom w-100 pb-2"><span>Adress :</span></div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">Street</label>
                        <input type="text" onChange={addUsers} name="street" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">Suite</label>
                        <input type="text" onChange={addUsers} name="suite" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">City</label>
                        <input type="text" onChange={addUsers} name="city" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">Zip Code</label>
                        <input type="text" onChange={addUsers} name="zipcode" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="d-inline-block mx-2 my-2 border-bottom w-100 pb-2"></div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">Phone</label>
                        <input type="number" onChange={addUsers} name="phone" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">Website</label>
                        <input type="text" onChange={addUsers} name="website" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="d-inline-block mx-2 my-2 border-bottom w-100 pb-2"><span>Company :</span></div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">Name</label>
                        <input type="text" onChange={addUsers} name="company_name" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">catchPhrase</label>
                        <input type="text" onChange={addUsers} name="catchPhrase" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">bs</label>
                        <input type="text" onChange={addUsers} name="bs" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>

                </div>
                <div className="mx-2 mt-3 text-end">
                    <button type="submit" onClick={handleSubmit} className="btn btn-success add-wrapper_btn py-2 px-4 text-uppercase">Add</button>
                </div>
            </div>
            {users.map((item, index) => (
                <Card key={index}>
                    <Card.Body>
                        <Card.Title>
                            <span className="d-inline-block mx-2 mb-3">User {item.id}</span>
                            <div className="d-flex flex-row">
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">Name</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.name} disabled></input>
                                </div>
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">User Name</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.username} disabled></input>
                                </div>
                            </div>
                            <div className="d-inline-block mx-2 my-2 border-bottom w-100 pb-2"><span>Adress :</span></div>
                            <div className="d-flex flex-row">
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">Street</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.address.street} disabled></input>
                                </div>
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">Suite</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.address.suite} disabled></input>
                                </div>
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">City</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.address.city} disabled></input>
                                </div>
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">Zip Code</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.address.zipcode} disabled></input>
                                </div>
                            </div>
                            <div className="d-inline-block mx-2 my-2 border-bottom w-100 pb-2"></div>
                            <div className="d-flex flex-row">
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">Phone</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.phone} disabled></input>
                                </div>
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">Website</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.website} disabled></input>
                                </div>
                            </div>
                            <div className="d-inline-block mx-2 my-2 border-bottom w-100 pb-2"><span>Company :</span></div>
                            <div className="d-flex flex-row">
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">Name</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.company.name} disabled></input>
                                </div>
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">catchPhrase</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.company.catchPhrase} disabled></input>
                                </div>
                                <div className="col-md-3 px-2">
                                    <label className="d-block fs-6">bs</label>
                                    <input className="p-2 rounded border border-1 fs-6 w-100" value={item.company.bs} disabled></input>
                                </div>
                            </div>
                        </Card.Title>
                        <Card.Text>

                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default Users