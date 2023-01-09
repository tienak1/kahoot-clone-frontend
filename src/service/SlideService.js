import { HTTP_METHOD } from "../config/common";
import { makeRequest } from "../utilities/api";

const URI = "/presentation";

export const updateSlideType = async (data) => {
    const res = await makeRequest(HTTP_METHOD.PUT, URI, data);
    console.log(res);
};
