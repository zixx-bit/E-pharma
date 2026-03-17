import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
    withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

// Handle logout and prevent infinite loop
const handleLogout = () => {
    if (window.location.pathname !== "/login") {
        window.location.href = "/login";
    }
}

// handle adding a new access token to queued requests
const addAccessTokenToQueuedRequests = (callback: () => void) => {
    refreshSubscribers.push(callback);
}

//execute queued requests after refresh
const onRefreshSuccess = () => {
    refreshSubscribers.forEach((callback) => callback());
    refreshSubscribers = [];
}
//handle API requests
axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
);
//handle expired tokens and refresh logic
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        //prevent inifinte retry loop
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (!isRefreshing) {
                isRefreshing = true;
                return axiosInstance
                    .post("/api/refresh-token-user")
                    .then((response) => {
                        const accessToken = response.data.accessToken;
                        axiosInstance.defaults.headers.common["Authorization"] =
                            `Bearer ${accessToken}`;
                        localStorage.setItem("accessToken", accessToken);
                        onRefreshSuccess();
                        return axiosInstance(originalRequest);
                    })
                    .catch((error) => {
                        handleLogout();
                        return Promise.reject(error);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            }
            return new Promise((resolve, reject) => {
                addAccessTokenToQueuedRequests(() => {
                    resolve(axiosInstance(originalRequest));
                });
            });
        }
        return Promise.reject(error);
    }
);