import * as configCat from "configcat-js"
const logger = configCat.createConsoleLogger(3)


const configCatClient = configCat.createClient("pxfaCD6BN0OETT7FreVx0A/oOG9oRCZukOOxRxRkckkmw", {
    pollIntervalSeconds: 95,
    logger: logger
})

export default configCatClient;