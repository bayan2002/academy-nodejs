const admin = require('firebase-admin');

const serviceAccount = require('./moaley1-firebase-adminsdk-f0je6-cca4b93de4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const registrationToken = '';

const message = {
  notification: {
    title: '',
    body: ''
  },
  token: registrationToken
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent notification:', response);
  })
  .catch((error) => {
    console.error('Error sending notification:', error);
  });
