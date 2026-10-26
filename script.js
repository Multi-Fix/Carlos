/* =========================================
   CONFIGURACIÓN GLOBAL
   ========================================= */
// EDITAR AQUÍ: Tu número de WhatsApp (código de país + número, sin espacios ni signos +)
const WHATSAPP_NUMBER = "522206428387";

/* =========================================
   MENÚ HAMBURGUESA PARA MÓVILES
   ========================================= */
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    // Cambiar ícono de hamburguesa a X
    const icon = hamburger.querySelector('i');
    if (navList.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

/* =========================================
   ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
   ========================================= */
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los demás
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Si no estaba activo, abrirlo
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

/* =========================================
   FUNCIÓN PARA PRELLENAR WHATSAPP DESDE TARJETAS DE SERVICIO
   ========================================= */
function prellenarWhatsApp(servicio) {
    const mensaje = `Hola, quiero solicitar una cotización o cita para un servicio.\n\nServicio: ${servicio}\n\n¿Podrías indicarme tu disponibilidad y el costo aproximado del servicio?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

/* =========================================
   MANEJO DEL FORMULARIO DE COTIZACIÓN
   ========================================= */
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const servicio = document.getElementById('servicio').value;
    const inmueble = document.getElementById('inmueble').value;
    const ubicacion = document.getElementById('ubicacion').value.trim();
    const fecha = document.getElementById('fecha').value || 'No especificada';
    const hora = document.getElementById('hora').value || 'No especificada';
    const descripcion = document.getElementById('descripcion').value.trim();

    // Validación básica adicional (aunque HTML5 ya lo hace con 'required')
    if (!nombre || !telefono || !servicio || !ubicacion || !descripcion) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }

    // Construir el mensaje exactamente como se solicitó
    const mensaje = `Hola, quiero solicitar una cotización o cita para un servicio.

Nombre: ${nombre}
Servicio: ${servicio}
Tipo de inmueble: ${inmueble}
Ubicación: ${ubicacion}
Fecha preferida: ${fecha}
Hora preferida: ${hora}
Descripción: ${descripcion}
Teléfono: ${telefono}

¿Podrías indicarme tu disponibilidad y el costo aproximado del servicio?`;

    // Codificar el mensaje para URL (maneja acentos, espacios y saltos de línea)
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Crear la URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, '_blank');
    
    // Opcional: Resetear el formulario después de enviar
    quoteForm.reset();
    alert('Se abrirá WhatsApp con tu solicitud. Por favor, presiona "Enviar" en la aplicación para que yo pueda responder.');
});

/* =========================================
   EFECTO DE SCROLL SUAVE EN NAVEGACIÓN (Fallback para navegadores antiguos)
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Compensar la altura del header fijo (70px)
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});