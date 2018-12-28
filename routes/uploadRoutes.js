const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const clearCache = require('../middlewares/clearCache');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const Day = mongoose.model('Day');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    region: 'us-east-2'
});

module.exports = app => {
    app.get('/api/upload', requireLogin, clearCache, (req, res) => {
        const key = `${req.user.id}/${uuid()}/.jpeg`;

        s3.getSignedUrl('putObject', {
            Bucket: 'daily-diary-bucket',
            ContentType: 'image/jpeg',
            Key: key
        }, (err, url) => res.send({key, url})
        );
    });

    app.post('/api/delete', requireLogin, clearCache, (req, res) => {

        const imageUrl = req.body.imageUrl;

        if(imageUrl) {
            s3.deleteObject({
            Bucket: 'daily-diary-bucket',
            Key: imageUrl
            },function (err,data){})
        }

        const id = req.body._id;

        Day.findByIdAndRemove(id, (err, day) => {
            if (err) return res.status(500).send(err);
            
            return res.status(200).send(id + " successfully deleted");
        });
    });
};