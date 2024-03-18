import '../App.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import useFetch from '../hooks/useFetch';
import CrudForm from '../components/CrudForm';
import CrudPost from '../components/CrudPost';
import createRequest from '../api/createRequest';

function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const path = `/posts/${id}`;

    const [isEdit, setIsEdit] = useState(false);
    const [editForm, setEditForm] = useState({
        id: id,
        content: '',
    });
    const [editFormError, setEditFormError] = useState(false);
    const [item, setItem] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [data, loading, error] = useFetch(path);

    useEffect(() => {
        data !== '' && setItem(data.post);
    }, [data])

    const onDelete = async () => {
        setIsLoading(true);

        const response = await createRequest(path, 'DELETE');

        if (response.ok) {
            setIsLoading(false);
            navigate('/');
        }
    }

    const editData = async () => {
        setIsLoading(true);

        const response = await createRequest(path, 'PUT', editForm);

        if (response.ok) {
            setIsLoading(false);
            setIsEdit(false);
            setItem(editForm);
            setEditForm(prevForm => ({ ...prevForm, content: '' }))
        }
    }

    const onEdit = () => {
        setIsEdit(true);
        setEditForm(prevForm => ({ ...prevForm, content: item.content }))
    }

    const onValueChange = (e) => {
        setEditForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (editForm.content === '') {
            setEditFormError(true);
            return;
        }

        setEditFormError(false);
        editData();
    }

    const loadPost = () => {
        return (
            isEdit ?
                <>
                    <CrudForm onSubmit={onSubmit} onValueChange={onValueChange} formData={editForm} className='post' />
                    {editFormError ? <span className='error'>The field cannot be empty</span> : <></>}
                </>
                : <>
                    <CrudPost item={item} className='post' />
                    <div className='post__btns'>
                        <button className='post__edit-btn' type='button' onClick={onEdit}>Edit</button>
                        <button className='post__remove-btn' type='button' onClick={onDelete}>Delete</button>
                    </div>
                </>
        )
    }

    return (
        <>
            <div className='post'>
                <div className='post__back-link-wrapper back-link-wrapper'>
                    <Link className='post__back-link back-link' to={-1}>X</Link>
                </div>
                {loading ? <Loader /> : error ? console.error(error) : loadPost()}
            </div>
            {isLoading ? <Loader /> : <></>}
        </>
    )
}

export default PostPage;