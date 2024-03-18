import '../App.css';
import CrudPost from './CrudPost';
import { Link } from 'react-router-dom';

function CrudItem(props) {
    const { id } = props.item;

    return (
        <li className='posts__item'>
            <Link className='posts__item-link' to={`/posts/${id}`} />
            <CrudPost {...props} className='posts__item' />
        </li>
    );
}

export default CrudItem;