import axios from "axios";
// import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "context/SidebarContext";

const useAsync = (asyncFunction) => {
  const [data, setData] = useState([] || {});
  const [error, setError] = useState("");
  // const [errCode, setErrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const {
    isUpdate,
    setIsUpdate,
    currentPage,
    category,
    searchText,
    invoice,
    status,
    zone,
    time,
    sortedField,
    source,
    limitData,
    startDate,
    endDate,
  } = useContext(SidebarContext);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    (async () => {
      try {
        const res = await asyncFunction({ cancelToken: source.token });
        if (!unmounted) {
          setData(res);
          setError("");
          setLoading(false);
        }
      } catch (err) {
        if (!unmounted) {
          setError(err.message);
          if (axios.isCancel(err)) {
            setError(err.message);
            setLoading(false);
            setData([]);
          } else {
            setError(err.message);
            setLoading(false);
            setData([]);
          }
        }
      }
    })();

  

    setIsUpdate(false);

    return () => {
      unmounted = true;
      source.cancel("Cancelled in cleanup");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isUpdate,
    currentPage,
    category,
    searchText,
    invoice,
    status,
    zone,
    time,
    sortedField,
    source,
    limitData,
    startDate,
    endDate,
  ]);


  return {
    data,
    error,
    loading,
  };
};

export default useAsync;
