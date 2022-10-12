import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import './Comments.css';

function Comments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments', {
            method: "GET"
        }).then((res) => res.json()).then((data) => {
            setComments(data);
        }).catch((err) => console.log(err));
    }, []);

    const [newComments, setNewComments] = useState({
        name: "",
        email: "",
        body: "",
    })

    const addComments = (e) => {
        setNewComments(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    console.log(newComments);

    const handleSubmit = async (e) => {
        /* try-catch Kodu test ederek ve catch olunca hatalarını görebilmek için kullanıyoruz. */
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/comments", {
                method: "POST",
                body: JSON.stringify({
                    name: newComments.name,
                    email: newComments.email,
                    body: newComments.body,
                    postId: 1
                }),
                /* Content type'ı karşı tarafa json veri gönderiyorsak eğer "headers" alanını zorunlu belirtmek zorundayız içeriğe bkz. */
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((res) => res.json()).then((data) => {
                console.log(data);

                let newComments = [...comments];
                newComments.push(data);
                setComments(newComments);

                console.log(newComments);
                // getPosts();s
            })
        } catch (err) {
            // console.log(err);
            alert('error');
        }
    }

    return (
        <div className="d-flex gap-3 flex-wrap mb-5">
            <div className="col-md-12 add-wrapper-area border rounded py-4 px-2">
                <div className="d-flex flex-row flex-wrap">
                    <div className="col-md-12 px-2 mb-2 fs-4 fw-bolder">
                        <span>Add Comments</span>
                    </div>
                    <div className="col-md-4 px-2 mb-2">
                        <label className="d-block fs-6">Title</label>
                        <input type="text" onChange={addComments} name="name" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Title.."></input>
                    </div>
                    <div className="col-md-4 px-2">
                        <label className="d-block fs-6">Text</label>
                        <input type="text" onChange={addComments} name="body" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                    <div className="col-md-4 px-2">
                        <label className="d-block fs-6">E-mail</label>
                        <input type="email" onChange={addComments} name="email" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                </div>
                <div className="mx-2 mt-3 text-end">
                    <button type="submit" onClick={handleSubmit} className="btn btn-success add-wrapper_btn py-2 px-4 text-uppercase">Add  </button>
                </div>
            </div>
            {comments.map((item, index) => (
                <Card key={index} style={{ width: '22rem' }}>
                    <Card.Body>
                        <Card.Title>
                            <div className="text-uppercase mb-2">
                                Post {item.id}
                            </div>
                            <div>
                                {item.name}
                            </div>
                        </Card.Title>
                        <Card.Text>
                            {item.body}
                            <div>
                                <span className="">Email :</span>
                                <span className="text-primary">
                                    {item.email}
                                </span>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default Comments