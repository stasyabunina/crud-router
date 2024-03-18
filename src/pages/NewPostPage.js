import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CrudForm from '../components/CrudForm';
import Loader from '../components/Loader';
import createRequest from '../api/createRequest';

function NewPostPage() {
    const [form, setForm] = useState({
        content: '',
    });
    const [formError, setFormError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const sendData = async () => {
        setIsLoading(true);

        const response = await createRequest(process.env.REACT_APP_POSTS_URL_PATH, 'POST', form);

        if (response.ok) {
            setIsLoading(false);
            setForm({
                content: '',
            });
            navigate('/');
        }
    }

    const onValueChange = (e) => {
        setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (form.content === '') {
            setFormError(true);
            return;
        }

        setFormError(false);
        sendData();
    }

    return (
        <div className='new-post'>
            <div className='new-post__back-link-wrapper back-link-wrapper'>
                <Link className='new-post__back-link back-link' to={-1}>X</Link>
            </div>
            <CrudForm onSubmit={onSubmit} onValueChange={onValueChange} formData={form} className='new-post' />
            {formError ? <span className='error'>The field cannot be empty</span> : <></>}
            {isLoading ? <Loader /> : <></>}
        </div>
    )
}

export default NewPostPage;