// --- 購物車狀態與邏輯 ---
let cart = [];

// 加入購物車
function addToCart(productName, price, imgElementId) {
    const imgElement = document.getElementById(imgElementId);
    const imgUrl = imgElement ? imgElement.src : '';

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
    
    cart = [];
    updateCartCount();
    toggleCart();
}

// --- 產品上傳與 LocalStorage 記憶邏輯 ---

// 開關上傳產品彈窗
function toggleUploadModal() {
    const modal = document.getElementById('upload-modal');
    modal.classList.toggle('hidden');
}

// 將圖片轉為 Base64 格式，這樣才能存入瀏覽器的 LocalStorage
function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

// 將產品卡片畫到網頁上的通用函數
function renderNewProduct(product) {
    const newCard = document.createElement('article');
    newCard.className = 'product-card';
    newCard.innerHTML = `
        <div class="product-image">
            <img src="${product.img}" alt="${product.name}" id="${product.id}">
        </div>
        <div class="product-info">
            <span class="category">寵物飼料 (新增)</span>
            <h3>${product.name}</h3>
            <p class="one-liner">${product.desc}</p>
            
            <div class="target-audience">
                <strong>適合對象：</strong>${product.target}
            </div>
            
            <div class="price-section">
                <p class="price">NT$ ${product.price.toLocaleString()}</p>
            </div>
            
            <button class="btn btn-buy" onclick="addToCart('${product.name}', ${product.price}, '${product.id}')">加入購物車</button>
        </div>
    `;

    const grid = document.querySelector('.product-grid');
    grid.appendChild(newCard);
}

// 處理產品上傳表單送出
function handleUpload(event) {
    event.preventDefault(); 

    const name = document.getElementById('prod-name').value;
    const price = parseInt(document.getElementById('prod-price').value);
    const desc = document.getElementById('prod-desc').value;
    const target = document.getElementById('prod-target').value;
    const fileInput = document.getElementById('prod-img');
    const imgFile = fileInput.files[0];

    if (!imgFile) {
        alert('請選擇一張圖片！');
        return;
    }

    // 處理圖片轉換並儲存
    getBase64(imgFile, (base64Img) => {
        const newProduct = {
            id: 'uploaded-img-' + Date.now(),
            name: name,
            price: price,
            desc: desc,
            target: target,
            img: base64Img // 存入轉換後的 Base64 圖片編碼
        };

        // 1. 讀取目前存在瀏覽器裡的產品名單，並加入新產品
        let savedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
        savedProducts.push(newProduct);
        localStorage.setItem('customProducts', JSON.stringify(savedProducts));

        // 2. 顯示到畫面上
        renderNewProduct(newProduct);

        // 3. 收尾與提示
        document.getElementById('upload-form').reset();
        toggleUploadModal();
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            alert(`產品「${name}」已成功發布！\n(已儲存於瀏覽器快取中，重新整理網頁後將不再消失)`);
        }, 500);
    });
}

// --- 頁面載入後的互動功能 ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 初始化：網頁一打開，就把存檔的產品拿出來渲染
    const savedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    savedProducts.forEach(product => renderNewProduct(product));

    // FAQ 展開/收合
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

    // 平滑滾動
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
