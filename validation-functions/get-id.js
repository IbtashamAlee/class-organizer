let jwt = require('jsonwebtoken');

function getId(token) {
    token = jwt.decode(token);
    return token.id;
}

module.exports = getId;
