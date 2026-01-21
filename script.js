/**
 * Rau Câu 3D Nghệ Thuật - Interactive JavaScript
 * Premium landing page interactions and animations
 */

// Product Data
const products = [
    {
        id: 1,
        name: "Rau câu 3D hoa hồng đơn sắc",
        description: "Hoa hồng tinh tế với cánh mỏng tang, trong veo như pha lê",
        price: 500000,
        badge: "Bán chạy",
        image: "images/product-1.png"
    },
    {
        id: 2,
        name: "Rau câu 3D hoa sen truyền thống",
        description: "Hoa sen thanh khiết, biểu tượng của sự tinh khôi Việt Nam",
        price: 550000,
        badge: "Đặc biệt",
        image: "images/product-2.png"
    },
    {
        id: 3,
        name: "Rau câu 3D hoa mẫu đơn cao cấp",
        description: "Mẫu đơn phú quý, nhiều lớp cánh xếp tinh xảo",
        price: 550000,
        badge: "Premium",
        image: "images/product-3.png"
    },
    {
        id: 4,
        name: "Rau câu 3D bó hoa mini",
        description: "Bó hoa nhỏ xinh, hoàn hảo làm quà tặng đặc biệt",
        price: 420000,
        badge: null,
        image: "images/product-1.png"
    },
    {
        id: 5,
        name: "Rau câu 3D hộp quà sinh nhật",
        description: "Thiết kế đặc biệt cho ngày sinh nhật đáng nhớ",
        price: 480000,
        badge: "Quà tặng",
        image: "images/product-2.png"
    },
    {
        id: 6,
        name: "Rau câu 3D chủ đề lễ cưới",
        description: "Sang trọng và tinh tế cho ngày trọng đại",
        price: 600000,
        badge: "Wedding",
        image: "images/product-3.png"
    },
    {
        id: 7,
        name: "Rau câu 3D chủ đề Tết",
        description: "Hoa mai, hoa đào rực rỡ đón xuân về",
        price: 580000,
        badge: "Tết 2026",
        image: "images/hero-jelly.png"
    }
];

// Format Vietnamese Dong currency
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

// Create product card HTML
function createProductCard(product) {
    const badgeHTML = product.badge ?
        `<span class="product-badge">${product.badge}</span>` : '';

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
                    <button class="product-btn" aria-label="Đặt ${product.name}" onclick="scrollToOrder('${product.name}')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM20 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Render all products
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        productGrid.innerHTML = products.map(createProductCard).join('');
        initScrollAnimations();
    }
}

// Scroll to order section and pre-select product
function scrollToOrder(productName) {
    const orderSection = document.getElementById('order');
    const productSelect = document.getElementById('productType');

    // Find matching option
    if (productSelect) {
        const options = productSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].text.toLowerCase().includes(productName.toLowerCase().split(' ').slice(0, 3).join(' '))) {
                productSelect.selectedIndex = i;
                break;
            }
        }
    }

    // Smooth scroll to order section
    if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Order form functionality
function initOrderForm() {
    const orderForm = document.getElementById('orderForm');
    const deliveryDateInput = document.getElementById('deliveryDate');

    // Set minimum date to tomorrow
    if (deliveryDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        deliveryDateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // Form submission
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                phone: document.getElementById('phone').value,
                deliveryDate: document.getElementById('deliveryDate').value,
                quantity: document.getElementById('quantity').value,
                productType: document.getElementById('productType').options[document.getElementById('productType').selectedIndex].text,
                notes: document.getElementById('notes').value
            };

            // Log form data for demo
            console.log('Order submitted:', formData);

            // Show success alert
            alert('Đơn đặt bánh đã được gửi! Chúng tôi sẽ liên hệ sớm. 🎉');

            // Reset form
            orderForm.reset();
        });
    }
}

// Back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Scroll animations (simple AOS alternative)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effect for floating elements
function initParallax() {
    const petals = document.querySelectorAll('.floating-petal');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        petals.forEach((petal, index) => {
            const speed = 0.1 + (index * 0.05);
            petal.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// Initialize placeholder images for products
function initPlaceholderImages() {
    const productImages = document.querySelectorAll('.product-image img');
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const heroImage = document.querySelector('.hero-img');

    // Placeholder gradient backgrounds for missing images
    const placeholderColors = [
        'linear-gradient(135deg, #F5C6D6 0%, #D4C5E8 100%)',
        'linear-gradient(135deg, #D4C5E8 0%, #B8E0D4 100%)',
        'linear-gradient(135deg, #B8E0D4 0%, #F5C6D6 100%)',
        'linear-gradient(135deg, #F7E7CE 0%, #F5C6D6 100%)'
    ];

    function handleImageError(img, index) {
        img.style.display = 'none';
        const parent = img.parentElement;
        parent.style.background = placeholderColors[index % placeholderColors.length];
        parent.style.display = 'flex';
        parent.style.alignItems = 'center';
        parent.style.justifyContent = 'center';

        const placeholder = document.createElement('div');
        placeholder.innerHTML = '🌸';
        placeholder.style.fontSize = '3rem';
        placeholder.style.opacity = '0.5';
        parent.appendChild(placeholder);
    }

    productImages.forEach((img, index) => {
        img.addEventListener('error', () => handleImageError(img, index));
    });

    galleryImages.forEach((img, index) => {
        img.addEventListener('error', () => handleImageError(img, index));
    });

    if (heroImage) {
        heroImage.addEventListener('error', () => {
            const wrapper = heroImage.parentElement;
            heroImage.style.display = 'none';
            wrapper.style.background = 'linear-gradient(135deg, #F5C6D6 0%, #D4C5E8 50%, #B8E0D4 100%)';
            wrapper.style.borderRadius = '20px';
            wrapper.style.minHeight = '400px';
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.justifyContent = 'center';

            const placeholder = document.createElement('div');
            placeholder.innerHTML = '🌸';
            placeholder.style.fontSize = '6rem';
            placeholder.style.animation = 'float 3s ease-in-out infinite';
            wrapper.appendChild(placeholder);
        });
    }
}

// Phone number formatting
function initPhoneFormatting() {
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 10) {
                value = value.slice(0, 10);
            }

            // Format: 0901 234 567
            if (value.length > 4 && value.length <= 7) {
                value = value.slice(0, 4) + ' ' + value.slice(4);
            } else if (value.length > 7) {
                value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7);
            }

            e.target.value = value;
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initNavigation();
    initOrderForm();
    initBackToTop();
    initSmoothScroll();
    initParallax();
    initPlaceholderImages();
    initPhoneFormatting();

    console.log('🌸 Rau Câu 3D Nghệ Thuật - Website loaded successfully!');
});

// Expose scrollToOrder globally
window.scrollToOrder = scrollToOrder;
