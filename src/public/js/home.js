const d = document;

d.addEventListener("DOMContentLoaded", () => {
  createCart();
  chargingEvents();
});

function createCart() {
  fetch("/api/carts/add-cart", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.cart && localStorage.setItem("CartId", data.cart._id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function chargingEvents() {
  d.addEventListener("click", watchCart);
  d.addEventListener("click", addProductToCart);
  d.addEventListener("click", removeProductFromCart);
  d.addEventListener("click", finishPurchase);
  d.addEventListener("click", goToAddProduct);
  d.addEventListener("change", renderImage);
  d.addEventListener("submit", addProduct);
  d.addEventListener("click", goToEditProduct);
  d.addEventListener("submit", editProduct);
  d.addEventListener("click", deleteProduct);
  d.addEventListener("submit", changePassword);
}

function watchCart(e) {
  if (e.target.matches("#shopping__car")) {
    const id = localStorage.getItem("CartId");
    window.location.href = `/api/carts/${id}`;
  }
}

function renderImage(e) {
  if (e.target.matches("#image")) {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    const $image = d.querySelector("#renderImage");
    $image.setAttribute("src", imageUrl);
    $image.style.width = "100%";
  }
}

function addProductToCart(e) {
  if (e.target.matches(".product_to_cart_button")) {
    const idProduct = e.target.getAttribute("data-id");
    const cartId = localStorage.getItem("CartId");
    const quantity = e.target.previousElementSibling.value;
    fetch(`/api/carts/${cartId}`, {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idProduct, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function removeProductFromCart(e) {
  if (e.target.matches(".remove_product_from_cart")) {
    const cartId = localStorage.getItem("CartId");
    const idProduct = e.target.getAttribute("data-id");
    fetch(`/api/carts/${cartId}/products/${idProduct}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function finishPurchase(e) {
  if (e.target.matches(".purchase_boton")) {
    const cartId = localStorage.getItem("CartId");
    fetch(`/api/carts/${cartId}/purchase`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ticket)
          window.location.href = `/api/carts/purchase/${data.ticket.idTicket}/${cartId}`;
        else alert(data.error);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function goToAddProduct(e) {
  if (e.target.matches(".add_product")) {
    window.location.href = `/view/add-product`;
  }
}

function addProduct(e) {
  if (e.target.matches("#form_submit_to_add_product")) {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch(`/api/products/add-product`, {
      method: "POST", // or 'PUT'
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        data.status
          ? alert(data.message + "\nCause: " + data.cause)
          : (window.location.href = `/api/products/${data.product._id}`);
      })
      .catch((err) => console.log(err));
  }
}

function goToEditProduct(e) {
  if (e.target.matches(".edit_product")) {
    const idProduct = e.target.getAttribute("data-id");
    window.location.href = `/view/edit-product/${idProduct}`;
  }
}

function editProduct(e) {
  if (e.target.matches("#form_submit_to_update_product")) {
    e.preventDefault();
    const idProduct = e.target.getAttribute("data-id");
    const data = new FormData(e.target);
    fetch(`/api/products/${idProduct}`, {
      method: "PUT", // or 'POST'
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = `/api/products/${data.product._id}`;
      })
      .catch((err) => (window.location.href = "/api/products"));
  }
}

function deleteProduct(e) {
  if (e.target.matches(".delete_product")) {
    const idProduct = e.target.getAttribute("data-id");
    fetch(`/api/products/${idProduct}`, {
      method: "DELETE", // or 'POST'
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = `/api/products`;
      })
      .catch((err) => (window.location.href = "/api/products"));
  }
}

function changePassword(e) {
  if (e.target.matches("#form_to_change_password")) {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch("/user/change-password", {
      method: "POST",
      body: JSON.stringify({oldPassword: data.get("oldPassword"), newPassword: data.get("newPassword")}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then((data) => data.json())
      .then((data) => {
        alert(data.message)
      });
  }
}
