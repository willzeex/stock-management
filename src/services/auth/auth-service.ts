import axios from "axios";
import { AuthResponseModel } from "src/models/auth/auth-response-model";

const authApi = axios.create({
    baseURL: 'https://no-azul-api.onrender.com//api/v1/auth',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default async function auth(user: string, password: string) {
    try {
        const response = await authApi.post<AuthResponseModel>('/authenticate', { email: user, password: password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}