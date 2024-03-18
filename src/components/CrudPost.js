import '../App.css';
import moment from 'moment';

function CrudPost({ item, className }) {
    const dateFromNow = moment(item.created).fromNow();
    
    return (
        <>
            <p className={`${className}__content`}>{item.content}</p>
            <span className={`${className}__date`}>{dateFromNow}</span>
        </>
    );
}

export default CrudPost;