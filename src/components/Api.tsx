import axios from 'axios';

const excludeUrls:[] = [
];
const excludeUrlsResponsen = [
];
const interceptMethods = ['post', 'put', 'patch', 'delete',];

const APP_PAYLOAD_IN_HEADER = false

const Api = axios.create({
  baseURL: 'http://52.91.162.243:8000/',
  // baseURL: 'http://localhost:8000/',
  //@ts-ignore
  headers: {
    'Content-Type' : 'multipart/form-data',
    Accept: 'application/json, image/png ,image/jpeg , image/jpg',

  },
  withCredentials:true,
  timeout: 30000,
  timeoutErrorMessage: 'Tempo de conexão excedida, tente novamente mais tarde',
});
Api.interceptors.request.use((request) => {
  if (APP_PAYLOAD_IN_HEADER) {
    //@ts-ignore
    if (excludeUrls.indexOf(request.url) < 0 && interceptMethods.indexOf(request.method) >= 0) {
      if (request.data) {
        request.headers['payload'] = JSON.stringify(request.headers);
      }
    }
  }
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;

  }
  return request;
});
Api.interceptors.response.use(
  (response) => {
    // if (response?.data?.success === false && excludeUrlsResponse.indexOf(response.config.url) === -1) {
    //   return Promise.reject(response.data);
    // }
    return Promise.resolve(response.data);
  },
  (error) => {
    //IF NOT AUTHENTICATED GO TO HOME PAGE
    if(error?.response?.data.message == 'Unauthenticated.'){
      localStorage.setItem('access_token','');
      window.location.href = "/"
    }
    else{
      console.log(error)
      return Promise.reject(
        error?.response?.data  ??
        new Error('Ops, parece que você está sem acesso à internet ou nosso sistema está fora do ar. Por favor tente novamente em alguns minutos. Caso o erro persista entre em contato pelos nossos canais de atendimento.')
      );
    }

  }
);
export default Api;
