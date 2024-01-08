import '../styles/dashboard.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sendicon from '../GRUPOMANIA IMG/send.svg'
import Upload from '../GRUPOMANIA IMG/upload.svg'
import PostComponent from '../components/PostComponent';
import UserDefault from '../GRUPOMANIA IMG/userDefault.png'


const Dashboard = () => {
    const navigate = useHistory();
    useEffect(() => {
        // Recuperar el estado desde localStorage al cargar el componente
        const storedLoggedIn = localStorage.getItem('token');
        if (!storedLoggedIn) {
            navigate.push('/');
        }
    }, []);
    /*OBTENGO EL ID DEL USUARIO*/
    const [user, setUser] = useState([])
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
                setUser(newUserId)
                // aqui tengo el array de los posts
            }
            else if (response.status === 401) {
                localStorage.clear()
                navigate.push("/")
                return;
            }
            else {
                const error = await response.json();
                alert(error.error)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    /* OBTENGO LOS POST*/
    const [posts, setPosts] = useState([])
    const getPosts = async () => {
        try {
            const token = localStorage.getItem('token')
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', "Bearer " + token);
            const response = await fetch('http://localhost:4200/api/posts', {
                method: 'GET',
                headers: myHeaders
            });
            if (response.ok) {
                const newposts = await response.json();
                // Ordenar los posts por fecha descendente
                newposts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(newposts);
                // aqui tengo el array de los postt
            }
            else if (response.status === 401) {
                localStorage.clear()
                navigate.push("/")
                return;
            }
            else {
                const error = await response.json();
                alert(error.error)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    /*CREAR  EL POST*/
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    /* RENDERIZA LA IMAGEN QUE CARGO*/
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = function (event) {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    /* CARGA EL CONTENT INPUT*/
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    /*CREA EL POST*/
    const handleCreatePost = async () => {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('image', image);
        const token = localStorage.getItem('token');
        if (!content) {
            alert("write a description/content")
            return
        } else if (!image) {
            alert("upload an Image")
            return
        }
        try {
            const response = await fetch('http://localhost:4200/api/posts/:id', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`, // Reemplaza con tu lógica de manejo de tokens
                },
            });
            if (response.ok) {
                console.log('Post creado exitosamente');
                //window.location.reload()
                getPosts();
                setImagePreview(null)
                setImage(null);
                setContent("")
                // Puedes manejar la lógica adicional después de crear el post aquí
            } else if (response.status === 401) {
                localStorage.clear()
                navigate.push("/")
                return;
            }
            else {
                console.error('Error al crear el post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        getPosts()
        getUserId()
    }, [])

    return (<div className='dashboardCont'>
        <div className='dashboard'>
            <div className='mainPublish'>
                <div className='publishPost'>
                    <div className='fotcom'>
                        {user.image === null ? (
                            <img className='fotoPostUser' src={UserDefault} alt='fotoUser' />
                        ) :
                            (
                                <img src={user.image} className='fotoPostUser' alt='userPhoto' />
                            )
                        }
                        <input id='inputContent' value={content} onChange={handleContentChange} type='text' placeholder={'what do you thingking?' + '  ' + user?.firstName} />
                        <div className='i'>
                            <div className='iconFoto'>
                                <span>AddPhoto</span>
                                <label htmlFor="imageUpload"><img src={Upload} className='fotoPostUser' alt='userPhoto' /></label>
                                <input className='none'
                                    type="file"
                                    id="imageUpload"
                                    name="imageUpload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className='iconSend'>
                                <span>SendPost</span>
                                <img src={Sendicon} onClick={handleCreatePost} className='fotoPostUser' alt='userPhoto' /><br />

                            </div>
                        </div>
                    </div>
                    {imagePreview && (
                        <div className='imagePreview'>
                            <img id="imagePreview" src={imagePreview} alt="ImagePreview" />
                        </div>
                    )}
                </div>
            </div>
            <PostComponent posts={posts} onRefresh={() => getPosts()} />
        </div>
    </div>
    );
};

export default Dashboard;

