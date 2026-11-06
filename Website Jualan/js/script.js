
/* =================================
   KAJURSA - OPEN PO SHOP SYSTEM
================================= */

// NOMOR WHATSAPP ADMIN
const whatsappNumber = "6282117880988";

// DATA PRODUK (HANYA 2 PRODUK)
const products = {
    gabin: {
        name: "Es Gabin",
        price: 5000
    },

    samyang: {
        name: "Samyang Roll",
        price: 2000
    }
};

// FORMAT RUPIAH
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

// AMBIL KERANJANG DARI LOCAL STORAGE
let cart = {};

try {
    cart = JSON.parse(localStorage.getItem("kajursaCart")) || {};
} catch (error) {
    cart = {};
}

// SIMPAN KERANJANG
function saveCart() {
    localStorage.setItem("kajursaCart", JSON.stringify(cart));
}

// NOTIFIKASI
let toastTimer;

function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// TAMBAH PRODUK
function addToCart(id) {
    if (!products[id]) return;

    cart[id] = (cart[id] || 0) + 1;

    saveCart();
    renderCart();

    showToast(products[id].name + " berhasil ditambahkan!");
}

// UBAH JUMLAH PRODUK
function changeQuantity(id, amount) {
    if (!cart[id]) return;

    cart[id] += amount;

    if (cart[id] <= 0) {
        delete cart[id];
    }

    saveCart();
    renderCart();
}

// HITUNG TOTAL ITEM
function getTotalItems() {
    return Object.values(cart).reduce(
        (total, quantity) => total + quantity,
        0
    );
}

// HITUNG TOTAL HARGA
function getTotalPrice() {
    return Object.keys(cart).reduce((total, id) => {
        return total + products[id].price * cart[id];
    }, 0);
}

// TAMPILKAN KERANJANG
function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems) return;

    if (cartCount) {
        cartCount.textContent = getTotalItems();
    }

    if (cartTotal) {
        cartTotal.textContent = formatRupiah(getTotalPrice());
    }

    const ids = Object.keys(cart).filter(
        id => products[id] && cart[id] > 0
    );

    if (ids.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Keranjang kamu masih kosong.
            </p>
        `;
        return;
    }

    cartItems.innerHTML = ids.map(id => {
        const product = products[id];
        const quantity = cart[id];
        const subtotal = product.price * quantity;

        return `
            <div class="cart-item">
                <div>
                    <h4>${product.name}</h4>
                    <p>${formatRupiah(product.price)} / item</p>
                    <p>Subtotal: ${formatRupiah(subtotal)}</p>
                </div>

                <div class="quantity-controls">
                    <button onclick="changeQuantity('${id}', -1)">−</button>
                    <span>${quantity}</span>
                    <button onclick="changeQuantity('${id}', 1)">+</button>
                </div>
            </div>
        `;
    }).join("");
}

// BUKA / TUTUP KERANJANG
function toggleCart() {
    const overlay = document.getElementById("cartOverlay");

    if (overlay) {
        overlay.classList.toggle("show");
    }
}

// TUTUP KERANJANG SAAT KLIK AREA LUAR
function closeCart(event) {
    if (event.target.id === "cartOverlay") {
        document.getElementById("cartOverlay").classList.remove("show");
    }
}

// CHECKOUT WHATSAPP
function checkout() {
    const ids = Object.keys(cart).filter(
        id => products[id] && cart[id] > 0
    );

    if (ids.length === 0) {
        showToast("Keranjang masih kosong!");
        return;
    }

    let message = `*PESANAN OPEN PO KAJURSA*\n`;
    message += `SMK Pasundan Rancaekek\n\n`;
    message += `Halo admin KAJURSA, saya ingin memesan:\n\n`;

    ids.forEach((id, index) => {
        const product = products[id];
        const quantity = cart[id];
        const subtotal = product.price * quantity;

        message += `${index + 1}. ${product.name}\n`;
        message += `   Jumlah: ${quantity}\n`;
        message += `   Harga: ${formatRupiah(product.price)}\n`;
        message += `   Subtotal: ${formatRupiah(subtotal)}\n\n`;
    });

    message += `--------------------------\n`;
    message += `*TOTAL: ${formatRupiah(getTotalPrice())}*\n`;
    message += `--------------------------\n\n`;
    message += `Mohon konfirmasi pesanan saya. Terima kasih!`;

    const url = "https://wa.me/" + whatsappNumber +
                "?text=" + encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
}

// JALANKAN SAAT HALAMAN SELESAI DIMUAT
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});
