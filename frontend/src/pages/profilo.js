import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/profile.css'
import PostComponent from '../components/PostComponent';
import UserDefault from '../GRUPOMANIA IMG/userDefault.png'

const Profilo = (props) => {
    const navigate = useHistory();
    useEffect(() => {
        // Recuperar el estado desde localStorage al cargar el componente
        const storedLoggedIn = localStorage.getItem('token');
        if (!storedLoggedIn) {
            navigate.push('/');
        }
    }, []);
    useEffect(() => {
        // Recuperar el estado desde localStorage al cargar el componente
        const storedLoggedIn = localStorage.getItem('token');
        if (!storedLoggedIn) {
            navigate.push('/');
        }
    }, []);

    const [postsId, setPostsId] = useState([])
    const getPostsId = async () => {
        try {
            const token = localStorage.getItem('token')
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', "Bearer " + token);
            const response = await fetch('http://localhost:4200/api/posts/user/' + props.match.params.id, {
                method: 'GET',
                headers: myHeaders
            });
            if (response.ok) {
                console.log("here2")
                //console.log(newposts)
                if (response.ok) {
                    const newposts = await response.json();
                    // Ordenar los posts por fecha descendente
                    newposts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setPostsId(newposts);
                    // aqui tengo el array de los posts
                } else {
                    const error = await response.json();
                    alert(error.error)
                }
                // aqui tengo el array de los posts
            } else {
                const error = await response.json();
                alert(error.error)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const [user, setUser] = useState([])
    const getUserId = async () => {
        try {
            const token = localStorage.getItem('token')
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', "Bearer " + token);
            const response = await fetch('http://localhost:4200/api/users/' + props.match.params.id, {
                method: 'GET',
                headers: myHeaders
            });
            if (response.ok) {
                const newUserId = await response.json();
                setUser(newUserId)
                // aqui tengo el array de los posts
            } else {
                const error = await response.json();
                alert(error.error)
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    useEffect(() => {
        getUserId();
        getPostsId();
    }, [props.match.params.id])

    return (<div>
        <div className='ProfilePost'>
            <div className='profilePublish'>
                <div className='fotopro'>
                    {user.image === null ? (
                        <img className='fotoPostUserEdit' src={UserDefault} alt='fotoUser' />
                    ) :
                        (
                            <img src={user.image} className='fotoPostUserProfile' alt='userPhoto' />
                        )
                    }
                    <div>
                        <span className="title">{user.firstName}</span>
                        <span className="title">{user.lastName}</span>
                    </div>
                </div>
            </div>
        </div>
        {postsId.length === 0 ? (
            <div className='no-posts-message'>
                <p>Without Posts yet</p>
            </div>
        ) :
            (
                <PostComponent posts={postsId} onRefresh={() => getPostsId()} />
            )
        }
    </div>
    );
};

export default Profilo;
