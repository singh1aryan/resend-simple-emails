const express = require('express');
const bodyParser = require('body-parser');
const Resend = require('resend');

const app = express();
const port = 3000;

// Initialize Resend with your API key
const resend = new Resend('your_resend_api_key_here');

// Body parser middleware to handle JSON data
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { to, subject, message } = req.body;

    resend.emails.send({
        from: 'onboarding@resend.dev', // Your verified sender
        to: to,
        subject: subject,
        html: `<p>${message}</p>`
    })
    .then(response => {
        console.log('Email sent', response);
        res.send({ status: 'success', message: 'Email sent successfully' });
    })
    .catch(error => {
        console.error('Error sending email', error);
        res.status(500).send({ status: 'error', message: 'Failed to send email' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
