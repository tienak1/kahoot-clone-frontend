import { HTTP_METHOD } from "../config/common";
import { makeRequest } from "../utilities/api";

const URI = "/presentation";
const JOIN_URI = "/presentation-join";
const QUESTION_URI = "/presentation/question";
export const SLIDE_TYPE = {
    MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
    PARAGRAPH: "PARAGRAPH",
    HEADING: "HEADING",
};
export const getPresentationByID = async ({ presentationID }) => {
    return makeRequest(HTTP_METHOD.GET, `${URI}/${presentationID}`);
};

export const list = async () => {
    const res = await makeRequest(HTTP_METHOD.GET, URI + "/");
    return res;
};

export const create = async () => {
    const res = await makeRequest(HTTP_METHOD.POST, URI);
    return res;
};

export const autoSave = async (data) => {
    const name = data.name;
    const slides = data.slides;
    const res = await makeRequest(
        HTTP_METHOD.POST,
        `${URI}/${data.presentationID}`,
        data
    );
    return res;
};

export const ViewerGetPresentation = async ({ inviteCode }) => {
    return makeRequest(HTTP_METHOD.GET, `${JOIN_URI}/${inviteCode}`);
};

export const submitAnswer = async ({
    slideID,
    option,
    presentationID,
    accountID,
}) => {
    return makeRequest(HTTP_METHOD.POST, `${JOIN_URI}/submit`, {
        slideID,
        option,
        presentationID,
        accountID,
    });
};

export const sendQuestionToHost = async ({ question, presentationID }) => {
    return makeRequest(HTTP_METHOD.POST, `${QUESTION_URI}`, {
        question,
        presentationID,
    });
};

export const getQuestionList = async ({ presentationID, isAnswered }) => {
    return makeRequest(HTTP_METHOD.GET, `${QUESTION_URI}`, {
        presentationID,
        isAnswered,
    });
};

export const nextSlide = async ({ presentationID, slideID }) => {
    return makeRequest(HTTP_METHOD.POST, `${URI}/next-slide`, {
        presentationID,
        slideID,
    });
};

export const createSlide = async ({ presentationID }) => {
    return makeRequest(HTTP_METHOD.POST, `${URI}/slide`, { presentationID });
};

export const deletePresentation = async ({ presentationID }) => {
    return makeRequest(HTTP_METHOD.POST, `${URI}/delete`, { presentationID });
};

export const displayResult = async ({ presentationID, slideID }) => {
    return makeRequest(HTTP_METHOD.POST, `${URI}/display-result`, {
        presentationID,
        slideID,
    });
};

export const markAsAnsweredQuestion = async ({ questionID }) => {
    return makeRequest(HTTP_METHOD.POST, `${QUESTION_URI}/answer`, {
        questionID,
    });
};
