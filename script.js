const DISCORD_WEBHOOK_URL = "";
const studioState = {
    productionQueue: JSON.parse(localStorage.getItem('uk_studio_queue_local')) || [],
    currentOpenPage: null,
    isRehydrating: false,
    tempUpload: null
};
const BOOT_HOLD = 1200;
const persistQueue = () => {
    localStorage.setItem(
        'uk_studio_queue_local',
        JSON.stringify(studioState.productionQueue)
    );
};

const PRICING_SCHEMA_VERSION = 1;

const SHIPPING = {
    currency: 'GBP',
    tiers: [
        { minSubtotal: 0, cost: 4.99, label: 'Standard Shipping' },
        { minSubtotal: 75, cost: 0, label: 'Free Shipping' }
    ]
};

const pickShippingTier = (subtotal) => {
    const tiers = (SHIPPING.tiers || []).slice().sort((a, b) => (a.minSubtotal || 0) - (b.minSubtotal || 0));
    let chosen = tiers[0] || { minSubtotal: 0, cost: 0, label: 'Shipping' };
    for (const t of tiers) {
        if ((subtotal || 0) >= (t.minSubtotal || 0)) chosen = t;
    }
    return chosen;
};

window.MODEL_MAP = {
    'hoodies': {
        label: 'Hoodie',
        variants: {
            down: './assets/models/hood-down.glb',
            up: './assets/models/hood-up.glb'
        }
    },
    't-shirts': {
        label: 'T-Shirt',
        variants: {
            default: './assets/models/t-shirt.glb'
        }
    },
    'hats': {
        label: 'Hat',
        variants: {
            default: './assets/models/hat.glb'
        }
    },
    'balaclavas': {
        label: 'Balaclava',
        variants: {
            default: './assets/models/balaclava.glb'
        }
    },
    'sunstrips': {
        label: 'Sunstrip',
        variants: {
            default: './assets/models/sunstrip.glb'
        }
    },
    'stickers': {
        label: 'Stickers',
        variants: {
            default: './assets/models/stickers.glb'
        }
    }
};

window.getActiveModelViewer = () => {
    const stage = document.getElementById('preview-stage');
    return stage ? stage.querySelector('model-viewer') : null;
};

window.hexToBaseColorFactor = (hex) => {
    const h = String(hex || '#FFFFFF').replace('#', '').trim();
    const full = h.length === 3 ? h.split('').map(x => x + x).join('') : h.padEnd(6, '0').slice(0, 6);

    const r = parseInt(full.slice(0, 2), 16) / 255;
    const g = parseInt(full.slice(2, 4), 16) / 255;
    const b = parseInt(full.slice(4, 6), 16) / 255;

    return [r, g, b, 1];
};

window.setMaterialBaseColor = (mv, materialName, hex) => {
    if (!mv?.model) return false;

    const mat = mv.model.getMaterialByName(materialName);
    if (!mat?.pbrMetallicRoughness) {
        console.warn('[3D] No PBR material for', materialName);
        return false;
    }

    mat.pbrMetallicRoughness.setBaseColorFactor(window.hexToBaseColorFactor(hex));
    mv.requestUpdate();
    return true;
};

window.enable3DViewer = (slug, variant = 'default') => {
    const stage = document.getElementById('preview-stage');
    if (!stage) return;

    const cfg = window.MODEL_MAP?.[slug];
    const src = cfg?.variants?.[variant] || cfg?.variants?.default;
    if (!src) return;

    const d2 = stage.querySelector('[data-preview="2d"]');
    const d3 = stage.querySelector('[data-preview="3d"]');

    d2?.classList.add('preview-hidden');
    d2?.classList.remove('preview-visible');
    d2?.classList.remove('hidden');

    d3?.classList.remove('preview-hidden');
    d3?.classList.add('preview-visible');
    d3?.classList.remove('hidden');

    const ensureLoadHook = (mv) => {
        if (mv.__ueLoadHooked) return;
        mv.__ueLoadHooked = true;

        mv.addEventListener('load', () => {
            const mats = mv?.model?.materials || [];
            console.log('[3D] Loaded:', mv.src);
            console.log('[3D] Materials:', mats.map(m => m.name));
            console.log('[3D] Variants:', mv.availableVariants);
            if (typeof window.on3DModelReady === 'function') window.on3DModelReady(slug, mv);
        });
    };

    const setUpModelViewer = () => {
        let mv = stage.querySelector('model-viewer');
        if (!mv) {
            mv = document.createElement('model-viewer');
            mv.setAttribute('camera-controls', '');
            mv.setAttribute('touch-action', 'pan-y');
            mv.setAttribute('shadow-intensity', '1');
            mv.setAttribute('exposure', '1');
            mv.setAttribute('environment-image', 'neutral');

            mv.setAttribute('reveal', 'manual');

            mv.style.width = '100%';
            mv.style.height = '100%';
            mv.style.display = 'block';
            mv.style.background = 'transparent';

            d3?.appendChild(mv);
        }

        ensureLoadHook(mv);

        mv.__ueSlug = slug;
        mv.__ueVariant = variant;
        mv.src = src;
        mv.alt = `${cfg?.label || slug} 3D model`;

        if (typeof mv.dismissPoster === 'function') mv.dismissPoster();

        mv.requestUpdate();
    };

    const setSrcWhenSized = () => {
        const r = d3?.getBoundingClientRect?.();
        const w = r?.width || 0;
        const h = r?.height || 0;

        if (w > 2 && h > 2) {
            setUpModelViewer();
            return;
        }
        requestAnimationFrame(setSrcWhenSized);
    };

    requestAnimationFrame(setSrcWhenSized);
};


