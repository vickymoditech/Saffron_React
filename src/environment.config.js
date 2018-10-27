const ENVIRONMENT_DEVELOPMENT = {
    API_URL:"http://dev.driveby.guzmanygomez.com:8181/api"
};

const ENVIRONMENT_PRODUCTION = {
    API_URL:"http://dev.driveby.guzmanygomez.com:8181/api"
};
let ENVIRONMENT_VARIABLES;
if (process.env.NODE_ENV === "development") {
    ENVIRONMENT_VARIABLES = ENVIRONMENT_DEVELOPMENT;
} else {
    ENVIRONMENT_VARIABLES = ENVIRONMENT_PRODUCTION;
}

export default ENVIRONMENT_VARIABLES;
