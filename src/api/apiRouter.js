const BASE_URL = "http://localhost:5003";

export const USER_API_ROUTES = {
  LOGIN: `${BASE_URL}/api/Auth/login`,
  REGISTER: `${BASE_URL}/api/Auth/register/user`,
  GET_SMOKING_STATUS: `${BASE_URL}/api/SmokingStatus/current`,
  POST_SMOKING_STATUS: `${BASE_URL}/api/SmokingStatus`,
  GET_ACHIEVEMENTS: `${BASE_URL}/api/UserAchievement/my/progress`,
  GET_POSTS: `${BASE_URL}/api/Post`,
};
