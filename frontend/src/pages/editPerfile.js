import React, { useState } from 'react';
import '../styles/editPerfile.css'
import { useEffect } from 'react';
import Upload from '../GRUPOMANIA IMG/upload.svg'
import UserDefault from '../GRUPOMANIA IMG/userDefault.png'
import { useHistory } from 'react-router-dom';


const Edit = () => {
  const navigate = useHistory()
  const [user, setUser] = useState([])
  const [userId, setUserId] = useState([])
  const getUserId = async () => {
    try {
      const token = localStorage.getItem('token')
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', "Bearer " + token);
      const response = await fetch('http://localhost:4200/api/users/user?', {
        method: 'GET',
        headers: myHeaders
      });
      if (response.ok) {
        const newUserId = await response.json();
        //console.log(newposts)
        console.log(newUserId.id)
        setUserId(newUserId.id)
        console.log(userId)
        setUser(newUserId)
        setFirstName(newUserId.firstName)
        setLastName(newUserId.lastName)
       
        // aqui tengo el array de los posts
      } else {
        const error = await response.json();
        alert(error.error)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimgUser(file);
      const reader = new FileReader();
      reader.onload = function (event) {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [firstName, setFirstName] = useState([null])
  const [lastName, setLastName] = useState([null])
  const [imgUser, setimgUser] = useState([null])
  const submitPost = async () => {
    // Aquí puedes agregar lógica para enviar la publicación al servidor
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('image', imgUser);
      const token = localStorage.getItem('token');
      const updateUsertResponse = await fetch('http://localhost:4200/api/users/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });
      if (updateUsertResponse.ok) {
        console.log('usuario actualizado exitosamente');
        getUserId();
        navigate.push('/dashboard');
        ; // Actualiza la lista de comentarios después de la actualización
      } else {
        console.error('Error al actualizar el user', updateUsertResponse.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
       const token = localStorage.getItem('token')
      // Obtener la lista de comentarios asociados al usuario
      const commentsResponse = await fetch(`http://localhost:4200/api/comments/user/${userId}`);
      
      if (commentsResponse.ok) {
        const comments = await commentsResponse.json();
  
        // Eliminar cada comentario asociado al usuario
        for (const comment of comments) {
          await fetch(`http://localhost:4200/api/comments/${comment.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
        }
      }
  
      // Después de eliminar los comentarios, eliminar el usuario
      const deleteUserResponse = await fetch(`http://localhost:4200/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (deleteUserResponse.ok) {
        console.log('Usuario eliminado exitosamente');
        localStorage.clear()
        navigate.push('/'); // Otra acción después de la eliminación
      } else {
        console.error('Error al eliminar el usuario', deleteUserResponse.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    getUserId()
  }, [])


  return (
    <div className='editPerfile'>
      <h1>Perfile</h1>
      {user.image === null ? (
        <img className='fotoPostUserEdit' src={UserDefault} alt='fotoUser' />
      ) :
        (
          <img className='fotoPostUserEdit' src={user.image} alt='fotoUser' />
        )
      }
      <div className='editInput'>
        <label htmlFor="Name">firstName</label>
        <input
          id="Name"
          name="Name"
          rows="4"
          cols="50"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="Name">LastName</label>
        <input
          id="Name"
          name="Name"
          rows="4"
          cols="50"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="imageUpload">Add/Change Perfile Photo: <img src={Upload} className='fotoLoad' alt='LoadPhoto' /></label>
        <input className='none'
          type="file"
          id="imageUpload"
          name="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className='editArea'>
            <img className="imagePreviewProfile" id="imagePreviewP" src={imagePreview} alt="ImagePreview" />
          </div>
        )}
        <button className='btn' type="button" onClick={submitPost}>
          Save
        </button>
        <button className='btn btn-grey' type="button" onClick={() => handleDeleteUser()}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Edit;