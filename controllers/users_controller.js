const User = require('../models/user')


//lets keep it same as before
module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title: 'WeSocial | User Profile',
            profile_user: user
        })
    })
    
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err){
            req.flash('success', 'Successfully updated you profile');
            return res.redirect('back');
        })
    }else{
        req.flash('error', 'You are unauthorized to update profile');
        return res.status(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        req.flash('success', 'Successfully Signed Up');
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'WeSocial | Sign Up'
    })
} 

//render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        req.flash('success', 'Successfully Signed Up');
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: 'WeSocial | Sign In'
    })
} 

//get the sign up data
module.exports.create = function(req, res){
    // console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords dont match!');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error', 'Unable to find the User');
            return;
        }

        if(!user){
            User.create(req.body, function(err,user){
                    if(err){
                        req.flash('error', 'Unable to sign up the user');
                        return;
                    }
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    })
}

//sign in and create a session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
} 

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have Logged Out!');
    return res.redirect('/');
}