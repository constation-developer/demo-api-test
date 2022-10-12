import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import './Posts.css';

function Posts() {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: "GET"
        }).then((res) => res.json()).then((data) => {
            setPosts(data);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getPosts();
    }, []);

    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
    })

    const addPost = (e) => {
        setNewPost(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        /* try-catch Kodu test ederek ve catch olunca hatalarını görebilmek için kullanıyoruz. */
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify({
                    title: newPost.title,
                    body: newPost.body,
                    userId: 1 
                }),
                /* Content type'ı karşı tarafa json veri gönderiyorsak eğer "headers" alanını zorunlu belirtmek zorundayız içeriğe bkz. */
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((res) => res.json()).then((data) => {
                console.log(data);

                let newPost = [...posts];
                newPost.push(data);
                setPosts(newPost);

                console.log(newPost);
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
                        <span>Add Post</span>
                    </div>
                    <div className="col-md-6 px-2">
                        <label className="d-block fs-6">Title</label>
                        <input onChange={addPost} name="title" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Title.."></input>
                    </div>
                    <div className="col-md-6 px-2">
                        <label className="d-block fs-6">Text</label>
                        <input onChange={addPost} name="body" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                </div>
                <div className="mx-2 mt-3 text-end">
                    <button type="submit" onClick={handleSubmit} className="btn btn-success add-wrapper_btn py-2 px-4 text-uppercase">Add</button>
                </div>
            </div>
            <div className="d-flex gap-3 flex-wrap">
                {posts.map((item, index) => (
                    <Card key={index} style={{ width: '22rem' }}>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.body}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Posts