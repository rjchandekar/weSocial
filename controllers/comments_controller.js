const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email').execPopulate();
            //commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){console.log('Error in sending to the queue', err); return;}

                console.log('Job enqueued', job.id);
            })

            req.flash('success', 'You commented on this post');
            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            req.flash('success', 'Your comment got deleted');
            return res.redirect('back');
        }else{
            req.flash('error', 'Your cannot delete this comment');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}