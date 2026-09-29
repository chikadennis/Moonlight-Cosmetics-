/* =========================================================
   MOONLIGHT COSMETICS — CHECKOUT PAGE LOGIC
   Loaded only on checkout.html, after data.js / cart.js / main.js.
   ========================================================= */

(function () {

  var WHATSAPP_NUMBER = "2347047388912";

  var cartBox = document.getElementById("cartBox");
  var checkoutForm = document.getElementById("checkoutForm");
  var summaryTotal = document.getElementById("summaryTotal");
  var summaryCount = document.getElementById("summaryCount");
  var formSection = document.getElementById("checkoutFormSection");
  var summaryBox = document.getElementById("orderSummary");

  if (!cartBox) return; // not on the checkout page

  function renderCart() {
    var items = getCart();

    if (!items.length) {
      cartBox.innerHTML =
        '<div class="cart-empty">' +
        '<div class="moon">🛍️</div>' +
        '<h3>Your cart is empty</h3>' +
        '<p class="hero-text" style="margin:10px auto 20px;">Browse our products and services to start your order.</p>' +
        '<a href="products.html" class="btn btn-primary">Browse Products</a>' +
        '</div>';

      if (formSection) formSection.style.display = "none";
      if (summaryBox) summaryBox.style.display = "none";
      return;
    }

    if (formSection) formSection.style.display = "";
    if (summaryBox) summaryBox.style.display = "";

    var rows = items.map(function (line) {
      var product = findProductById(line.productId);
      if (!product) return "";

      var variant = findVariant(product, line.variantId);
      var image = product.image || "images/small%20size.jpg";
      var lineTotal = getCartLineTotal(line);

      return (
        '<div class="cart-row">' +
        '<img src="' + image + '" alt="' + product.name + '">' +
        '<div class="cart-item-info">' +
        '<div class="cart-item-name">' + product.name + '</div>' +
        '<div class="cart-item-variant">' + (variant ? variant.label : "") + ' — ' + formatNaira(variant ? variant.price : 0) + ' each</div>' +
        '</div>' +
        '<div class="qty-stepper" data-product="' + line.productId + '" data-variant="' + line.variantId + '">' +
        '<button type="button" class="qty-minus" aria-label="Decrease quantity">−</button>' +
        '<span>' + line.qty + '</span>' +
        '<button type="button" class="qty-plus" aria-label="Increase quantity">+</button>' +
        '</div>' +
        '<div class="cart-subtotal">' + formatNaira(lineTotal) + '</div>' +
        '<button type="button" class="cart-remove" data-product="' + line.productId + '" data-variant="' + line.variantId + '" aria-label="Remove item">✕</button>' +
        '</div>'
      );
    }).join("");

    cartBox.innerHTML = rows;

    cartBox.querySelectorAll(".qty-minus").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var wrap = btn.closest(".qty-stepper");
        var pid = wrap.getAttribute("data-product");
        var vid = wrap.getAttribute("data-variant");
        var current = getCart().find(function (i) { return i.productId === pid && i.variantId === vid; });
        if (current) {
          updateQty(pid, vid, current.qty - 1);
          renderCart();
          updateSummary();
        }
      });
    });

    cartBox.querySelectorAll(".qty-plus").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var wrap = btn.closest(".qty-stepper");
        var pid = wrap.getAttribute("data-product");
        var vid = wrap.getAttribute("data-variant");
        var current = getCart().find(function (i) { return i.productId === pid && i.variantId === vid; });
        if (current) {
          updateQty(pid, vid, current.qty + 1);
          renderCart();
          updateSummary();
        }
      });
    });

    cartBox.querySelectorAll(".cart-remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        removeFromCart(btn.getAttribute("data-product"), btn.getAttribute("data-variant"));
        renderCart();
        updateSummary();
        if (typeof showToast === "function") showToast("Item removed from cart.");
      });
    });
  }

  function updateSummary() {
    if (summaryTotal) summaryTotal.textContent = formatNaira(getCartTotal());
    if (summaryCount) summaryCount.textContent = String(getCartCount());
  }

  function buildWhatsAppMessage(name, phone, address, notes) {
    var items = getCart();

    var lines = items.map(function (line) {
      var product = findProductById(line.productId);
      if (!product) return "";
      var variant = findVariant(product, line.variantId);
      return "- " + product.name + " (" + (variant ? variant.label : "") + ") x" + line.qty +
        " — " + formatNaira(getCartLineTotal(line));
    });

    var message =
      "Hello Moonlight Cosmetics! I'd like to place an order.\n\n" +
      "🛍️ Order:\n" +
      lines.join("\n") +
      "\n\n💰 Total: " + formatNaira(getCartTotal()) +
      "\n\n👤 Name: " + name +
      "\n📞 Phone: " + phone +
      "\n📍 Delivery Address: " + address +
      (notes ? "\n📝 Notes: " + notes : "") +
      "\n\nThank you.";

    return message;
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var items = getCart();
      if (!items.length) return;

      var name = document.getElementById("checkoutName").value.trim();
      var phone = document.getElementById("checkoutPhone").value.trim();
      var address = document.getElementById("checkoutAddress").value.trim();
      var notes = document.getElementById("checkoutNotes").value.trim();

      if (!name || !phone || !address) return;

      var message = buildWhatsAppMessage(name, phone, address, notes);
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);

      window.open(url, "_blank");

      clearCart();
      renderCart();
      updateSummary();
      if (typeof showToast === "function") {
        showToast("Order sent! Check WhatsApp to confirm with us.");
      }
      checkoutForm.reset();
    });
  }

  renderCart();
  updateSummary();

})();
