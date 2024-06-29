importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORRAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyAM5c12jhgsSf9GtEER4oRuAStd63P0THU",
    authDomain: "jobberwin-92f50.firebaseapp.com",
    projectId: "jobberwin-92f50",
    storageBucket: "jobberwin-92f50.appspot.com",
    messagingSenderId: "592502623475",
    appId: "1:592502623475:web:6ece47f36cfe0e03f0bb86",
    measurementId: "G-7QSFKH2EWG"
  };
console.log(firebaseConfig); console.log('this is result...');
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});