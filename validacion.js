document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const successNotification = document.getElementById('success-notification');
    const errorNotification = document.getElementById('error-notification');
    
    // Cambiar entre formularios
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });
    
    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });
    
    // Función para mostrar notificaciones
    function showNotification(element, message) {
        element.textContent = message;
        element.classList.add('show-notification');
        
        setTimeout(function() {
            element.classList.remove('show-notification');
        }, 3000);
    }
    
    // Función para validar formulario
    function validateForm(formId) {
        const form = document.getElementById(formId);
        let isValid = true;
        
        // Remover clases de error previas
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            group.classList.remove('shake');
        });
        
        // Validar cada input
        form.querySelectorAll('input').forEach(input => {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            
            // Caso vacío
            if (!input.value.trim()) {
                formGroup.classList.add('error');
                formGroup.classList.add('shake');
                
                if (input.type === 'email') {
                    errorElement.textContent = 'El correo electrónico es requerido';
                } else if (input.type === 'password') {
                    errorElement.textContent = 'La contraseña es requerida';
                } else {
                    errorElement.textContent = 'Este campo es requerido';
                }
                
                isValid = false;
            } 
            // Validaciones específicas
            else {
                // Validar email
                if (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
                    formGroup.classList.add('error');
                    formGroup.classList.add('shake');
                    errorElement.textContent = 'Por favor ingresa un correo válido';
                    isValid = false;
                }
                
                // Validar longitud de contraseña en registro
                if (input.id === 'register-password' && input.value.length < 6) {
                    formGroup.classList.add('error');
                    formGroup.classList.add('shake');
                    errorElement.textContent = 'La contraseña debe tener al menos 6 caracteres';
                    isValid = false;
                }
                
                // Validar que las contraseñas coincidan
                if (input.id === 'register-confirm') {
                    const password = document.getElementById('register-password').value;
                    if (input.value !== password) {
                        formGroup.classList.add('error');
                        formGroup.classList.add('shake');
                        errorElement.textContent = 'Las contraseñas no coinciden';
                        isValid = false;
                    }
                }
            }
        });
        
        return isValid;
    }
    
    // Manejar envío del formulario de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('login-form')) {
            // Simulación de login exitoso
            showNotification(successNotification, '¡Inicio de sesión exitoso!');
            
            // Aquí iría el código para enviar los datos al servidor
            console.log('Login exitoso con:', {
                email: document.getElementById('login-email').value,
                password: document.getElementById('login-password').value
            });
            
            // Limpiar formulario
            loginForm.reset();
        } else {
            showNotification(errorNotification, 'Por favor completa todos los campos correctamente');
        }
    });
    
    // Manejar envío del formulario de registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('register-form')) {
            // Simulación de registro exitoso
            showNotification(successNotification, '¡Cuenta creada exitosamente!');
            
            // Aquí iría el código para enviar los datos al servidor
            console.log('Registro exitoso con:', {
                name: document.getElementById('register-name').value,
                email: document.getElementById('register-email').value,
                password: document.getElementById('register-password').value
            });
            
            // Limpiar formulario
            registerForm.reset();
            
            // Cambiar a la pestaña de login
            setTimeout(function() {
                loginTab.click();
            }, 1500);
        } else {
            showNotification(errorNotification, 'Por favor completa todos los campos correctamente');
        }
    });
});