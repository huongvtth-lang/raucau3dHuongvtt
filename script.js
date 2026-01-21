/**
 * Rau Câu 3D Nghệ Thuật - Interactive JavaScript
 * Production-ready version
 */

// =====================
// Product Data
// =====================
const products = [
    { id: 1, name: "Rau câu 3D hoa hồng đơn sắc", description: "Hoa hồng tinh tế với cánh mỏng tang, trong veo như pha lê", price: 500000, badge: "Bán chạy", image: "product-1.png" },
    { id: 2, name: "Rau câu 3D hoa sen truyền thống", description: "Hoa sen thanh khiết, biểu tượng của sự tinh khôi Việt Nam", price: 550000, badge: "Đặc biệt", image: "product-2.png" },
    { id: 3, name: "Rau câu 3D hoa mẫu đơn cao cấp", description: "Mẫu đơn phú quý, nhiều lớp cánh xếp tinh xảo", price: 550000, badge: "Premium", image: "product-3.png" },
    { id: 4, name: "Rau câu 3D bó hoa mini", description: "Bó hoa nhỏ xinh, hoàn hảo làm quà tặng đặc biệt", price: 420000, badge: null, image: "product-1.png" },
    { id: 5, name: "Rau câu 3D hộp quà sinh nhật", description: "Thiết kế đặc biệt cho ngày sinh nhật đáng nhớ", price: 480000, badge: "Quà tặng", image: "product-2.png" },
    { id: 6, name: "Rau câu 3D chủ đề lễ cưới", description: "Sang trọng và tinh tế cho ngày trọng đại", price: 600000, badge: "Wedding", image: "product-3.png" },
    { id: 7, name: "Rau câu 3D chủ đề Tết", description: "Hoa mai, hoa đào rực rỡ đón xuân về", price: 580000, badge: "Tết 2026", image: "hero-jelly.png" }
];

// =====================
// Utilities
// =====================
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

// =====================
// Render Product Cards
// =====================
function createProductCard(product) {
    const badgeHTML = product.badge
        ? `<span class="product-badge">${product.badge}</span>`
        : '';

    return `
        <article class="product-card" data-aos="fade-up">
            <div class="product-image">
                ${badgeHTML}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="product-btn" onclick="scrollToOrder('${product.name}')">
                        🛒
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    productGrid.innerHTML = products.map(createProductCard).join('');
    initScrollAnimations();
}

// =====================
// Scroll to order
// =====================
function scrollToOrder(productName) {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
}

// =====================
// Image fallback – PRODUCTION SAFE
// (❌ KHÔNG đụng tới product image)
// =====================
function initImageFallbacks() {

    // Gallery fallback
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            img.parentElement.style.background =
                'linear-gradient(135deg,#F5C6D6,#D4C5E8)';
        });
    });

    // Hero fallback
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        heroImg.addEventListener('error', () => {
            const wrapper = heroImg.parentElement;
            heroImg.remove();
            wrapper.style.background =
                'linear-gradient(135deg,#F5C6D6,#D4C5E8,#B8E0D4)';
            wrapper.style.minHeight = '400px';
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.justifyContent = 'center';
            wrapper.innerHTML += '<span style="font-size:5rem">🌸</span>';
        });
    }
}

// =====================
// Other features (giữ nguyên)
// =====================
function initScrollAnimations() {
    const els = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting && e.target.classList.add('aos-animate'));
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () =>
        btn.classList.toggle('visible', window.scrollY > 500)
    );
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================
// Init
// =====================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initBackToTop();
    initImageFallbacks();
    console.log('🌸 Production JS loaded');
});

window.scrollToOrder = scrollToOrder;
