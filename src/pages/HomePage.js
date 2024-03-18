import '../App.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CrudPosts from '../components/CrudPosts';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [data, loading, error] = useFetch(process.env.REACT_APP_POSTS_URL_PATH);

    useEffect(() => {
        data !== '' && setPosts(data);
    }, [data])

    const loadPosts = () => {
        sortList();
        return (
            loading ? <Loader /> : error ? console.error(error) : <CrudPosts items={posts} />
        )
    }

    const sortList = () => {
        posts.sort(function (a, b) {
            let aa = new Date(a.created).getTime(),
                bb = new Date(b.created).getTime();
            return aa > bb ? -1 : (aa < bb ? 1 : 0);
        });
    }

    return (
        <div className='posts'>
            <div className='posts__new-post-link-wrapper'>
                <NavLink to={process.env.REACT_APP_NEW_POST_URL_PATH} className='posts__new-post-link'>Create post</NavLink>
            </div>
            {data.length !== 0 ? loadPosts() : <></>}
        </div>
    )
}

export default HomePage;