import { useEffect, useState } from 'react';

const useFetch = (path, options) => {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_URL + path, options);

            if (!response.ok) {
                setError(response.statusText);
                return;
            }

            const newData = await response.json();
            setData(newData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return [data, loading, error];
}

export default useFetch;