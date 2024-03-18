import "../App.css";
import CrudItem from "./CrudItem";

function CrudPosts({ items }) {
    return (
        <ul className="posts__list">
            {items.map(item => (
                <CrudItem item={item} key={item.id} />
            ))}
        </ul>
    );
}

export default CrudPosts;