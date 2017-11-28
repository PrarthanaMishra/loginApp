'use strict'
module.exports = function (app) {
    const api = require('../apis/api');
    console.log('route');

    app.route('/login')
        .post((req, res) => {
            if(req.cookies && req.cookies.jwt) {
                res.redirect('/profile');
            } else {
                const username = req.body.username;
                const password = req.body.password;
                api.getUserInfoFromDB(username, password)
                    .then(userDetails => api.setUserCookie(userDetails, res))
                    .then(_ => res.redirect('/profile'))
                    .catch(err => {
                        res.send('User not found');
                    });
            
            }
        });

    app.route('/profile')
        .get(api.getAUserInfo);
       
}