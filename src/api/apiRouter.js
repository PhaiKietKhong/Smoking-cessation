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
  GET_MESSAGES: `${BASE_URL}/api/Premium/chat/history`,
  GET_MY_COACH: `${BASE_URL}/api/Premium/coach/my-coach`,
  GET_CHAT_HISTORY: `${BASE_URL}/api/Premium/chat/history`,
  SEND_CHAT: `${BASE_URL}/api/Premium/chat/send`,
};

export const COMMON_API = {
  GET_POSTS: `${BASE_URL}/api/CommunityPost`,
  GET_POPULAR_POSTS: `${BASE_URL}/api/CommunityPost/popular`,
  CREATE_POST: `${BASE_URL}/api/CommunityPost`,
  LIKE_POST: `${BASE_URL}/api/CommunityPost`,
  GET_EXPERIENCE_POST: `${BASE_URL}/api/CommunityPost/category`,
  GET_MY_POSTS: `${BASE_URL}/api/CommunityPost/my-posts`,
  PUT_MY_POST: `${BASE_URL}/api/CommunityPost`,
  DELETE_MY_POST: `${BASE_URL}/api/CommunityPost`,
  GET_LEADERBOARD: `${BASE_URL}/api/SmokingStatus/leaderboard/money-saved`,
  GET_COMMENTS: `${BASE_URL}/api/CommunityPost`,
  POST_COMMENT: `${BASE_URL}/api/CommunityPost`,
  GET_COACHES: `${BASE_URL}/api/Premium/coach/available-coaches`,
  ASSIGN_COACH: `${BASE_URL}/api/Premium/coach/assign`,
};
