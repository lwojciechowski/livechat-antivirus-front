import axios from "axios";
import {authRef} from "./chat-details/authRef";

const API_URL = process.env.REACT_APP_API_URL;

export const createInstallation = code => {
    return axios.post(
        `${API_URL}/install`,
        { code: code }
    );
};

export const getFiles = customerId => {
    return axios.get(
        `${API_URL}/customer/${customerId}/files`,
        {
            headers: {
                "Authorization": `Bearer ${authRef.token}`,
            }
        }
    );
}