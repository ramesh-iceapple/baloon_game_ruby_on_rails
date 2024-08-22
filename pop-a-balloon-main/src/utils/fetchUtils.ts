import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

/**
 * Created a default timeout of 5seconds. Please make sure
 * that the API should not be taking more than 200-500ms to
 * resolve. If it does, raise a ticket on JIRA indicating the
 * endpoint of the API.
 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 5000,
  headers: {
    ...defaultHeaders,
  },
});

/**
 * This is a request interceptor i.e. we can send any kind of
 * data herein in the config file. Seldom use, but very useful
 * to set Headers and specifying cache resolutions and matching
 * up etags for cache results.
 */
// axiosInstance.interceptors.request.use((config: any) => {
//   const tokens = getTokensLocalStorage();
//   if (tokens.authToken)
//     config.headers.Authorization = `Bearer ${tokens.authToken}`;
//   config.headers.SiteId = getSiteFromLocalStorage();
//   return config;
// });

// function createAxiosResponseInterceptor(
//   store: any,
//   setCanRedirectToSignIn: any
// ) {
//   const interceptor = axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//       // Reject promise if usual error
//       if (error.response.status !== 401) {
//         return Promise.reject(error);
//       }
//       const requestUrl = error.request.responseURL;
//       if (requestUrl.includes('/Auth/refresh')) {
//         const {
//           auth: { canRedirectToSignIn },
//         } = store.getState();
//         if (!canRedirectToSignIn) {
//           store.dispatch(setCanRedirectToSignIn(true));
//         }
//         return Promise.reject(error);
//       }

//       /*
//        * When response code is 401, try to refresh the token.
//        * Eject the interceptor so it doesn't loop in case
//        * token refresh causes the 401 response.
//        *
//        * Must be re-attached later on or the token refresh will only happen once
//        */
//       axiosInstance.interceptors.response.eject(interceptor);
//       const { authToken, refreshToken } = getTokensLocalStorage();
//       return axiosInstance
//         .post(`${process.env.NX_API_URL}/api/Auth/refresh`, {
//           authToken,
//           refreshToken,
//         })
//         .then((response: any) => {
//           // Retry the initial call, but with the updated token.
//           // Resolves the promise if successful
//           saveTokensToLocalStorage({
//             authToken: response.authToken,
//             refreshToken: response.refreshToken,
//           });
//           return axiosInstance(error.response.config);
//         })
//         .catch(error2 => {
//           // Retry failed, clean up and reject the promise
//           const {
//             auth: { canRedirectToSignIn },
//           } = store.getState();
//           if (!canRedirectToSignIn) {
//             store.dispatch(setCanRedirectToSignIn(true));
//           }
//           return Promise.reject(error2);
//         })
//         .finally(() => {
//           createAxiosResponseInterceptor(store, setCanRedirectToSignIn);
//         }); // Re-attach the interceptor by running the method
//     }
//   );
// }

// export default function setupAxios(store: any, setCanRedirectToSignIn: any) {
//   createAxiosResponseInterceptor(store, setCanRedirectToSignIn);
// }

/**
 * here is a simple representation of how the API calls should be made
 * on top of every request.
 */
class FetchUtilsClass {
  getRequest = async <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    headers?: any
  ) => axiosInstance.get<T>(url, { headers: headers ?? {} });

  patchRequest = async (url: string, body: any) =>
    axiosInstance.patch(url, body);

  putRequest = async (url: string, body: any) => axiosInstance.put(url, body);

  postRequest = async <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    body?: any,
    headers?: any
  ) => axiosInstance.post<T>(url, body, { headers: headers ?? {} });

  deleteRequest = async (url: string) => axiosInstance.delete(url);

}
const FetchUtils = new FetchUtilsClass();

export { FetchUtils };