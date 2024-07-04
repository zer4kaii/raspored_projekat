import React, { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const usePrivatePost = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const postData = async (URI, body) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.post(URI, body);
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, postData };
};

export default usePrivatePost;
