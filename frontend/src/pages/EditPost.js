import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/editPost.css'
import Upload from '../GRUPOMANIA IMG/upload.svg'

const EditPost = (props) => {
    const [content, setContent] = useState("")
    const [imgPost, setImgPost] = useState(null)
    const [post, setPost] = useState([])
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useHistory();
    const getPostById = async () => {
        try {
            const id = props.match.params.id;
            const token = localStorage.getItem('token')
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', "Bearer " + token);
            const response = await fetch('http://localhost:4200/api/posts/' + id, {
                method: 'GET',
                headers: myHeaders
            });
            if (response.ok) {
                const post = await response.json();
                console.log(post)
                setPost(post)
                setContent(post.content)
                // aqui tengo el array de los posts
            } else {
                const error = await response.json();
                alert(error.error)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgPost(file);
            const reader = new FileReader();
            reader.onload = function (event) {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitUpdatePost = async () => {
        // Aquí puedes agregar lógica para enviar la publicación al servidor
        try {
            const formData = new FormData();
            formData.append('content', content);
            formData.append('image', imgPost);
            const token = localStorage.getItem('token');
            const updateUsertResponse = await fetch('http://localhost:4200/api/posts/' + post.id, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });
            if (updateUsertResponse.ok) {
                console.log('post actualizado exitosamente');
                navigate.push("/dashboard")
                    ; // Actualiza la lista de comentarios después de la actualización
            } else {
                console.error('Error al actualizar el user', updateUsertResponse.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getPostById();
    }, [])

    return (
        <div className='editPost'>
            <h1>Edit Post</h1>
            <img className='fotoPostUserEditPost' src={post.imageUrl} alt='imgUser' />
            <div className='editInput'>
                <label htmlFor="Name">Content</label>
                <textarea className='contentEditPost'
                    id="Name"
                    name="Name"
                    rows="4"
                    cols="50"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <label htmlFor="imageUpload">Add/Change Post Photo:  <img src={Upload} className='fotoLoad' alt='LoadPhoto' /></label>
                <input className='none'
                    type="file"
                    id="imageUpload"
                    name="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {imagePreview && (
                    <div className='editArea'>
                        <img className="imagePreviewProfile" id="imagePreviewP" src={imagePreview} alt="Image Preview" />

                    </div>
                )}
                <button className='btn' type="button" onClick={submitUpdatePost}>
                    Modifica Post
                </button>
            </div>
        </div>
    );
};

export default EditPost;