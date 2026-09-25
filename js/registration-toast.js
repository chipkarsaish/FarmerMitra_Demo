document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('registrationSuccess') !== 'true') return;

    sessionStorage.removeItem('registrationSuccess');

    const toast = document.createElement('div');
    toast.className = 'registration-toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = '<strong>Registration successful</strong><span>Login now.</span>';
    document.body.appendChild(toast);

    window.setTimeout(() => {
        toast.classList.add('is-hidden');
        window.setTimeout(() => toast.remove(), 250);
    }, 5000);
});
