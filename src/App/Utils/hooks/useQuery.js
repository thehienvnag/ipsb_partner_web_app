import { useLocation, useNavigate, useParams } from "react-router";
import { isNumber } from "../utils";

const { useState, useEffect } = require("react");

const PAGE_SIZE = 6;
export const useQuery = ({
  apiCallback,
  additionalParams,
  refresh,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams();
  const [apiData, setApiData] = useState(null);
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page, params, refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setLoading(true);
    apiCallback(
      {
        pageIndex: getPageIndex(),
        pageSize: PAGE_SIZE,
        ...additionalParams,
      },
      params ?? {}
    ).then((apiData) => {
      setApiData(apiData);
      setLoading(false);
    });
  };

  const setPage = (page) => {
    if (isNumber(page)) {
      var toPath = `page-${page}`;
      const testPath = /\/page-\d+/g.test(location.pathname);
      if (testPath) {
        toPath = `../page-${page}`;
      }
      navigate(toPath, { replace: true });
    }
  };

  const setSearchParams = (searchParams) => {
    if (params || searchParams) {
      setParams(searchParams);
      setPage(1);
    }
  };

  const getPageIndex = () => {
    return page && (parseInt(page.replace("page-", "")) || 1);
  };

  return {
    data: apiData?.content.map((item, key) => ({ key, ...item })),
    totalCount: apiData?.totalCount ?? 0,
    pageSize: apiData?.pageSize ?? 0,
    loading,
    currentPage: getPageIndex(),
    setPageIndex: setPage,
    setSearchParams,
  };
};
