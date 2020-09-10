import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createInstallation = code => {
    return axios.post(
        `${API_URL}/install`,
        { code: code }
    );
};