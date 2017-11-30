'use strict'
module.exports = function (app) {
    const api = require('../apis/api');
    console.log('route');

    app.route('/login')
        .post((req, res) => {
            if(req.cookies && req.cookies.jwt) {
                res.redirect('/profile');
            } 
            else if(req.body && req.body.username && req.body.password) {
                const username = req.body.username;
                const password = req.body.password;
                api.getUserInfoFromDB(username, password)
                    .then(userDetails => api.setUserCookie(userDetails, res))
                    .then(_ => res.redirect('/profile'))
                    .catch(err => {
                        return res.render('form', {err: 'invalidUsernameOrPassword', username: username, invalidUsernamePassword: true}); 
                    });
            } else {
                let errObj = {
                    err: 'parametersNotFound',
                    username: req.body.username,
                    usernameParameterNotFound: false,
                    passwordParameterNotFound: false
                };
                if(!req.body.username) {
                    errObj.usernameParameterNotFound = true;
                }
                if(!req.body.password) {
                    errObj.passwordParameterNotFound = true;
                }
                return res.render('form', errObj);
            }     
        });
    app.route('/profile')
        .get(api.getAUserInfo);

    app.route('/profileList')
       .get((req,res)=> {
            api.getUserList()
                .then(data=>res.render('search',{users:data}))
                .catch(err=>{
                    res.send("Bad request");
                });
        })
        .post((req,res)=>{
            const name = req.body.name;
            const gender = req.body.gender;
            const age=req.body.age;
            api.getFilteredUserList(name,gender,age)
                .then(data=> { res.render('search',{users:data})})
                .catch(err=>{
                    console.log(err);
                    res.send("Bad request");
            }); 
        });
  
}