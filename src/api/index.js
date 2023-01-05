import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).accessToken
    }`;
  }
  return req;
});

// USER
export const fetchUsers = () => API.get("/user");
export const createUser = (newUser) => API.post("/user", newUser);
export const updateUser = (id, updatedUser) =>
  API.patch(`/user/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/user/${id}`);

// GROUP
export const getAllGroup = () => API.get("/group");
export const createNewGroup = (data) => API.post("/group", data);
export const deleteGroup = ({ groupId, userId }) =>
  API.delete(`/group/${groupId}/deleteGroup/${userId}`);
export const addMember = ({ userId, groupName, role }) =>
  API.patch(`/group/addMember`, { userId, groupName, role });
export const changeRole = ({ groupId, memberId, newRole }) =>
  API.patch(`/group/changeRole`, { groupId, memberId, newRole });
export const deleteMemberFromGroup = ({ groupId, memberId }) =>
  API.delete(`/group/deleteMember`, { groupId, memberId });

// QUIZES
export const fetchQuizes = () => API.get("/quizes");
export const fetchPublicQuizes = (page) =>
  API.get(`/quizes/public?page=${page}`);
export const fetchQuizesBySearch = (searchQuery) =>
  API.get(
    `/quizes/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags || "none"
    }`
  );
export const fetchTeacherQuizes = (teacherId) =>
  API.get(`/quizes/teacher/${teacherId}`);
export const fetchQuestions = (quizId) => API.get(`/quizes/${quizId}`);
export const createQuiz = (newQuiz) => API.post("/quizes", newQuiz);
export const createQuestion = (quizId, newQuestion) =>
  API.post(`/quizes/${quizId}/questions`, newQuestion);
export const updateQuestion = (quizId, questionId, updatedQuestion) =>
  API.patch(`/quizes/${quizId}/questions/${questionId}`, updatedQuestion);
export const updateQuiz = (id, updatedQuiz) =>
  API.patch(`/quizes/${id}`, updatedQuiz);
export const deleteQuiz = (id) => API.delete(`/quizes/${id}`);
export const likeQuiz = (id, userId) =>
  API.patch(`/quizes/${id}/likeQuiz/${userId}`);
export const commentQuiz = (comment, id) =>
  API.post(`/quizes/${id}/commentQuiz`, { comment });
export const fetchQuiz = (id) => API.get(`/quizes/${id}`, id);

// GAME
export const createGame = (newGame) => API.post("/games", newGame);
export const fetchGame = (id) => API.get(`/games/${id}`, id);
export const addPlayer = (gameId, playerId) =>
  API.patch(`/games/${gameId}/players`, { playerId });

// PLAYER RESULTS
export const createPlayerResult = (newPlayerResult) =>
  API.post("/playerResults", newPlayerResult);
export const fetchPlayerResult = (id) => API.get(`/playerResults/${id}`, id);
export const addAnswer = (newAnswer, id) =>
  API.patch(`/playerResults/${id}/answers`, { newAnswer });

// LEADERBOARD
export const createLeaderboard = (newLeaderboard) =>
  API.post("/leaderboard", newLeaderboard);
export const fetchLeaderboard = (id) => API.get(`/leaderboard/${id}`, id);
export const addPlayerResult = (playerResult, id) =>
  API.patch(`/leaderboard/${id}/playerresult`, playerResult);
export const updateQuestionLeaderboard = (questionResult, id) =>
  API.patch(`/leaderboard/${id}/questionleaderboard`, questionResult);
export const updateCurrentLeaderboard = (result, id) =>
  API.patch(`/leaderboard/${id}/currentleaderboard`, result);

// const AUTH_API = axios.create({ baseURL: "http://localhost:4000/api/auth" });

// export const login = (formData) => AUTH_API.post("/login", formData);
// export const register = (formData) => AUTH_API.post("/register", formData);
