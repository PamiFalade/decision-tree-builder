// Connector to the database
import axios from "axios"

export default () => {                      // With axios.create, we can generate a client for any API and reuse the configuration for any calls
    const api = axios.create({
        baseURL: `http://localhost:6178/api`
    });

    api.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (!error.response) {
                console.log("Please check your internet connection.");
            }
            return Promise.reject(error)
        }
    )

    return api;
}