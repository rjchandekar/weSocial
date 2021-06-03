const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')
    
    nodemailer.transporter.sendMail({
        from: 'nu104075@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    },(err, info) =>{
        if(err){
            console.log('Error in sending the mail', err);
            return;
        }
        console.log('Mail Delivered', info);
        return;
    });
}