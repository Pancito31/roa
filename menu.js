// Datos del menú
const menuItems = [
    {
        id: 1,
        name: "MiraMax Triple",
        price: 25.90,
        category: "hamburguesa",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&ixlib=rb-4.0.3",
        description: "Triple carne premium, cheddar derretido, bacon crujiente, salsa secreta",
        badge: "BEST"
    },
    {
        id: 2,
        name: "Combo Familiar",
        price: 45.90,
        category: "combo",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&ixlib=rb-4.0.3",
        description: "3 hamburguesas + papas grandes + 3 bebidas",
        badge: "AHORRO 20%"
    },
    {
        id: 3,
        name: "Vegano Delight",
        price: 18.90,
        category: "vegano",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&ixlib=rb-4.0.3",
        description: "Hamburguesa de garbanzo, aguacate, salsa vegana",
        badge: "VEGANO"
    },
    {
        id: 4,
        name: "Coca Cola 500ml",
        price: 5.90,
        category: "bebida",
        image: "https://duranalmacen.com.ar/wp-content/uploads/2021/09/Gaseosa-Coca-Cola-500-Cc-COCA-COLA-X500ML-1-3024.jpg",
        description: "Refresco helado Coca Cola original",
        badge: "FRÍA"
    },
    {
        id: 5,
        name: "Cheese Lover",
        price: 22.50,
        category: "hamburguesa",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&ixlib=rb-4.0.3",
        description: "Doble queso cheddar, mozzarella, salsa BBQ",
        badge: "QUESO"
    },
    {
        id: 6,
        name: "Helado Artesanal",
        price: 8.90,
        category: "postre",
        image: "https://i.pinimg.com/originals/01/6e/5a/016e5a352ee868bac485e50e0dbb2935.png",
        description: "Helado cremoso de vainilla con topping",
        badge: "DULCE"
    },
    {
        id: 7,
        name: "Combo Express",
        price: 19.90,
        category: "combo",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&ixlib=rb-4.0.3",
        description: "Hamburguesa simple + papas + bebida",
        badge: "RÁPIDO"
    },
    {
        id: 8,
        name: "Batido Fresa",
        price: 12.90,
        category: "bebida",
        image: "https://2.bp.blogspot.com/-K2ryDmyxkxw/TbHxs6XqXNI/AAAAAAAAELs/nYhMfxz2Ezg/s1600/Batido+de+Fresa+2.jpg",
        description: "Batido natural de fresa con yogurt",
        badge: "NATURAL"
    },
    {
    id: 9,
        name: "Broaster",
        price: 15.90,
        category: "Broaster",
        image: "https://decomidaperuana.com/wp-content/uploads/2019/09/preparacion-pollo-broaster.jpg",
        description: "Pollo broaster crujiente, jugoso y lleno de sabor. ¡Recién hecho!",
        badge: "CASERO"
    },  
];

// Carrito global
let cart = [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderMenu(menuItems);
    setupFilters();
    setupCart();
    loadCartFromStorage();
    updateCartUI();
});

// 🔧 FUNCIONES PRINCIPALES

// 1. Renderizar menú
function renderMenu(items) {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = items.map(item => `
        <div class="menu-card" data-category="${item.category}">
            <div class="menu-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <span class="category-badge">${item.badge}</span>
            </div>
            <div class="menu-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="price-section">
                    <span class="price">S/ ${item.price.toFixed(2)}</span>
                </div>
                <button class="add-to-cart" data-id="${item.id}">
                    <i class="fas fa-plus"></i> Agregar
                </button>
            </div>
        </div>
    `).join('');

    // Event listeners para botones AGREGAR (IMPORTANTE: después de renderizar)
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id);
            addToCart(id);
        });
    });
}

// 2. Filtros
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Activar botón
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar
            const filtered = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            
            renderMenu(filtered);
        });
    });
}

// 3. AGREGAR AL CARRITO (🎯 FUNCIÓN PRINCIPAL)
function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const cartItem = cart.find(c => c.id === id);
    
    if (cartItem) {
        // Ya existe, incrementar cantidad
        cartItem.quantity += 1;
    } else {
        // Nuevo item
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    // Efectos visuales
    animateButton(id);
    updateCartUI();
    saveCartToStorage();
    
    // Notificación
    showNotification(`${item.name} agregado al carrito!`);
}

// 4. Animación del botón
function animateButton(id) {
    const btn = document.querySelector(`[data-id="${id}"]`);
    if (btn) {
        btn.style.transform = 'scale(0.95)';
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            btn.innerHTML = '<i class="fas fa-plus"></i> Agregar';
        }, 800);
    }
}

// 5. Actualizar UI del carrito
function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartTotal').textContent = total.toFixed(2);
    
    // Actualizar WhatsApp link
    const message = cart.map(item => 
        `${item.quantity}x ${item.name} - S/ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    document.querySelector('.checkout').href = 
        `https://wa.me/51936960659?text=¡Hola!%20Mi%20pedido:%20${encodeURIComponent(message)}%20Total:%20S/%20${total.toFixed(2)}`;
}

// 6. Configurar carrito
function setupCart() {
    // Toggle carrito
    document.getElementById('cartToggle').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') toggleCart();
    });
}

function toggleCart() {
    const panel = document.getElementById('cartPanel');
    const floating = document.getElementById('cartFloating');
    panel.classList.toggle('active');
    floating.classList.toggle('active');
}

// 7. Renderizar items del carrito
function renderCartItems() {
    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Tu carrito está vacío 😢</p>';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>S/ ${item.price.toFixed(2)} c/u</p>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="item-total">S/ ${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

// 8. Cambiar cantidad
function changeQuantity(id, delta) {
    const cartItem = cart.find(c => c.id === id);
    if (cartItem) {
        cartItem.quantity += delta;
        if (cartItem.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
            saveCartToStorage();
            renderCartItems();
        }
    }
}

// 9. Remover del carrito
function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    updateCartUI();
    saveCartToStorage();
    renderCartItems();
    showNotification('Item removido del carrito');
}

// 10. LocalStorage
function saveCartToStorage() {
    localStorage.setItem('elMiraBurgerCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('elMiraBurgerCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
        renderCartItems();
    }
}

// 11. Notificaciones
function showNotification(message) {
    // Crear notificación flotante
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2500);
}

// 12. Cerrar carrito al hacer click fuera
document.addEventListener('click', function(e) {
    const cart = document.getElementById('cartFloating');
    const panel = document.getElementById('cartPanel');
    
    if (!cart.contains(e.target)) {
        panel.classList.remove('active');
        cart.classList.remove('active');
    }
});

// 13. Actualizar carrito cuando se abre
document.getElementById('cartToggle').addEventListener('click', function() {
    renderCartItems();
});