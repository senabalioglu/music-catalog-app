
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const {data: responseData} = await axios.get(url);
      //alacağım data türü değişiklik gösterebileceği için genel isim kullan
      setData(responseData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {data, error, loading};
}

export default useFetch;