function openWhatsAppApp() {
    const phoneNumber = '51936960659';
    const message = '¡Hola! Quiero hacer mi pedido en elMiraBurger 🍔 ¿Qué recomiendan?';
    
    // Deep link para abrir app WhatsApp
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    // Fallback para navegadores que no soporten whatsapp://
    window.open(whatsappUrl, '_blank');
    
    // Si no abre la app en 2 segundos, redirige a wa.me
    setTimeout(() => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }, 2000);
}

// Detectar clics en botones y analytics (opcional)
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aquí puedes agregar Google Analytics o pixel de Facebook
            console.log('WhatsApp clicked!');
            // gtag('event', 'whatsapp_click', { 'method': 'WhatsApp' });
        });
    });
});