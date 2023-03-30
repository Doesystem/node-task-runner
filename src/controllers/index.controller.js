const schedule = require('node-schedule');
const axios = require('axios');

exports.index = (req, res, next) => getIndex(req, res, next).catch(e => onError(e)).finally(onFinally);

onError = async function(e) {
    console.error(e);
};

onFinally = async function() {
}

getIndex = async function(req, res, next) {
    res.send("OK");
}

schedule.scheduleJob('* */10 * * * *', function () {
    console.log(new Date().toISOString())
});