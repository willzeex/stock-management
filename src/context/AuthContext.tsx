import React, { createContext, useState, useEffect, useContext } from 'react';

import * as api from '../services/api';
import { useRouter } from 'next/router';
import { AuthResponseModel } from 'src/models/auth/auth-response-model';
import axios from 'axios';
import { ApiResponseModel } from 'src/models/shared/api-response-model';
import { jwtDecode } from 'jwt-decode'

export interface AuthContextData {
    signed: boolean;
    user: object | null;
    Login(user: object): Promise<void>;
    Logout(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);
    const router = useRouter();

    const authApi = axios.create({
        baseURL: 'https://no-azul-api.onrender.com/api/v1/auth',
        timeout: 100000,
        headers: { 'X-Custom-Header': 'foobar' }
    });

    useEffect(() => {
        if (!user) router.push('/pages/login');

        const storagedUser = sessionStorage.getItem('@App:user');
        const storagedToken = sessionStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, []);

    async function Login(userData: any) {
        try {
            const defaults = {
                headers: {
                    "Accept": '*/*',
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            };

            const response = await authApi.post<ApiResponseModel<AuthResponseModel>>('/authenticate', { email: userData.email, password: userData.password }, defaults);

            if (response.data.error) {
                console.log(response.data.error)
            } else {
                const jwtToken = response.data.result.jwtToken;

                api.defaults.headers.Authorization = `Bearer ${jwtToken}`;

                sessionStorage.setItem('@App:user', JSON.stringify(jwtDecode(jwtToken)));
                sessionStorage.setItem('@App:token', jwtToken);

                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    function Logout() {
        setUser(null);
        sessionStorage.removeItem('@App:user');
        sessionStorage.removeItem('@App:token');
        router.push('/pages/login');
    }

    return (
        <AuthContext.Provider
            value={{ signed: Boolean(user), user, Login, Logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};