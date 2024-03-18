const createRequest = async (path, method, data = {}) => {
    try {
        const response = await fetch(process.env.REACT_APP_URL + path, {
            body: JSON.stringify(data),
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export default createRequest;