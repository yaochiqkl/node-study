/**
 * session可以存放在
 * 1.内存           省事 不占用网络传输
 * 2.cookie         安全问题 增大传输量
 * 3.数据库         效率低
 * 4.redis等缓存    常见
 */
var express = require('express');
var session = require('express-session');
var app = express();
app.listen(3000);
app.use(session({
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 60 * 1000 }
}));
app.get('/', function(req, res) {
    //内存中存储session
    if (req.session.isVisit) {
        req.session.isVisit++;
        res.send('第' + req.session.isVisit + '次访问');
    } else {
        req.session.isVisit = 1;
        res.send("first visit");
        console.log(req.session);
    }
});