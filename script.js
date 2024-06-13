document.addEventListener('DOMContentLoaded', () => {
    const userId = 'your-telegram-user-id'; // This should be fetched from Telegram bot in actual implementation
    const baseUrl = 'https://yourdomain.com'; // Replace with your actual domain

    const getUserData = () => {
        fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('balance').textContent = data.tecko;
            document.getElementById('referralPoints').textContent = data.referralTecko || 0;
        });
    };

    document.getElementById('startMiningButton').addEventListener('click', () => {
        fetch('/mine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'mining started') {
                alert('Mining started!');
            } else if (data.status === 'error') {
                alert(data.message);
            }
        });
    });

    document.querySelectorAll('.perform-button').forEach(button => {
        button.addEventListener('click', () => {
            fetch('/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'task completed') {
                    getUserData();
                    alert('Task completed and 100 Tecko added to your balance!');
                } else if (data.status === 'error') {
                    alert(data.message);
                }
            });
        });
    });

    // Initialize user data on page load
    getUserData();
});