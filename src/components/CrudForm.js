import '../App.css';

function CrudForm({formData, onValueChange, onSubmit, className}) {
    return (
        <form className={`${className}__form`} onSubmit={onSubmit}>
            <textarea autoFocus name='content' className={`${className}__input`} value={formData.content} onChange={onValueChange} placeholder='Write something...'></textarea>
            <button className={`${className}__submit`}>{className === 'post' ? 'Save' : 'Create post'}</button>
        </form>
    );
}

export default CrudForm;