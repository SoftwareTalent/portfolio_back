var express = require('express');
var router = express.Router();
var Customer = require('./../model/customer');
const sgMail = require('@sendgrid/mail');

/* GET home page. */

router.get('/', function(req, res, next) {
  
    res.status(200).send("This is portfolio backend");
});

router.get('/customers', function(req, res, next) {
  Customer.find({}, function(err, customers) {
    if (err)
      return res.status(500).json({ message: 'Get User Error', error: err });

    // object of all the users
    res.status(200).json({ customers });
  });
});

router.post('/add', function(req, res, next) {
  console.log(req.body.name, req.body.email, req.body.phone, req.body.subject, req.body.description);
  var newCustomer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    description: req.body.description
  });
  newCustomer.save(function(err) {
    if (err) {
      return res.status(500).json({ message: 'Add User Error', error: err });
    }


    sgMail.setApiKey("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");
    const msg = {
      to: 'mobile_top@hotmail.com', 
      from: req.body.email, 
      subject: 'XXXXX', 
      text: req.body.description, 
    };
    sgMail.send(msg, function(err){
      console.log("~~~~~", err)
    });


    res.status(200).json({ message: 'User saved successfully!' });
  });
});



module.exports = router;
