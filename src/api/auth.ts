import { AxiosError, AxiosResponse } from "axios";
import { client } from "@services/axios";

const URL_LOGIN = '/auth/local/';


export function userLogin(
    values: any,//TODO: TYPE IT
  ): Promise<AxiosError | AxiosResponse> {
    return client.post(URL_LOGIN, values);
  }