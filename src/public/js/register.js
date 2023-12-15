
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.form')

    form.addEventListener('submit', function async (event) {
        event.preventDefault()

        const user = {
            name: form.elements.name.value,
            lastName: form.elements.lastName.value,
            email: form.elements.email.value,
            username: form.elements.username.value,
            password: form.elements.password.value,
            age: form.elements.age.value
        };


        const REGISTER_URL = 'http://localhost:8080/api/sessions/register'

        fetch(REGISTER_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            if (data.status === 'OK') {
                console.log('Datos enviados con éxito:', data.data);
                window.location.href = "http://localhost:8080/login";
            } else {
                console.error('Error en la respuesta del servidor:', data.data);
            }
        })
        .catch(error => {
            console.error('Fetch request has problem: Email or Username are exist')
        });
  
    });

});

function toLogin() {
    window.location.href = "http://localhost:8080/login";
}