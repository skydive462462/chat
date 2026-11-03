// Keep in the SAME folder as index.html (repo root on GitHub Pages)
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC7tylN7VmPo5MntIwsoNQw5NhmGf-SasE",
  authDomain: "chat-68d6a.firebaseapp.com",
  projectId: "chat-68d6a",
  storageBucket: "chat-68d6a.firebasestorage.app",
  messagingSenderId: "828067301108",
  appId: "1:828067301108:web:242921194c21f6ffdc00a1"
});

const messaging = firebase.messaging();

// The server sends DATA-ONLY messages, so this is the only place that shows them.
messaging.onBackgroundMessage((payload) => {
  const d = payload.data || {};
  return self.registration.showNotification(d.title || 'New message', {
    body: d.body || '',
    tag: d.tag || 'chat',   // same tag as the in-app alert, so no duplicates
    renotify: true
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) if ('focus' in c) return c.focus();
      return self.clients.openWindow(self.registration.scope);
    })
  );
});
