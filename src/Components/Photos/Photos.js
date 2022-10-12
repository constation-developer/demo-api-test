import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import './Photos.css';

function Photos() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos', {
            method: "GET"
        }).then((res) => res.json()).then((data) => {
            setPhotos(data);
        }).catch((err) => console.log(err));
    }, []);

    const [newPhotos, setNewPhotos] = useState({
        title: "",
        url: "",
    })

    const addPhotos = (e) => {
        setNewPhotos(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    console.log(newPhotos);

    const handleSubmit = async (e) => {
        /* try-catch Kodu test ederek ve catch olunca hatalarını görebilmek için kullanıyoruz. */
        try {
            let res = await fetch("https://jsonplaceholder.typicode.com/comments", {
                method: "POST",
                body: JSON.stringify({
                    title: newPhotos.title,
                    url: newPhotos.url,
                    albumId: 1
                }),
                /* Content type'ı karşı tarafa json veri gönderiyorsak eğer "headers" alanını zorunlu belirtmek zorundayız içeriğe bkz. */
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((res) => res.json()).then((data) => {
                console.log(data);

                let newPhotos = [...photos];
                newPhotos.push(data);
                setPhotos(newPhotos);

                console.log(newPhotos);
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
                        <span>Add Photo</span>
                    </div>
                    <div className="col-md-6 px-2 mb-2">
                        <label className="d-block fs-6">Title</label>
                        <input type="text" onChange={addPhotos} name="title" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Title.."></input>
                    </div>
                    <div className="col-md-6 px-2">
                        <label className="d-block fs-6">İmage URL</label>
                        <input type="text" onChange={addPhotos} name="url" className="p-2 rounded border border-1 fs-6 w-100" placeholder="Enter Text.."></input>
                    </div>
                </div>
                <div className="mx-2 mt-3 text-end">
                    <button type="submit" onClick={handleSubmit} className="btn btn-success add-wrapper_btn py-2 px-4 text-uppercase">Add</button>
                </div>
            </div>
            {photos.map((item, index) => (
                <Card key={index} style={{ width: '22rem' }}>
                    <Card.Body>
                        <div>
                            <img src={item.url} className="w-100" title="İtem İmage" alt="İtem image" />
                        </div>
                        <Card.Title>
                            <h4>Photo : {item.id}</h4>
                        </Card.Title>
                        <Card.Text>
                            <div className="fs-5">
                                {item.title}
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default Photos