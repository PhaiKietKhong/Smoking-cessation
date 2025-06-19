const BASE_URL = "http://localhost:5000";

export const USER_API_ROUTES = {
  LOGIN: `${BASE_URL}/api/Auth/login`,
  REGISTER: `${BASE_URL}/api/Auth/register`,
  GET_SMOKING_STATUS: `${BASE_URL}/api/SmokingStatus/my-status`,
  POST_SMOKING_STATUS: `${BASE_URL}/api/SmokingStatus`,
  GET_ACHIEVEMENTS: `${BASE_URL}/api/Achievement`,
  GET_POSTS: `${BASE_URL}/api/CommunityPost`,
  GET_QUITPLAN: `${BASE_URL}/api/QuitPlan/my-plans`,
  GET_BRINKMAN: `${BASE_URL}/api/SmokingStatus/brinkman-index`,
  GET_SUGGEST_PLAN: `${BASE_URL}/api/Package/suggested-quit-plan`,
};
