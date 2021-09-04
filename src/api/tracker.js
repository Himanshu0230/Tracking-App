import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
    baseURL:'http://57f0-103-253-174-86.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;