const SessionUtils = {}
let ERROR = require("../utils/error")


SessionUtils.security = {}
SessionUtils.security.checkAuthorization = (req, authorization)=>{
    if(req.session.authorization.indexOf(authorization) === -1){
        throw new Error(ERROR.AUTHORIZATION_ERROR);
    }
}

module.exports = SessionUtils