import { API_STATUS, HTTP_METHOD } from "../config/common";
import queryString from "query-string";
import { getToken } from "./cookies";

export const API_HOST = "http://localhost:3330";

export const makeRequest = async (method, url, data, option = {}) => {
    let res = null;
    console.log(
        "makeRequest",
        `${API_HOST}${url}?${queryString.stringify(data)}`
    );
    if (method === HTTP_METHOD.GET || method === HTTP_METHOD.DELETE) {
        res = await (
            await fetch(`${API_HOST}${url}?${queryString.stringify(data)}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getToken(),
                },
            })
        ).json();
    } else {
        res = await (
            await fetch(`${API_HOST}${url}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getToken(),
                },
                body: JSON.stringify(data || {}),
            })
        ).json();
    }

    // if (res && res.status === API_STATUS.AUTHENTICATE) {
    //     window.location.href = "/login";
    // }
    return res;
};
