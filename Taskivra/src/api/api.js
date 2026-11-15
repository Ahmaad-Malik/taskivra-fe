// backend base url, used with axios in the pages
// example: axios.get(BASE_URL + "/auth/profile")
const BASE_URL = "http://localhost:5000/api"

// PREVIEW_MODE = true means the backend is not connected yet.
// The app starts with a demo user and a demo admin already logged in,
// so every page can be opened from the url while building the frontend.
// Change this to false when the APIs are connected.
export const PREVIEW_MODE = true

export default BASE_URL
