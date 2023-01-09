import { API_HOST } from "../utilities/api";

export const GOOGLE_CLIENT_ID =
    "325824298942-ah8nul99q7kunf6hakru6btjrv3kn240.apps.googleusercontent.com";
export const HOST_URL = "http://localhost:3000";
export const SECRET_GROUP = "secret-group";
export const SOCKET_URL = API_HOST;
export const SOCKET_TYPE = {
    SUBMIT_ANSWER: "SUBMIT_ANSWER",
    CHANGE_PRESENTATION: "CHANGE_PRESENTATION",
    NEXT_SLIDE: "NEXT_SLIDE",
    REMOVE_MEMBER: "REMOVE_MEMBER",
    SUBMIT_QUESTION: "SUBMIT_QUESTION",
    UPVOTE_QUESTION: "UPVOTE_QUESTION",
    MARKED_AS_ANWSERED_QUESTION: "MARKED_AS_ANWSERED_QUESTION",
    SEND_MESSAGE: "SEND_MESSAGE",
    START_PRESENTATION: "START_PRESENTATION",
};
export const SECRET_PRESENTATION = "secret-presentation";