window.disable3DViewer = () => {
    const stage = document.getElementById('preview-stage');
    if (!stage) return;

    const mv = stage.querySelector('model-viewer');
    if (mv) { try { mv.src = ''; } catch (e) { } mv.remove(); }

    const d3 = stage.querySelector('[data-preview="3d"]');
    const d2 = stage.querySelector('[data-preview="2d"]');

    d3?.classList.add('preview-hidden');
    d3?.classList.remove('preview-visible');

    d2?.classList.remove('preview-hidden');
    d2?.classList.add('preview-visible');
};

(() => {
    const pick = () => ({
        stage: document.getElementById('preview-stage'),
        d3: document.querySelector('[data-preview="3d"]'),
        mv: document.querySelector('model-viewer')
    });

    const rect = (el) => el ? el.getBoundingClientRect() : null;
    const key = (r) => r ? `${Math.round(r.width)}x${Math.round(r.height)} @ ${Math.round(r.top)}` : 'null';

    let last = { stage: '', d3: '', mv: '' };

    const tick = () => {
        const { stage, d3, mv } = pick();
        const rs = rect(stage), r3 = rect(d3), rm = rect(mv);

        const ks = key(rs), k3 = key(r3), km = key(rm);

        if (ks !== last.stage) { console.log('[watch] stage', ks); last.stage = ks; }
        if (k3 !== last.d3) { console.log('[watch] d3   ', k3); last.d3 = k3; }
        if (km !== last.mv) { console.log('[watch] mv   ', km); last.mv = km; }

        if ((rs && (rs.width === 0 || rs.height === 0)) ||
            (r3 && (r3.width === 0 || r3.height === 0)) ||
            (rm && (rm.width === 0 || rm.height === 0))) {
            console.warn('[watch] ZERO SIZE DETECTED', { rs, r3, rm });
        }

        requestAnimationFrame(tick);
    };

    console.log('[watch] started');
    requestAnimationFrame(tick);
})();

window.makeTextTextureDataURL = ({
    text,
    color = '#ffffff',
    fontFamily = 'Inter, Arial',
    weight = '900',
    width = 1024,
    height = 512,
    padding = 0.12
}) => {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;

    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;

    const maxW = width * (1 - padding * 2);
    const maxH = height * (1 - padding * 2);

    let size = maxH;
    do {
        ctx.font = `${weight} ${size}px ${fontFamily}`;
        const metrics = ctx.measureText(text);
        if (metrics.width <= maxW && size <= maxH) break;
        size -= 2;
    } while (size > 10);

    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = size * 0.12;
    ctx.shadowOffsetY = size * 0.08;

    ctx.fillText(text, width / 2, height / 2);
    return c.toDataURL('image/png');
};


window.applyBaseColorTextureURI = async (mv, materialName, dataUrl) => {
    if (!mv?.model) return false;

    const mat = mv.model.getMaterialByName(materialName);
    if (!mat) {
        console.warn('[3D] Material not found:', materialName);
        return false;
    }

    const pbr = mat.pbrMetallicRoughness;
    if (!pbr) {
        console.warn('[3D] No PBR on material:', materialName);
        return false;
    }

    const texture = await mv.createTexture(dataUrl);

    if (pbr.baseColorTexture && typeof pbr.baseColorTexture.setTexture === 'function') {
        pbr.baseColorTexture.setTexture(texture);
    } else if (typeof pbr.setBaseColorTexture === 'function') {
        pbr.setBaseColorTexture(texture);
    } else {
        console.warn('[3D] Cannot set base color texture on:', materialName, pbr);
        return false;
    }

    if (typeof mat.setAlphaMode === 'function') {
        mat.setAlphaMode('BLEND');
    }

    mv.requestUpdate();
    return true;
};

window.set3DVariant = (slug, variant) => {
    window.enable3DViewer(slug, variant);
};

window.getFreeShippingTarget = () => {
    const tiers = (SHIPPING.tiers || [])
        .slice()
        .sort((a, b) => (a.minSubtotal || 0) - (b.minSubtotal || 0));

    return tiers.find(t => Number(t.cost) === 0)?.minSubtotal || null;
};

window.getFreeShippingRemaining = () => {
    const target = window.getFreeShippingTarget();
    if (!target) return 0;
    const subtotal = window.getCartSubtotal();
    return Math.max(0, target - subtotal);
};

