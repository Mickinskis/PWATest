if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });

    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();  // Prevent the default prompt from showing
        deferredPrompt = e;  // Stash the event so it can be triggered later
        const installButton = document.getElementById('install-button');
        installButton.style.display = 'block';  // Show the install button

        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();  // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;  // Clear the deferredPrompt variable
            });
        });
    });
}
