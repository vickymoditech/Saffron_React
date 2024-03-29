const ENVIRONMENT_DEVELOPMENT = {
    API_URL: "http://202.71.13.239:9000/api",
    PHOTO_URL: "http://202.71.13.239:9000/",
    SOCKET_URL: "http://202.71.13.239:9000",
    PRODUCT_IMAGE: "http://202.71.13.239:9000/images/UserAvatar/demo.png"
};

const ENVIRONMENT_PRODUCTION = {
    API_URL: "http://202.71.13.239:9000/api",
    PHOTO_URL: "http://202.71.13.239:9000/",
    SOCKET_URL: "http://202.71.13.239:9000",
    PRODUCT_IMAGE: "http://202.71.13.239:9000/images/UserAvatar/demo.png"
};

let ENVIRONMENT_VARIABLES;

if (process.env.NODE_ENV === "development") {
    ENVIRONMENT_VARIABLES = ENVIRONMENT_DEVELOPMENT;
} else {
    ENVIRONMENT_VARIABLES = ENVIRONMENT_PRODUCTION;
}

export default ENVIRONMENT_VARIABLES;