window.getFreeShippingProgress = () => {
    const target = window.getFreeShippingTarget();
    if (!target) return 1;
    return Math.min(1, window.getCartSubtotal() / target);
};
window.updateShippingMini = () => {
    const bar = document.getElementById('shipping-mini-bar');
    const label = document.getElementById('shipping-mini-label');
    const wrap = document.getElementById('shipping-mini');
    if (!bar || !wrap) return;

    const remaining = window.getFreeShippingRemaining ? window.getFreeShippingRemaining() : 0;
    const progress = window.getFreeShippingProgress ? window.getFreeShippingProgress() : 0;

    if (typeof window.getShippingTierLabel === 'function') {
        label.textContent = window.getShippingTierLabel();
    } else {
        label.textContent = 'Shipping';
    }

    if (!remaining) {
        bar.style.width = '100%';
        bar.classList.remove('bg-purple-500');
        bar.classList.add('bg-green-500');
        if (label) label.textContent = 'Free';
    } else {
        bar.style.width = `${Math.max(0, Math.min(1, progress)) * 100}%`;
        bar.classList.remove('bg-green-500');
        bar.classList.add('bg-purple-500');
        if (label) label.textContent = 'Standard';
    }
};

window.getCartShipping = () => {
    const subtotal = window.getCartSubtotal();
    const tier = pickShippingTier(subtotal);
    return Number(tier.cost || 0) || 0;
};

window.getCartTotal = () => {
    return window.getCartSubtotal() + window.getCartShipping();
};

const normalizeQueueItem = (item) => {
    const it = (item && typeof item === 'object') ? item : {};

    if (!it.product || typeof it.product !== 'object') {
        const legacyLabel = it.name || it.type || 'Product';
        it.product = { slug: (it.type || '').toString(), label: legacyLabel };
    }
    if (!it.product.slug) {
        it.product.slug = (it.product.label || '').toString().toLowerCase().replace(/\s/g, '').replace(/[^a-z0-9\-]/g, '');
    }
    if (!it.product.label) it.product.label = it.name || 'Product';

    if (!it.config || typeof it.config !== 'object') it.config = {};
    if (!it.preview || typeof it.preview !== 'object') it.preview = {};
    it.quantity = Math.max(1, Math.min(99, Number(it.quantity || 1) || 1));

    if (!it.pricing || typeof it.pricing !== 'object') it.pricing = {};
    if (!it.pricing.currency) it.pricing.currency = CURRENCY;
    if (it.pricing.schemaVersion == null) it.pricing.schemaVersion = PRICING_SCHEMA_VERSION;
    if (it.pricing.locked == null) it.pricing.locked = true;
    if (!it.pricing.unit || Number(it.pricing.unit) <= 0) {
        it.pricing.unit = window.computeUnitPriceFromTable(it);
    }
    it.pricing.line = window.getItemLineTotal(it);

    return it;
};

const CURRENCY = 'GBP';
const formatMoney = (amount, currency = CURRENCY) => {
    const n = Number(amount || 0);
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(n);
};

const PRICE_TABLE = {
    'hoodies': { unit: 45.00, sizeUpcharge: { '2XL': 5.00, '3XL': 5.00, '4XL': 5.00, '5XL': 5.00 } },
    't-shirts': { unit: 30.00, sizeUpcharge: { '2XL': 3.00, '3XL': 3.00, '4XL': 3.00, '5XL': 3.00 } },
    'hats': { unit: 22.00 },
    'balaclavas': { unit: 18.00 },
    'sunstrips': { unit: 15.00 },
    'stickers': {
        byPack: {
            '25': 8.00,
            '50': 12.00,
            '100': 18.00,
            '150': 24.00
        },
        defaultPack: '50'
    }
};

window.computeUnitPriceFromTable = (item) => {
    const slug = item?.product?.slug;
    if (!slug) return 0;

    const rule = PRICE_TABLE[slug];
    if (!rule) return 0;

    if (slug === 'stickers') {
        const pack = String(item?.config?.quantity || rule.defaultPack || '50');
        return Number(rule.byPack?.[pack] ?? rule.byPack?.[rule.defaultPack] ?? 0) || 0;
    }

    let base = Number(rule.unit || 0) || 0;

    const size = (item?.config?.size || '').toString().toUpperCase();
    if (size && rule.sizeUpcharge && rule.sizeUpcharge[size] != null) {
        base += Number(rule.sizeUpcharge[size]) || 0;
    }

    return base;
};

window.getItemUnitPrice = (item) => {
    const stored = item?.pricing?.unit;
    const locked = item?.pricing?.locked !== false;
    const schemaVersion = item?.pricing?.schemaVersion || PRICING_SCHEMA_VERSION;

    if (locked && stored != null && !Number.isNaN(Number(stored)) && Number(stored) > 0) {
        return Number(stored);
    }

    const computed = window.computeUnitPriceFromTable(item);

    if (!item.pricing) item.pricing = { currency: CURRENCY };
    if (!locked || schemaVersion !== PRICING_SCHEMA_VERSION) {
        item.pricing.unit = computed;
        item.pricing.schemaVersion = PRICING_SCHEMA_VERSION;
    }

    return computed;
};

window.getItemLineTotal = (item) => {
    const unit = window.getItemUnitPrice(item);
    const qty = Number(item?.quantity || 1) || 1;
    return unit * qty;
};

window.getCartSubtotal = () => {
    return (studioState.productionQueue || []).reduce((sum, item) => sum + window.getItemLineTotal(item), 0);
};


const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

window.checkSavedCustomer = () => {
    const saved = localStorage.getItem('uk_studio_saved_local');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('cust-name').value = data.name || '';
        document.getElementById('cust-email').value = data.email || '';
        document.getElementById('cust-address').value = data.address || '';
        document.getElementById('save-cust-prefs').checked = true;
    }
};

window.sendToDiscord = async (item, itemIndex) => {
    const config = item.config || {};
    const cust = item.customer || { name: "N/A", email: "N/A", address: "N/A" };

    const brandColor = config.color && config.color.startsWith('#') ? parseInt(config.color.replace('#', ''), 16) : 0x9c3bf6;

    const formData = new FormData();

    const embed = {
        title: `🏗️ PRODUCTION MANIFEST: ${item.id}`,
        description: `**Product:** ${item.name.toUpperCase()}\n**Status:** READY_FOR_PRINT`,
        color: brandColor,
        fields: [
            {
                name: "👤 CUSTOMER DETAILS",
                value: `**Name:** ${cust.name}\n**Email:** ${cust.email}\n**Shipping:** ${cust.address}`,
                inline: false
            },
            {
                name: "👕 GARMENT SPECS",
                value: `**Size:** ${config.size || 'N/A'}\n**Base Color:** ${config.color || 'N/A'}\n**Material:** ${config.specs || 'Standard'}`,
                inline: true
            },
            {
                name: "💷 PRICING",
                value: `**Unit:** ${formatMoney(window.getItemUnitPrice(item))}\n**Qty:** ${item.quantity || 1}\n**Line:** ${formatMoney(window.getItemLineTotal(item))}`,
                inline: true
            },
            {
                name: "🎨 DESIGN CONFIG",
                value: `**Front:** ${config.front || 'None'}\n**Font:** ${config.frontFont || 'Default'}\n**Rear:** ${config.back || 'None'}\n**Font:** ${config.backFont || 'Default'}`,
                inline: true
            }
        ],
        footer: { text: `UE_STUDIO // ${new Date().toLocaleDateString()} // SESSION_ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}` },
        timestamp: new Date().toISOString()
    };

    const imageSrc = config.image || item.tempImageData;

    if (imageSrc) {
        try {
            let blob;
            if (imageSrc.startsWith('..') || imageSrc.startsWith('/')) {
                const response = await fetch(imageSrc);
                blob = await response.blob();
            }
            else if (imageSrc.startsWith('data:image')) {
                const response = await fetch(imageSrc);
                blob = await response.blob();
            }

            if (blob) {
                formData.append('file', blob, 'design_manifest.png');
                embed.image = { url: 'attachment://design_manifest.png' };
            }
        } catch (e) {
            console.error("Failed to bundle design image:", e);
        }
    }
    formData.append('payload_json', JSON.stringify({
        username: "UE PRODUCTION TERMINAL",
        avatar_url: "https://unknownempire.com/logo.png",
        embeds: [embed]
    }));

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log("[SYSTEM] Manifest transmitted. Clearing local queue item.");
            if (itemIndex !== undefined) {
                studioState.productionQueue.splice(itemIndex, 1);
                localStorage.setItem('uk_studio_queue_local', JSON.stringify(studioState.productionQueue));
                renderCart();
                renderHUD();
            }
        } else {
            const errorText = await response.text();
            console.error("[SYSTEM] Webhook Error:", errorText);
            alert("TRANSMISSION ERROR: Check Console.");
        }
    } catch (err) {
        console.error("[CRITICAL] Network failure:", err);
    }
};

async function initDiagnostics() {
    studioState.productionQueue = (studioState.productionQueue || []).map(normalizeQueueItem);
    persistQueue();

    setInterval(() => {
        const clock = document.getElementById('system-clock');
        if (clock) clock.innerText = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }, 1000);

    const uBlock = document.getElementById('u-block');
    const eBlock = document.getElementById('e-block');
    const nknown = document.getElementById('nknown-chamber');
    const mpire = document.getElementById('mpire-chamber');
    const loader = document.getElementById('boot-loader');
    const assembly = document.getElementById('brand-assembly');

    await new Promise(r => setTimeout(r, BOOT_HOLD));

    uBlock.style.transform = "translateY(0)";
    uBlock.style.opacity = "1";

    await new Promise(r => setTimeout(r, 100));

    eBlock.style.transform = "translateY(0)";
    eBlock.style.opacity = "1";

    await new Promise(r => setTimeout(r, 800));

    nknown.style.width = "30vw";
    mpire.style.width = "26vw";

    await new Promise(r => setTimeout(r, 2000));

    loader.style.opacity = "0";
    assembly.style.transform = "scale(1.2)";
    assembly.style.filter = "blur(10px)";

    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);

    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
        setTimeout(() => openProduct(currentHash), 500);
    }

    renderHUD();
    renderCart();
    if (typeof window.updateShippingMini === 'function') window.updateShippingMini();
    if (typeof window.updateLandingPrices === 'function') window.updateLandingPrices();
}

window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    if (newHash) {
        openProduct(newHash);
    } else {
        window.closePage();
    }
});

window.updateSelection = (element, className) => {
    const parent = element.parentElement;
    parent.querySelectorAll('.' + className).forEach(el => el.classList.remove(className));
    element.classList.add(className);
};

window.handleImageUpload = (input) => {
    const file = input.files[0];
    if (!file) return;

    const container = document.getElementById('image-preview-container');
    const reader = new FileReader();

    reader.onload = (e) => {
        container.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-contain">`;
        studioState.tempUpload = e.target.result;
    };
    reader.readAsDataURL(file);
};

async function openProduct(rawName) {
    let pageName = rawName.toLowerCase().replace("custom", "").replace(/\s/g, "").trim();

    window.location.hash = pageName;
    const fileMap = {
        'hoodie': 'hoodies',
        'tshirt': 't-shirts',
        't-shirt': 't-shirts',
        'hat': 'hats',
        'balaclava': 'balaclavas',
        'sticker': 'stickers',
        'ur': 'ur',
        'ud': 'ud',
        'unknownempire': 'general',
        'visual_log': 'gallery',
        'gallery': 'gallery',
        'team': 'team',
        'sunstrip': 'sunstrips',
    };

    if (fileMap[pageName]) pageName = fileMap[pageName];

    const pivot = document.getElementById("expansion-pivot");
    const contentLayer = document.getElementById("content-layer");
    const pageOverlay = document.getElementById("page-overlay");

    pageOverlay.style.zIndex = "60";
    pageOverlay.classList.remove("pointer-events-none");
    pivot.style.opacity = "1";
    pivot.style.width = "100vw"; pivot.style.height = "100vh";
    pivot.style.top = "0"; pivot.style.left = "0";
    pivot.style.transition = "all 0.6s cubic-bezier(0.85, 0, 0.15, 1)";

    try {
        const pageModule = await import(`./pages/${pageName}.js`);
        contentLayer.innerHTML = pageModule.render();

        setTimeout(() => {
            contentLayer.style.zIndex = "100";
            contentLayer.classList.replace('opacity-0', 'opacity-100');
            contentLayer.classList.remove('pointer-events-none');
            document.body.style.overflow = "hidden";
        }, 450);
    } catch (err) {
        console.error(`[SYSTEM] Page Load Fail: ${pageName}`, err);
        window.closePage();
    }
}

window.saveDesignToQueue = (product, config, preview = {}) => {
    if (!product || typeof product !== "object") {
        console.warn("saveDesignToQueue called with invalid product:", product);
        return;
    }

    if (!product.slug || !product.label) {
        console.warn("Product missing slug/label:", product);
        return;
    }

    const item = {
        id: `UE-${Math.floor(1000 + Math.random() * 9000)}`,
        product: {
            slug: product.slug,
            label: product.label
        },
        config,
        preview,
        quantity: 1,
        pricing: {
            currency: CURRENCY,
            schemaVersion: PRICING_SCHEMA_VERSION,
            locked: true,
            unit: 0,
            line: 0
        },
        timestamp: new Date().toISOString()
    };

    item.pricing.unit = (typeof window.computeUnitPriceFromTable === 'function') ? window.computeUnitPriceFromTable(item) : 0;
    item.pricing.line = window.getItemLineTotal(item);

    studioState.productionQueue.push(item);
    persistQueue();

    renderCart();
    renderHUD();
    if (typeof window.updateShippingMini === 'function') window.updateShippingMini();
    if (typeof window.updateShippingMini === 'function') window.updateShippingMini();
    closePage();
};

window.setCartItemQuantity = (index, nextQty) => {
    const item = studioState.productionQueue[index];
    if (!item) return;

    const qty = Math.max(1, Math.min(99, Number(nextQty || 1) || 1));
    item.quantity = qty;

    if (!item.pricing) item.pricing = { currency: CURRENCY, unit: window.getItemUnitPrice(item), line: 0 };
    if (!item.pricing.unit || Number(item.pricing.unit) <= 0) item.pricing.unit = window.getItemUnitPrice(item);
    item.pricing.line = window.getItemLineTotal(item);

    persistQueue();
    renderCart();
    renderHUD();
    if (typeof window.updateShippingMini === 'function') window.updateShippingMini();
};

window.bumpCartItemQuantity = (index, delta) => {
    const item = studioState.productionQueue[index];
    if (!item) return;
    window.setCartItemQuantity(index, (Number(item.quantity || 1) || 1) + (Number(delta) || 0));
};

window.removeFromQueue = (index) => {
    studioState.productionQueue.splice(index, 1);
    localStorage.setItem('uk_studio_queue_local', JSON.stringify(studioState.productionQueue));
    renderCart();
    renderHUD();
    if (typeof window.updateShippingMini === 'function') window.updateShippingMini();
};

window.renderCart = () => {
    const container = document.getElementById('production-list');
    if (!container) return;

    if (studioState.productionQueue.length === 0) {
        container.innerHTML = `
          <div class="col-span-full py-20 border border-dashed border-zinc-800 rounded-3xl text-center text-[10px] text-zinc-600 uppercase tracking-widest">
            Cart is empty
          </div>`;
        return;
    }

    const items = studioState.productionQueue
        .map((item, index) => ({ item, index }))
        .reverse();

    const subtotal = window.getCartSubtotal();
    const tierShort = (() => {
        if (typeof window.getShippingTierLabel === "function") {
            return window.getShippingTierLabel();
        }

        if (typeof pickShippingTier === "function") {
            const tier = pickShippingTier(subtotal);
            return Number(tier?.cost || 0) === 0 ? "Free" : "Standard";
        }

        return "Standard";
    })();
    container.innerHTML = `
        <div class="col-span-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/30">
            <div class="text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                Items: <span class="text-white">${studioState.productionQueue.length}</span>
            </div>
            <div class="text-sm font-black uppercase tracking-widest flex flex-col md:items-end gap-1">
                <div>
                    Subtotal:
                    <span class="text-purple-400">${formatMoney(subtotal)}</span>
                </div>

                <div class="text-[11px] text-zinc-400 font-black uppercase tracking-widest">
                    Shipping:
                    <span class="text-zinc-200">
                        ${formatMoney(window.getCartShipping())}
                    </span>
                    <span class="ml-1 text-zinc-600 font-black">(${tierShort})</span>
                </div>

                ${(() => {
            const remaining = window.getFreeShippingRemaining();
            const progress = window.getFreeShippingProgress();

            if (!remaining) {
                return `
                            <div class="mt-2 flex items-center justify-end gap-2 text-[10px] uppercase font-black tracking-widest text-green-400">
                                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Eligible for free shipping
                            </div>
                        `;
            }
            return `
                        <div class="mt-2 w-full max-w-xs">
                            <div class="flex justify-between text-[9px] uppercase font-black tracking-widest text-zinc-600 mb-1">
                                <span>Free Shipping:</span>
                                <span class="text-purple-400">${formatMoney(remaining)} to go</span>
                            </div>
                            <div class="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    class="h-full bg-purple-500 transition-all duration-500"
                                    style="width: ${progress * 100}%"
                                ></div>
                            </div>
                        </div>
                    `;
        })()}

                <div class="text-[12px] text-white font-black uppercase tracking-widest">
                    Total:
                    <span class="text-purple-400">
                        ${formatMoney(window.getCartTotal())}
                    </span>
                </div>
            </div>
        </div>

        ${items.map(({ item, index }) => {
            const unit = window.getItemUnitPrice(item);
            const line = window.getItemLineTotal(item);
            const currency = item?.pricing?.currency || CURRENCY;
            const qty = Number(item.quantity || 1) || 1;

            return `
            <div class="border border-zinc-800 rounded-xl p-4 bg-zinc-900/20">
                <div class="flex justify-between items-start gap-4">
                    <div class="min-w-0 flex-1">
                        <p class="text-xs uppercase tracking-widest text-zinc-400">
                            ${(item.product?.label || item.name || 'Product')}
                        </p>
                        <p class="text-sm font-semibold truncate">
                            ${item.preview?.text || "Custom Design"}
                        </p>

                        <div class="mt-4 flex flex-col gap-3">
                            <div class="flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                                <span>Unit: <span class="text-zinc-200">${formatMoney(unit, currency)}</span></span>
                                <span>Total: <span class="text-purple-400">${formatMoney(line, currency)}</span></span>
                            </div>

                            <div class="flex items-center gap-3">
                                <span class="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Qty</span>

                                <div class="inline-flex items-center rounded-xl border border-zinc-800 bg-black overflow-hidden">
                                    <button onclick="bumpCartItemQuantity(${index}, -1)" class="px-3 py-2 text-sm font-black text-zinc-300 hover:text-white hover:bg-zinc-900 transition" aria-label="Decrease quantity">−</button>
                                    <input
                                        value="${qty}"
                                        inputmode="numeric"
                                        class="w-12 text-center bg-transparent text-[10px] font-black uppercase tracking-widest text-white outline-none"
                                        onkeydown="if(event.key==='Enter'){ event.preventDefault(); this.blur(); }"
                                        onblur="setCartItemQuantity(${index}, this.value)"
                                    />
                                    <button onclick="bumpCartItemQuantity(${index}, 1)" class="px-3 py-2 text-sm font-black text-zinc-300 hover:text-white hover:bg-zinc-900 transition" aria-label="Increase quantity">+</button>
                                </div>

                                <span class="text-[9px] uppercase tracking-widest text-zinc-600 font-black">(1–99)</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2 shrink-0">
                        <button onclick="reopenDesign(${index})" class="text-[10px] uppercase tracking-widest font-black px-4 py-2 rounded-lg border border-zinc-800 bg-black hover:border-purple-500 transition">
                            Edit
                        </button>
                        <button onclick="removeFromQueue(${index})" class="text-[10px] uppercase tracking-widest font-black px-4 py-2 rounded-lg border border-zinc-800 bg-black hover:border-red-500 hover:text-red-400 transition">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            `;
        }).join('')}
    `;
};

window.reopenDesign = async (index) => {
    const item = studioState.productionQueue[index];
    if (!item) return;

    await openProduct(item.product.slug);

    setTimeout(() => {
        hydratePageWithConfig(item.config);
    }, 300);
};

window.closePage = () => {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.value = "";
    });
    if (studioState) {
        studioState.tempUpload = null;
    }
    if (studioState.isRehydrating && !document.getElementById("content-layer").innerHTML) return;
    history.pushState("", document.title, window.location.pathname + window.location.search);
    const contentLayer = document.getElementById("content-layer");

    const mv = contentLayer?.querySelector('model-viewer');
    if (mv) {
        try { mv.src = ''; } catch (e) { }
        mv.remove();
    }

    contentLayer.classList.replace('opacity-100', 'opacity-0');
    contentLayer.classList.add('pointer-events-none');

    setTimeout(() => {
        const pivot = document.getElementById("expansion-pivot");
        pivot.style.width = "0"; pivot.style.height = "0"; pivot.style.opacity = "0";
        document.getElementById("page-overlay").style.zIndex = "-1";
        document.body.style.overflow = "auto";

        contentLayer.innerHTML = '';
    }, 400);
};

window.getShippingInfoLabel = () => {
    const free = window.getFreeShippingTarget();
    if (!free) return "Shipping calculated at checkout";
    return `Free shipping over ${formatMoney(free)}`;
};

window.updateLandingPrices = () => {
    const set = (id, value) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = (typeof formatMoney === 'function')
            ? formatMoney(value)
            : new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(value || 0));
    };

    const priceFor = (slug, config = {}) => {
        if (typeof window.computeUnitPriceFromTable === 'function') {
            return window.computeUnitPriceFromTable({ product: { slug }, config }) || 0;
        }
        if (typeof window.getItemUnitPrice === 'function') {
            return window.getItemUnitPrice({ product: { slug }, config }) || 0;
        }
        return 0;
    };

    set('price-hoodies', priceFor('hoodies'));
    set('price-tshirts', priceFor('t-shirts'));
    set('price-hats', priceFor('hats'));
    set('price-balaclavas', priceFor('balaclavas'));
    set('price-sunstrips', priceFor('sunstrips'));
    set('price-stickers', priceFor('stickers', { quantity: '50' }));

    document.querySelectorAll('[data-shipping-info]').forEach(el => {
        el.textContent = window.getShippingInfoLabel();
    });
};

function renderHUD() {
    const hud = document.getElementById('hud-items');
    if (!hud) return;
    hud.innerHTML = '';
    studioState.productionQueue.slice(-8).forEach(() => {
        const dot = document.createElement('div');
        dot.className = "w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#9c3bf6]";
        hud.appendChild(dot);
    });
}

window.expandIntelligence = (group) => {
    const data = {
        ur: {
            title: "Division: Unknown Riderz",
            color: "#3b82f6",
            specs: ["High-Vis technicals", "Aerodynamic integration", "Urban resilience"],
            bio: "Specialized in high-speed urban transit. Built for the chase, optimized for the night. Our Riderz operate in the dense urban core."
        },
        general: {
            title: "The Unknown Empire",
            color: "#a855f7",
            specs: ["Multi-disciplinary studio", "Subterranean Network", "Performance Hardware"],
            bio: "A collaborative effort between design, engineering, and culture. We build the tools for those who refuse to be tracked."
        },
        ud: {
            title: "Division: Unknown Driverz",
            color: "#ef4444",
            specs: ["Precision handling", "Thermal management", "Cockpit ergonomics"],
            bio: "Automotive division focusing on the bridge between man and machine. Aesthetics for the midnight run."
        }
    };

    const info = data[group];

    const content = `
        <div class="min-h-screen bg-black text-white p-8 md:p-24 relative overflow-y-auto">
            <div class="max-w-4xl mx-auto">
                <button onclick="window.closePage()" class="mb-12 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-500 hover:text-white transition">
                    <span class="text-xl">←</span> Back to Studio
                </button>
                
                <span class="text-xs font-black uppercase tracking-[0.5em]" style="color: ${info.color}">Intelligence_Report</span>
                <h1 class="heading-font text-6xl md:text-8xl font-black uppercase tracking-tighter mt-4 mb-12">${info.title}</h1>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="space-y-6">
                        <p class="text-lg text-zinc-400 font-medium leading-relaxed">${info.bio}</p>
                        <div class="pt-8 border-t border-zinc-800">
                            <span class="text-[10px] text-zinc-600 font-black uppercase tracking-widest block mb-4">Division_Directives</span>
                            <ul class="space-y-3">
                                ${info.specs.map(s => `<li class="text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                                    <span class="w-1 h-1 rounded-full" style="background: ${info.color}"></span> ${s}
                                </li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8 flex items-center justify-center relative group overflow-hidden">
                        <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                        <span class="text-[10px] font-black text-zinc-700 uppercase tracking-[0.8em] rotate-90">UE_LOG_FILE</span>
                        <div class="w-full aspect-square border-2 border-dashed border-zinc-800 rounded-full flex items-center justify-center">
                             <span class="text-4xl font-black" style="color: ${info.color}">${group.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const studioSubpage = document.getElementById('studio-subpage');
    studioSubpage.innerHTML = content;
    studioSubpage.classList.remove('translate-y-full');
};

window.clearQueue = () => {
    if (confirm("SYSTEM OVERRIDE: Clear logs?")) {
        studioState.productionQueue = [];
        localStorage.removeItem('uk_studio_queue_local');
        renderHUD();
        renderCart();
    }
};

window.deleteLogItem = (index) => {
    if (!confirm("SYSTEM: Delete build log " + studioState.productionQueue[index]?.id + "?")) return;

    const actualIndex = studioState.productionQueue.length - 1 - index;
    studioState.productionQueue.splice(actualIndex, 1);

    localStorage.setItem('uk_studio_queue_local', JSON.stringify(studioState.productionQueue));
    renderCart();
    renderHUD();
    if (typeof window.updateShippingMini === 'function') window.updateShippingMini();
};

let currentOrderingIndex = null;

window.orderItem = (index) => {
    currentOrderingIndex = index;
    window.checkSavedCustomer();

    const modal = document.getElementById('customer-modal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('modal-content').classList.remove('scale-95');

    const finalBtn = document.getElementById('confirm-order-btn');
    if (finalBtn) {
        finalBtn.onclick = (e) => window.finalizeOrderWithCustomerData(e);
    }
};

window.closeCustomerModal = () => {
    const modal = document.getElementById('customer-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
};

window.orderAllItems = () => {
    if (studioState.productionQueue.length === 0) {
        alert("PRODUCTION QUEUE EMPTY. NO DATA TO TRANSMIT.");
        return;
    }

    studioState.isBulkOrder = true;

    const modal = document.getElementById('customer-modal');
    modal.classList.remove('opacity-0', 'pointer-events-none');

    window.checkSavedCustomer();

    console.log(`[SYSTEM] Bulk Mode Activated: ${studioState.productionQueue.length} items in queue.`);
};

window.exportProductionSheet = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(studioState.productionQueue, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "uk_production_manifest.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

document.querySelectorAll(".bento-card").forEach(card => {
    card.addEventListener("click", () => {
        const name = card.querySelector("h3")?.innerText;
        if (name) openProduct(name);
    });
});

window.openContactForm = () => {
    const modal = document.getElementById('contact-modal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('contact-content').classList.remove('scale-95');
};

window.closeContactForm = () => {
    const modal = document.getElementById('contact-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.getElementById('contact-content').classList.add('scale-95');
};

window.handleContactSubmit = async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;

    btn.innerText = "TRANSMITTING...";
    btn.disabled = true;

    setTimeout(() => {
        alert("MESSAGE RECEIVED. We will respond if necessary.");
        closeContactForm();
        btn.innerText = originalText;
        btn.disabled = false;
        e.target.reset();
    }, 1500);
};

window.finalizeOrderWithCustomerData = async (e) => {
    if (e) e.preventDefault();

    const confirmBtn = document.getElementById('confirm-order-btn');
    if (confirmBtn.disabled) return;
    const originalText = confirmBtn.innerText;
    confirmBtn.disabled = true;
    confirmBtn.innerText = studioState.isBulkOrder ? "TRANSMITTING BATCH..." : "UPLOADING...";

    const customer = {
        name: document.getElementById('cust-name').value,
        email: document.getElementById('cust-email').value,
        address: document.getElementById('cust-address').value
    };

    try {
        if (studioState.isBulkOrder) {
            while (studioState.productionQueue.length > 0) {
                const item = studioState.productionQueue[0];
                item.customer = customer;

                confirmBtn.innerText = `SENDING (${studioState.productionQueue.length} REMAINING)`;

                await window.sendToDiscord(item, 0);
                await new Promise(r => setTimeout(r, 400));
            }
            studioState.isBulkOrder = false;
        } else {
            const item = studioState.productionQueue[currentOrderingIndex];
            if (item) {
                item.customer = customer;
                await window.sendToDiscord(item, currentOrderingIndex);
            }
        }

        window.closeCustomerModal();
        const feedback = document.createElement('div');
        feedback.className = "fixed inset-0 z-[1000] bg-white text-black flex items-center justify-center font-black italic text-4xl uppercase tracking-tighter";
        feedback.innerHTML = "MANIFEST_TRANSMITTED";
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
            window.closePage();
        }, 2000);

    } catch (err) {
        console.error("Transmission Failed", err);
        alert("CRITICAL ERROR DURING TRANSMISSION");
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.innerText = originalText;
    }
};

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        console.log("[SYSTEM] ESC sequence detected. Closing active overlays.");

        window.closePage();

        window.closeCustomerModal();

        if (typeof window.closeContactForm === 'function') {
            window.closeContactForm();
        }
    }
});

window.onload = initDiagnostics;