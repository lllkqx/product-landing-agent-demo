// --- 購物車狀態與邏輯 ---
let cart = [];

// 加入購物車
function addToCart(productName, price, imgElementId) {
    // 取得圖片的 src (處理包含 Data URI 的情況)
    const imgElement = document.getElementById(imgElementId);
    const imgUrl = imgElement ? imgElement.src : '';

    // 將商品物件推入陣列
    cart.push({ name: productName, price: price, img: imgUrl });
    
    updateCartCount();
    alert(`已將「${productName}」加入購物車！`);
}

// 更新右上角購物車數量
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if(countElement) {
        countElement.textContent = cart.length;
    }
}

// 開啟/關閉購物車彈窗
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
    
    // 如果是打開狀態，重新渲染購物車內容
    if (!modal.classList.contains('hidden')) {
        renderCartItems();
    }
}

// 渲染購物車內的 HTML
function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
    
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">購物車目前是空的</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>NT$ ${item.price.toLocaleString()}</p>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${index})">移除</button>
                </div>
            `;
        });
    }
    
    // 更新總金額
    totalElement.textContent = total.toLocaleString();
}

// 移除單一商品
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCartItems();
    updateCartCount();
}

// 假結帳功能
function checkout() {
    if (cart.length === 0) {
        alert('您的購物車是空的，請先挑選喜歡的商品唷！');
        return;
    }
    
    alert('感謝您的測試！\n\n這是一個展示用的 MVP 原型，目前尚未串接真實金流系統。您的訂單不會被扣款。');
    
    // 結帳後清空購物車
    cart = [];
    updateCartCount();
    toggleCart();
}

// --- 頁面載入後的互動功能 ---
document.addEventListener('DOMContentLoaded', () => {
    
    // FAQ 展開/收合功能
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // 平滑滾動 (Smooth Scroll)
    const heroBtn = document.querySelector('.hero .btn-secondary');
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = heroBtn.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
