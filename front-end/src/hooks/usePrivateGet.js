import React, { useEffect, useState } from 'react'
import useAxiosPrivate from './useAxiosPrivate';

const usePrivateGet = (URI) => {
    const [data, setData] = useState();
    const axiosPrivate = useAxiosPrivate();
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(URI, {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setData(response.data);
            } catch(err) {
                console.error(err);
            }
        }

        getData();

        return () => {
            isMounted = false;
            controller.abort();
        }

    },[])
  return data
}

export default usePrivateGet