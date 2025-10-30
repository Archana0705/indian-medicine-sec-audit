const environment = "dev";

const baseUrls = {
    // dev: "http://10.236.210.57/tnapex_api",
    dev: "https://tngis.tnega.org/medical_indent_api/v1",
    prod: "https://tngis.tnega.org/medical_indent_api/v1"

};

const BASE_API_URL = baseUrls[environment];
const BASE_UPLOAD_URL = BASE_API_URL.replace(/\/v1$/, '') + "/uploads/";




