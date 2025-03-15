import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';
import axios from "axios";

const Blog = () => {
    const [heading, setHeading] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null); // Reference for the file input

    const submit = async () => {
        const formdata = new FormData();
        formdata.append("heading", heading);
        formdata.append("text", text);
        formdata.append("blogImage", image); // Append the file itself

        try {
            const response = await axios.post('http://localhost:3000/blog/create', formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            setImage(file); // Set the file itself, not base64
        }
    };

    const handleDivClick = () => {
        fileInputRef.current.click(); // Trigger file input click on div click
    };

    const handleHeading = (e) => {
        setHeading(e.target.value);
    };

    const handleText = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="blog">
            <div className="blog-container">
                <div className="left">
                    <div 
                        className="drag-drop"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleDivClick}  // Clicking div opens file dialog
                        style={{
                            border: '2px dashed #aaa',
                            padding: '20px',
                            textAlign: 'center',
                            width: '80%',
                            height: '70%',
                            cursor: 'pointer'
                        }}
                    >
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        ) : (
                            <p>Drag & Drop an image here or click to upload</p>
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef}  // Reference for the input element
                        style={{ display: 'none' }}  // Hide the input element
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                </div>
                <div className="right">
                    <label>Create Blog</label>
                    <input className="heading" type="text" placeholder="Heading" onChange={handleHeading} />
                    <textarea className="text" type="text" placeholder="Text" onChange={handleText} />
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={submit}
                    >Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default Blog;
