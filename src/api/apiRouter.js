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
  GET_USER_PROGESS_BY_DATE_RANGE: `${BASE_URL}/api/Progress/date-range`,
  GET_SUGGEST_PLAN: `${BASE_URL}/api/Package/suggested-quit-plan`,
  POST_DAILY_PROGRESS: `${BASE_URL}/api/DailyProgress/daily`,
  PUT_DAILY_PROGRESS: `${BASE_URL}/api/Progress`,
  GET_REPORT_DASHBOARD: `${BASE_URL}/api/Report/dashboard`,
  POST_APPOINTMENT: `${BASE_URL}/api/Premium/meeting/book`,
  GET_APPOINTMENTS: `${BASE_URL}/api/Premium/meeting/my-meetings`,
};
