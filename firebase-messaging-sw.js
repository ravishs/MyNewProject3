// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup

// importScripts('https://www.gstatic.com/firebasejs/5.0.2/firebase.js');
importScripts(
    'https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js',
    'https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');

const messagingSenderId = new URL(location).searchParams.get('messagingSenderId');
firebase.initializeApp({
    'messagingSenderId': messagingSenderId
});

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler( payload => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // Customize notification here
    let notificationTitle = 'Background Message';
    if (payload.data && payload.data.title) notificationTitle =  payload.data.title;
    let body = '';
    if (payload.data && payload.data.body) body =  payload.data.body;
    let notificationOptions = {
        body: body,
        icon: '/img/logo_small.png'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// When the user clicks a notification focus the window if it exists or open
// a new one otherwise.
self.addEventListener('notificationclick', event => {
    console.log('[firebase-messaging-sw.js] notificationclick ', event);
    const clickedNotification = event.notification;
    clickedNotification.close();

    const urlToOpen = self.location.href.substring(0, self.location.href.indexOf('firebase-messaging-sw.js'));
    console.log('urlToOpen', urlToOpen);

    const promiseChain = clients.matchAll(
        {
            type: 'window',
            includeUncontrolled: true
        })
        .then((windowClients) => {
            let matchingClient = null;

            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                console.log('windowClient.url', windowClient.url);
                if (windowClient.url.includes(urlToOpen)) {
                    matchingClient = windowClient;
                    // Todo:
                    // The following break is commented on purpose
                    // The reason is that we need to check how often is the case
                    // where more than one creator window are open
                    // break;
                }
            }

            if (matchingClient) {
                // message to the client
                let messageData = new Object({
                    data: {
                        title: clickedNotification.title,
                        body: clickedNotification.body,
                        icon: clickedNotification.icon,
                    },
                    type: 'web-push-message'
                });
                matchingClient.postMessage(messageData);
                return matchingClient.focus();
            } else {
                return clients.openWindow(urlToOpen);
            }
        });
    event.waitUntil(promiseChain);
});




