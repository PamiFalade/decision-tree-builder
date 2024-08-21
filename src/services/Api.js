// Connector to the database
import axios from "axios"

export default () => {                      // With axios.create, we can generate a client for any API and reuse the configuration for any calls
    return axios.create({
        baseURL: `http://localhost:6178/api`
    });
}