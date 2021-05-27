const User = require('../models/user')

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                })
            }
            return res.redirect('/users/sign-in')
        })
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'WeSocial | Sign Up'
    })
} 

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: 'WeSocial | Sign In'
    })
} 

//get the sign up data
module.exports.create = function(req, res){
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding the User in signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('Error in signing up the User');
                    return;
                }
            });
            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }
    })
}

//sign in and create a session for user
module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('Error in finding the User in signing up');
            return;
        } 
        //handle if user is found
        if(user){
            //handle mismatching of password 
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user._id);
            res.redirect('/users/profile');
        }else{
            //handle if use is not found
            return res.redirect('back');
        }
    })
    

    

    //handel if user is not found
} 