    'use strict'
    const jwt = require('jsonwebtoken'); 
    const db = require('../models/connection');

    exports.getAUserInfo=function(req, res, next) {
        var secret='xxx';
        return getCookie(req,res,secret);
    };

    exports.getUserInfoFromDB=function (username, password){
        return db.one(`select * from user_info where user_name='${username}' and password='${password}'`);
    };
    exports.setUserCookie = (userDetails, res) => {
        const payload = {
              id: userDetails.id
          };
            const secret='xxx'; 
            const token = jwt.sign(payload,secret);
            res.cookie('jwt',token);
            return Promise.resolve(true);
    };

    function getCookie(req,res,secret){
          var secret='xxx'; 
        if(req.cookies.jwt){
          var decoded= jwt.verify(req.cookies.jwt,secret);
          return getUserInfoFromCookie(decoded,req,res);
        }
    }

    function getUserInfoFromCookie(data,req,res){
        db.any(`select * from user_info where id=${data.id}`)
        .then(data=> {
            return res.render('userList', { users: data}); 
        })
        .catch(function(err){
            console.log("not found"+err);
            return next(err);
        });
    }

    exports.getUserList=function(){
        return db.any(`select * from user_info`);
    }

    exports.getFilteredUserList=function(name,gender,age){
          let query=`select * from user_info`;
          let whereConditions = [];
          if(name) {
            whereConditions.push(`name = '${name}'`);
          }
          if( gender) {
            whereConditions.push(`gender = '${gender}'`);  
          }
          if(age) {
            whereConditions.push(`age = ${age}`);
          }
          if(whereConditions.length > 0) {
            query += ` where ${whereConditions.join(' and ')}`
          }
          console.log(query);
          return db.any(query);
    }





 //  if(name && gender && age){
    //    return db.any(`select * from user_info where name='${name}' and sex='${gender}' and age=${age}`);
    //  }
    //  else if(name && gender) {
    //    return db.any(`select * from user_info where name='${name}' and sex='${gender}'`);
    //  }
    //  else if(name && age){
    //   return db.any(`select * from user_info where name='${name}' and age=${age}`);
    //  }
    //  else if(age && gender){
    //   return db.any(`select * from user_info where age=${age} and sex='${gender}'`);
    //  }

// function getUserInfoFromDB(req,res,secret){
  //   return new Promise((resolve,reject)=> {
  //   db.any("select * from user_info where user_name="+"'"+req.query.username+"'",(err,res)=> err ?reject(err) : resolve(res.rows)); 
  // });
  // }
  
  // function getToken(data,req,res,secret){
  //   console.dir(data[0].id);
  //   const payload = {
  //     admin: 123,
  //     id:data[0].id
  //   };
  //   const token=jwt.sign(payload,secret);
  //   res.cookie('jwt',token);
  //   return res.render('userList', { users: data});      
  // }




// function getUserInfoFromDB(req,res,secret){
//   const query="select * from user_info where user_name="+"'"+req.query.username+"'";
//   return new Promise((resolve, reject) => {
//     db.any(query, (err, result) => err ? reject(err) : getToken(resolve(result.rows),secret,req,res));
// });
// }

// function getToken(data,secret,req,res){
//   console.log("+++++++++++++++++++++=");
//   const payload = {
//     admin: 123,
//     id:data[0].id
//   };
//   const token=jwt.sign(payload,secret);
//   res.cookie('jwt',token);
//   return res.render('userList', { users: data});      
// //});
// }

  // exports.getAllUserInfo=function (req, res, next) {
  //      db.any("select * from user_info")
  //        .then(data=> {
  //          return res.render('userList', { users: data });      
  //        })
  //        .catch(function (err) {
  //          console.log("not found"+err);
  //          return next(err);
  //        });   
  //    }

  // exports.createUserInfo=function(req, res, next) {
  //   db.none("select * from  into user_info(name, occupation, age, sex)" +
  //       "values('test', 'Professor', 29, 'F')",
  //     req.body)
  //     .then(()=> { 
  //       const payload = {
  //         admin: 123
  //       };
  //       var token = jwt.sign(payload, "1234", {
          
  //       });
  //       res.cookie('jwt', token);
  //       res.status(200)
  //         .json({
  //           status: 'success',
  //           message: 'Inserted one user',
  //           token: token
  //         });
  //     })
  //     .catch(function (err) {
  //       console.log("created user");
  //       return next(err);
  //     });
  // }

