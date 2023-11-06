import React, { createContext, useState, useEffect, useContext } from 'react';

import * as api from '../services/api';
import { useRouter } from 'next/router';
import { AuthResponseModel } from 'src/models/auth/auth-response-model';
import axios from 'axios';
import { ApiResponseModel } from 'src/models/shared/api-response-model';
import { jwtDecode } from 'jwt-decode'
import { UserModel } from 'src/models/auth/user-model';

export interface AuthContextData {
    signed: boolean;
    user: object | null;
    login(user: object): Promise<void>;
    logout(): void;
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
        const storagedUser = sessionStorage.getItem('@App:user');
        const storagedToken = sessionStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }

        if (!user) router.push('/pages/login');
    }, []);

    async function login(userData: any) {
        try {
            const defaults = {
                headers: {
                    "Accept": '*/*',
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            };

            const response = await authApi.post<ApiResponseModel<AuthResponseModel>>('/login', { email: userData.email, password: userData.password }, defaults);

            if (response.data.error) {
                console.log(response.data.error)
            } else {
                const jwtToken = response.data.result.accessToken;

                api.defaults.headers.Authorization = `Bearer ${jwtToken}`;

                sessionStorage.setItem('@App:user', JSON.stringify(jwtDecode(jwtToken)));
                sessionStorage.setItem('@App:token', jwtToken);
                setUser(user);

                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('@App:user');
        sessionStorage.removeItem('@App:token');
        router.push('/pages/login');
    }

    return (
        <AuthContext.Provider
            value={{ signed: Boolean(user), user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer