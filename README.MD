## 🚀 Roadmap / Next Steps

This section outlines the **planned next stages** for the UKR Store, prioritised by **impact, usability, and launch readiness**.

---

### **1️⃣ Checkout & Order Completion (Highest Priority)**

> Converts the store from a demo into a fully usable product.

* Checkout confirmation screen
* Full order summary (items, quantities, pricing, shipping tier)
* Payment handoff (Stripe / Shopify Buy Button / manual invoice)
* Clear “Order placed” success state
* Cart clear or lock after checkout

---

### **2️⃣ Full Mobile Compatibility**

> Ensures the store works flawlessly on phones and tablets.

* Mobile-first cart UX (thumb-friendly controls)
* Responsive cart drawer / modal behaviour
* Mobile-optimised quantity controls
* Ensure 3D viewer performance on mobile devices
* Disable or simplify heavy effects on low-power devices
* Test across iOS Safari / Android Chrome

---

### **3️⃣ Sticker Shipping Logic**

> Stickers have different fulfilment needs and should be handled separately.

* Decide sticker shipping rules:
  * Flat-rate shipping
  * Separate shipping line
  * Excluded from free-shipping threshold
* Clear customer messaging (e.g. “Ships separately”)
* Correct cart and checkout totals

---

### **4️⃣ 3D Viewer Enhancements**

> Improves perceived quality and user engagement.

* Remember last view mode (Studio ↔ 3D) per product
* Auto-switch to 3D on desktop hover (desktop only)
* Lighting presets (Studio / Outdoor / Night)
* Mobile AR quick-view (supported by `<model-viewer>`)

---

### **5️⃣ Cart & UX Polish**

> Small changes with high UX impact.

* “You’re £X away from free shipping” messaging across the site
* Animate green eligible-for-free-shipping state
* Improved empty cart state (visual + messaging)
* Better cart open/close behaviour
* Disable checkout when cart is empty

---

### **6️⃣ Performance & Production Readiness**

> Required before public launch.

* Replace Tailwind CDN with a production build
* Optimise images and GLB assets
* Fix missing asset paths (favicon, base images)
* Preload critical assets (hero images, models)

---

### **7️⃣ Product & Content Management**

> Makes the store easier to maintain long-term.

* Centralised product configuration
* Simplified price updates per product
* Variant-based pricing rules
* Feature flags (e.g. enable/disable 3D per product)

---

### **8️⃣ Admin / Operations Tools**

> Improves fulfilment and internal workflows.

* Admin cart/order data export (JSON / CSV)
* Simple order ID generation
* Versioned order snapshots
* Debug / support tooling

---

### **9️⃣ Future / Nice-to-Have**

> Not required for launch, but potential long-term upgrades.

* Live texture or decal preview on 3D models
* User accounts / saved designs
* Multi-currency support
* Discount codes and promotions

---

### **Summary**

Immediate focus is on **checkout, mobile compatibility, and shipping logic**, followed by **3D polish and UX refinement**.
The goal is a **fast, mobile-friendly, static-first store** ready for public launch.
