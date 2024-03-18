// useFetch.js

import axios, { AxiosResponse } from "axios";
import { APIResponse } from "../model/response.model";

const fetchData = async <T>(url: string, token?: string | undefined) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {};
  const response: AxiosResponse<APIResponse<T>> = await axios.get(url, {
    headers,
  });

  return response;
};

export default fetchData;
