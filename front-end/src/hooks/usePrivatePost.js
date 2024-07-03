import React, { useEffect, useState } from 'react'
import useAxiosPrivate from './useAxiosPrivate';

const usePrivatePost = (URI, body) => {
    const [data, setData] = useState();
    const axiosPrivate = useAxiosPrivate();
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        const postData = async () => {
            try {
                const response = await axiosPrivate.post(URI, body,{
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setData(response.data);
            } catch(err) {
                console.error(err);
            }
        }

        postData();
        return () => {
            isMounted = false;
            controller.abort();
        }

    },[])
  return data
}

export default usePrivatePost