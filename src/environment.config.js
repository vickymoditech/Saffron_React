const ENVIRONMENT_DEVELOPMENT = {
    API_URL: "http://192.168.200.113:9000/api",
    PHOTO_URL: "http://192.168.200.113:9000/",
    SOCKET_URL: "http://192.168.200.113:9000"
};

const ENVIRONMENT_PRODUCTION = {
    API_URL: "http://192.168.200.18:9000/api",
    PHOTO_URL: "http://192.168.0.5:9000/",
    SOCKET_URL: "http://192.168.200.18:9000"
};
let ENVIRONMENT_VARIABLES;
if (process.env.NODE_ENV === "development") {
    ENVIRONMENT_VARIABLES = ENVIRONMENT_DEVELOPMENT;
} else {
    ENVIRONMENT_VARIABLES = ENVIRONMENT_PRODUCTION;
}

export default ENVIRONMENT_VARIABLES;