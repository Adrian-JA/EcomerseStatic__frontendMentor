// Header
// header menu
const btnMenu = document.getElementById("btnMenu");
const btnMenuClose = document.getElementById("btnCloseMenu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", () => {
    menu.classList.add("menu--active");
});

btnMenuClose.addEventListener("click", () => {
    menu.classList.remove("menu--active");
});

const links = document.querySelectorAll(".headerLinks");

links.forEach((link) => {
    link.addEventListener("click", () => {
        let classActive = document.body.querySelector(".headerLinks--active");
        classActive.classList.remove("headerLinks--active");
        link.classList.add("headerLinks--active");
    });
});

// see cardShop in header
const cardShop = document.getElementById("cardShop");
const btnCart = document.getElementById("btnCart");
btnCart.addEventListener("click", () => {
    const cardShop = document.getElementById("cardShop");
    cardShop.classList.toggle("cardShop--hide");
});

// Active Profile
const btnProfile = document.getElementById("btnProfile");
btnProfile.addEventListener("click", () => {
    btnProfile.classList.toggle("headerBtn--active");
});

// Main
// Reduce or Increase product

const productQuantity = document.getElementById("productQuantity");
const btnReduce = document.getElementById("btnReduce");

btnReduce.addEventListener("click", () => {
    let count = parseInt(productQuantity.textContent);
    if (count === 0) return;

    productQuantity.innerHTML = count - 1;
});

const btnIncrease = document.getElementById("btnIncrease");

btnIncrease.addEventListener("click", () => {
    let count = parseInt(productQuantity.textContent);
    productQuantity.innerHTML = count + 1;
});

// set purchase settings

const btnConfirmPurchase = document.getElementById("btnConfirmPurchase");
const cardShopBody = document.getElementById("cardShopBody");
const cartBadge = document.getElementById("cartBadge");

btnConfirmPurchase.addEventListener("click", () => {
    let productAmount = parseFloat(productQuantity.textContent);

    if (productAmount === 0) return;

    cardShopBody.innerHTML = `
        <div class="cardShop__product">
            <img src="images/image-product-1-thumbnail.jpg" alt="" class="cardShop__img" />
            <div class="cardShop__details">
                <p class="cardShop__detailsText">Fall Limited Edition Sneakers</p>
                <p class="cardShop__detailsPrice">$125.00 x 
                <span class="cardShop__productAmount">${productAmount}</span> 
                <span class="cardShop__totalPrice">$${(125.0 * productAmount).toFixed(2)}</span></p>
            </div>
            <img src="images/icon-delete.svg" alt="" class="header__RemoveItem" id="removeProduct"/>
        </div>

        <button class="cardShop__btnCheckout" id="btnCheckout">Checkout</button>
        `;

    cartBadge.classList.remove("badge--hide");
    cartBadge.innerHTML = productAmount;

    const removeIconProduct = document.getElementById("removeProduct");
    removeIconProduct.addEventListener("click", () => {
        cardShopBody.innerHTML = `<p class="cardShop__textEmpty">Your cart is empty.</p>`;
        cartBadge.classList.add("badge--hide");
        cartBadge.innerHTML = null;
    });
});

// Modal
const lightBox = document.getElementById("modalGallery");
const modalGallery = document.querySelectorAll(".gallery__image");

function hasActiveImg() {
    let activatedImage = document.querySelectorAll(".image--active");
    if (activatedImage) {
        activatedImage.forEach((img) => img.classList.remove("image--active"));
    }
}

function removeActiveImg(index) {
    indexSecondImg = index > 3 ? index - 4 : index + 4;
    modalGallery[index].classList.add("image--active");
    modalGallery[indexSecondImg].classList.add("image--active");
}

modalGallery.forEach((img, index) => {
    img.addEventListener("click", () => {
        lightBox.showModal();

        hasActiveImg();
        removeActiveImg(index);

        let image = headImage[1];
        let indexImg = index > 3 ? index - 4 : index;
        image.dataset.list = indexImg + 1;
        changeImage(image, indexImg + 1);
    });
});

const btnModalClose = document.getElementById("btnModalClose");

btnModalClose.addEventListener("click", () => {
    lightBox.close();
});

// Images Carrousel
// change Image in Carrousel

function changeImage(element, indexImg) {
    element.src = `images/image-product-${indexImg}.jpg`;
}

const btnGalleryMove = document.querySelectorAll(".gallery__btnMove");
const headImage = document.querySelectorAll(".gallery__headImage");

btnGalleryMove.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const btn = btnGalleryMove[index];
        let imgContainer = btn.classList.contains("btnLightbox") ? headImage[1] : headImage[0];
        let indexImg = parseInt(imgContainer.dataset.list);

        if (btn.classList.contains("gallery__btnMove--left") && indexImg > 1) {
            imgContainer.dataset.list = indexImg -= 1;
        }

        if (btn.classList.contains("gallery__btnMove--right") && indexImg < 4) {
            imgContainer.dataset.list = indexImg += 1;
        }

        hasActiveImg();
        removeActiveImg(indexImg - 1);
        changeImage(imgContainer, indexImg);
        return;
    });
});
