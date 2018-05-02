var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/styles', express.static(__dirname + '/styles'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/res', express.static(__dirname + '/res'));

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: 'true',
    auth: {
        user: 'yourturnweb@gmail.com',
        pass: 'yourturn'
    }
});

function sendEmail(subjectValue, textValue) {

    var mailList = 'yourturnnav@gmail.com, sahilbhatt@hotmail.com, raycedvarg@gmail.com, justinjbronzell@yahoo.com';

    var mailOptions = {
      from: 'yourturnweb@gmail.com',
      to: mailList,
      subject: subjectValue,
      text: textValue
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log('Email sent: ' + info.response);
        return info.response;
      }
    });
}

app.set('port', (process.env.PORT || 5000));

app.get('', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

app.post('/sendfeedback', function(req, res) {
    var subject = 'YourTurn Website Feedback';
    var text = 'Feedback:\n' + req.body.feedback + '\n';
    var result = sendEmail(subject, text);
    // res.send(result);
    res.sendFile('index.html', {root: __dirname});
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
