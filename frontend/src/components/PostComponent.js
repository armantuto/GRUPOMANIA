import React, { useState } from 'react';
import { dateFormat, getCurrentUser } from '../utils/utils';
import CommentComponent from './CommentComponent';
import { AiFillLike } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from "react-icons/md"
import { IoCloseCircleSharp } from "react-icons/io5";
import UserDefault from '../GRUPOMANIA IMG/userDefault.png'


const PostComponent = ({ posts, onRefresh }) => {
    const [newComment, setNewComment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };
    /*CREA EL POST*/
    const handleDeletePost = async (postId) => {
        try {
            console.log('Trying to delete post with ID:', postId);
            const token = localStorage.getItem('token');
            const deletePostResponse = await fetch(`http://localhost:4200/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(deletePostResponse)
            if (deletePostResponse.ok) {
                onRefresh(); // Actualiza la lista de posts después de la eliminación
            } else {
                console.error('Error al eliminar el post', deletePostResponse.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    /*BORRA EL COMENTO*/
    const handleCreateComment = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            // Asegúrate de que currentPostId tenga un valor antes de intentar crear un comentario
            if (postId === null) {
                console.error('No se ha seleccionado un post para comentar.');
                return;
            }

            const response = await fetch('http://localhost:4200/api/users/user?', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },

            });
            if (response.ok) {
                const newUserId = await response.json();
               console.log(newUserId) 
                //setUserD(final)
            }

            // Hacer la solicitud para crear el comentario con el ID del post actual
            const createCommentResponse = await fetch(`http://localhost:4200/api/comments/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    comment: newComment,
                    userId: currentUser?.userId, // Ajusta según tu lógica
                    postId: postId//currentPostId
                }),
            });

            if (createCommentResponse.ok && response.ok) {
                const createdComment = await createCommentResponse.json();
                console.log('Comentario creado exitosamente:', createdComment);
                // setNewComment(); // Limpia el campo de comentario después de crearlo si es necesario

                onRefresh()
                setNewComment("")


            } else {
                console.error('Error al crear el comentario', createCommentResponse.statusText);
                console.log('Token:', token);
                console.log('Current Post ID:', postId);
                console.log('New Comment:', newComment);



            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleDeleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            const deleteCommentResponse = await fetch(`http://localhost:4200/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (deleteCommentResponse.ok) {
                onRefresh(); // Actualiza la lista de comentarios después de la eliminación
            } else {
                console.error('Error al eliminar el comentario', deleteCommentResponse.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleUpdateComment = async (commentId, editComment) => {
        try {
            const token = localStorage.getItem('token');
            const updateCommentResponse = await fetch(`http://localhost:4200/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    comment: editComment,
                }),
            });

            if (updateCommentResponse.ok) {
                onRefresh(); // Actualiza la lista de comentarios después de la actualización
            } else {
                console.error('Error al actualizar el comentario', updateCommentResponse.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const doLike = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const doLikeResponse = await fetch(`http://localhost:4200/api/likes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    postId: postId
                }),
            });

            if (doLikeResponse.ok) {
                onRefresh(); // Actualiza la lista de comentarios después de la actualización
            } else {
                console.error('Error al actualizar el like', doLikeResponse.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /* MODAL*/
    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };
    const currentUser = getCurrentUser()
    return (
        <>
            {posts?.map(post => (
                <div className='posters' key={post.id}>
                    <div className='post'>
                        <div className='postear'>
                            <div className='UserDataCont'>
                                <Link to={"/perfile/" + post.userId}>
                                    {post.User.image === null ? (
                                        <img className='fotoPostUser' src={UserDefault} alt='fotoUser' />
                                    ) :
                                        (
                                            <img src={post.User.image} className='fotoPostUser' alt='userPhoto' />
                                        )
                                    }
                                </Link>
                                <div className='UserDetails'>
                                    <div className='name'>{post.User?.firstName}  {post.User?.lastName}</div>
                                    <div className='data'>{dateFormat(post.createdAt)}</div>
                                </div>
                            </div>
                            <div className='equis'>
                                {post.User?.id === currentUser?.userId && (
                                    <>
                                        <button className='btn btn-grey' onClick={() => handleDeletePost(post.id)}><MdDelete /></button>
                                        <Link to={"/post/" + post.id}>
                                            <button className='btn btn-grey'><MdEdit /></button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='postContent'>
                            {post.content}
                        </div>
                        <img className='imgPost' src={post.imageUrl} alt="foto" onClick={() => openModal(post.imageUrl)} />
                        {isModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <div className="close" onClick={closeModal}><IoCloseCircleSharp /></div>
                                    <img src={selectedImage} alt="post" className="modal-image" />
                                </div>
                            </div>
                        )}
                        <div className='buttons'>
                            {post.Likes.length === 0 ? (
                                <button className='like' onClick={() => doLike(post.id)}><AiFillLike />{ } Likes</button>
                            ) :
                                (
                                    <button className='likeactive' onClick={() => doLike(post.id)}><AiFillLike />{post.Likes.length} Likes</button>
                                )}
                        </div>
                        {post.Comments.map((comment, index) => (
                            <CommentComponent
                                key={"comment-" + index}
                                comment={comment}
                                userId={currentUser?.userId}
                                onUpdateComment={(id, editcomment) => handleUpdateComment(id, editcomment)}
                                onDeleteComment={handleDeleteComment}
                            />
                        ))}
                        <div className='coments'>
                            <input type='text' id='comment' name='comment' value={newComment} onChange={handleCommentChange} placeholder='Scrivi un commento...'></input> <span className='sendPost' onClick={() => handleCreateComment(post.id)}> < IoSend /> </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostComponent;