const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

module.exports = function (app) {
  app.get('/', (req, res) => {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const response =
    {
      status: 200,
      info: "live"
    };
    res.json(response);
  });

  app.post('/',
    body("name").exists(),
    body("email").exists().isEmail(),
    body('phone').optional().isMobilePhone(),
    body("message").exists(),
    (req, res) => {

      if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res.status(401).json({ message: 'Missing Authorization Header' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }


      const name = req.body.name;
      const email = req.body.email;
      const phone = req.body.phone;
      const message = req.body.message;

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'johnrym21@gmail.com',
          pass: 'Rimje@nj@son1'
        }
      });

      var mailOptions = {
        from: 'johnrym21@gmail.com',
        to: 'jraoun@mymada.com',
        subject: 'Enquiry request from ' + name + ' ' + phone,
        text: 'Email: ' + email + "\n" +
          'Message: ' + message
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          const response =
          {
            status: 200,
            info: info.response
          };
          res.json(response);
        }
      });

    })
}