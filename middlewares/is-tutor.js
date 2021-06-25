const User = require('../models/UserSchema');
let jwt = require('jsonwebtoken');

async function isTutor(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    let userid;
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split the space at the bearer
        const bearer = bearerHeader.split(' ');
        //Get token from string
        const bearerToken = bearer[1];
        let token = jwt.decode(bearerToken);
        userid = token.id;
    }
    await User.findById(userid).then((user) => {
        if (user && user.isTutor) {
            req.tutor = true;
            next();
        } else {
            next();
        }
    })
}

module.exports = isTutor;
