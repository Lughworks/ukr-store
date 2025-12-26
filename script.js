const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1453722658108735508/LTdntHGIIbfHgp0Ve9q0gFI86BSioA7DZ3mAp0X7QTfXtUh4Srj6T9lEC-HToChEgmAA";
const studioState = {
    productionQueue: JSON.parse(localStorage.getItem('uk_studio_queue_local')) || [],
    currentOpenPage: null,
    isRehydrating: false,
    tempUpload: null // Add this to store the file object
};
const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
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
    
    // Create a clean hex color for the embed sidebar
    const brandColor = config.color && config.color.startsWith('#') 
        ? parseInt(config.color.replace('#', ''), 16) 
        : 0x9c3bf6;

    const formData = new FormData();

    // 1. Build the high-readability Embed
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
                name: "🎨 DESIGN CONFIG", 
                value: `**Front:** ${config.front || 'None'}\n**Font:** ${config.frontFont || 'Default'}\n**Rear:** ${config.back || 'None'}\n**Font:** ${config.backFont || 'Default'}`, 
                inline: true 
            }
        ],
        footer: { text: `UC_STUDIO // ${new Date().toLocaleDateString()} // SESSION_ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}` },
        timestamp: new Date().toISOString()
    };

    // 2. IMAGE HANDLING: Attach the design file
    // We look for 'image' or 'tempImageData' in the item
const imageSrc = config.image || item.tempImageData;

if (imageSrc) {
    try {
        let blob;
        // If it's a local path (like ../images/...), we fetch it to get the data
        if (imageSrc.startsWith('..') || imageSrc.startsWith('/')) {
            const response = await fetch(imageSrc);
            blob = await response.blob();
        } 
        // If it's an uploaded Base64 string
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
    // 3. Assemble and Transmit
    formData.append('payload_json', JSON.stringify({
        username: "UC PRODUCTION TERMINAL",
        avatar_url: "https://unknowncollective.com/logo.png", // Replace with your actual logo URL if you have one
        embeds: [embed]
    }));

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log("[SYSTEM] Manifest transmitted. Clearing local queue item.");
            // Remove the item from log after successful send
            if (itemIndex !== undefined) {
                studioState.productionQueue.splice(itemIndex, 1);
                localStorage.setItem('uk_studio_queue_local', JSON.stringify(studioState.productionQueue));
                renderProductionLog();
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
    // 1. Terminal Clock
    setInterval(() => {
        const clock = document.getElementById('system-clock');
        if (clock) clock.innerText = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }, 1000);

    // 2. Boot Sequence
    const logContainer = document.getElementById('boot-log');
    const bootOverlay = document.getElementById('boot-loader');
    const logs = [
        "> INITIALIZING UC_CORE_v1.0.9...",
        "> ESTABLISHING ENCRYPTED UPLINK...",
        "> LOADING PRODUCTION_MODULES...",
        "> AUTHENTICATING STUDIO_ASSETS...",
        "> READY."
    ];

    if (logContainer) {
        for (const line of logs) {
            const p = document.createElement('p');
            p.className = "mb-1 opacity-0";
            p.innerText = line;
            logContainer.appendChild(p);
            
            // Artificial delay for "processing" feel
            await new Promise(r => setTimeout(r, 400));
            p.classList.remove('opacity-0');
        }
        
        setTimeout(() => {
            bootOverlay.style.opacity = "0";
            // Enable interaction after boot
            bootOverlay.classList.add('hidden');
        }, 800);
    }

    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
        console.log(`[SYSTEM] Recovering Ghost State: ${currentHash}`);
        // Small delay to let the UI settle before opening the product
        setTimeout(() => {
            openProduct(currentHash);
        }, 500); 
    }

    renderHUD();
    renderProductionLog();
}

window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    if (newHash) {
        // If the hash changed and isn't empty, open that product
        openProduct(newHash);
    } else {
        // If the hash is removed (back button to home), close the page
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
        // Just show the image, no animations, no extra divs
        container.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-contain">`;
        // Store the data URL so the save function can find it easily
        studioState.tempUpload = e.target.result;
    };
    reader.readAsDataURL(file);
};

async function openProduct(rawName) {
    let pageName = rawName.toLowerCase().replace("custom", "").replace(/\s/g, "").trim();
    
    // Update the URL hash without reloading the page
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
        'unknowncollective': 'general',
        'visual_log': 'gallery',
        'gallery': 'gallery',
        'team': 'team',
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

window.reopenDesign = async (e, index) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }

    const reversedQueue = [...studioState.productionQueue].reverse();
    const design = reversedQueue[index];
    if (!design) return;

    studioState.isRehydrating = true;
    await openProduct(design.type);

    setTimeout(() => {
        const config = design.config;

        const fInput = document.querySelector('input[placeholder*="FRONT"], input[placeholder*="CONTENT"], input[placeholder*="SLOGAN"]');
        const bInput = document.querySelector('input[placeholder*="BACK"], input[placeholder*="REAR"]');
        if (fInput) fInput.value = config.front || config.text || "";
        if (bInput) bInput.value = config.back || "";

        if (config.size) {
            const sizeBtns = Array.from(document.querySelectorAll('button'));
            const target = sizeBtns.find(b => b.innerText.trim() === config.size);
            if (target) window.updateSelection(target, 'active-size');
        }

        if (config.color) {
            const swatch = document.querySelector(`[data-color="${config.color}"]`);
            if (swatch) window.updateSelection(swatch, 'active-color');
        }

        const frontDropdown = document.getElementById('font-front') || document.getElementById('font-front-t');
        const backDropdown = document.getElementById('font-rear') || document.getElementById('font-rear-t');
        
        if (frontDropdown && config.frontFont) frontDropdown.value = config.frontFont;
        if (backDropdown && config.backFont) backDropdown.value = config.backFont;
        if (config.image) {
            const uploadZone = document.getElementById('image-upload-zone');
            if (uploadZone) {
                uploadZone.dataset.uploadedImage = config.image;
                uploadZone.querySelector('span').innerText = "✅ Image Restored";
                uploadZone.classList.add('border-purple-500');
            }
        }
        studioState.isRehydrating = false;
    }, 850); 
};

window.saveDesignToQueue = (name, config) => {
    // 1. Generate the item object exactly as your UI expects it
    const item = {
        id: `UC-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name, 
        config: config,
        timestamp: new Date().toISOString()
    };

    // 2. Save to the studio state and local storage
    studioState.productionQueue.push(item);
    localStorage.setItem('uk_studio_queue_local', JSON.stringify(studioState.productionQueue));
    
    // 3. Update the Production Log UI
    renderProductionLog();
    renderHUD();

    // 4. THE FIX: Close the product page overlay
    window.closePage();
};

window.removeFromQueue = (index) => {
    // Remove the item from the array
    studioState.productionQueue.splice(index, 1);
    // Save the updated array to storage
    localStorage.setItem('uk_studio_queue_local', JSON.stringify(studioState.productionQueue));
    // Refresh the UI
    renderProductionLog();
    renderHUD();
};

window.renderProductionLog = () => {
    const logContainer = document.getElementById('production-list');
    if (!logContainer) return;

    if (studioState.productionQueue.length === 0) {
        logContainer.innerHTML = `<div class="col-span-full py-20 border border-dashed border-zinc-800 rounded-3xl text-center text-[10px] text-zinc-600 uppercase tracking-widest">No Designs Logged</div>`;
        return;
    }

    // We map and then .reverse() so newest designs appear first visually
    logContainer.innerHTML = studioState.productionQueue.map((item, index) => {
        const config = item.config || {};
        // The actual index in the studioState array
        const qIndex = index;
        
        return `
        <div onclick="reopenDesign(event, ${qIndex})" 
             class="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl hover:border-purple-500 transition-all group cursor-pointer relative overflow-hidden shadow-xl">
            
            <div class="flex justify-between items-start mb-4">
                <div>
                    <span class="text-[9px] text-purple-500 font-bold uppercase tracking-widest">${item.name || 'Unit'}</span>
                    <h4 class="heading-font text-2xl font-black uppercase tracking-tighter">${item.id}</h4>
                </div>
                <div class="text-right">
                    <span class="text-xs text-white font-black block leading-none">${config.size || '--'}</span>
                    <span class="text-[7px] text-zinc-600 uppercase font-black">Spec/Size</span>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-3 py-4 border-y border-zinc-800/50 mb-4">
                
                <div class="flex justify-between items-center">
                    <div class="space-y-0.5">
                        <span class="text-[7px] text-zinc-600 uppercase font-black tracking-tighter">Primary Configuration</span>
                        <p class="text-[10px] text-zinc-200 font-bold uppercase">${config.front || config.text || 'Standard'}</p>
                        ${config.frontFont ? `<p class="text-[8px] text-purple-400/80 font-mono italic">${config.frontFont}</p>` : ''}
                    </div>
                    ${config.image ? `<img src="${config.image}" class="w-8 h-8 rounded border border-zinc-700 object-cover bg-black">` : ''}
                </div>

                ${(config.back && config.back !== 'None') ? `
                <div class="pt-2 border-t border-zinc-800/20 space-y-0.5">
                    <span class="text-[7px] text-zinc-600 uppercase font-black tracking-tighter">Secondary / Rear</span>
                    <p class="text-[10px] text-zinc-200 font-bold uppercase">${config.back}</p>
                    ${config.backFont ? `<p class="text-[8px] text-purple-400/80 font-mono italic">${config.backFont}</p>` : ''}
                </div>
                ` : ''}

                <div class="flex justify-between items-center pt-2 border-t border-zinc-800/20">
                    <span class="text-[7px] text-zinc-500 uppercase font-bold italic">${config.specs || 'Custom Build'}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-[8px] text-zinc-400 uppercase font-black font-mono">${config.color || 'Default'}</span>
                        <div class="w-3 h-3 rounded-full border border-white/20 shadow-sm" style="background: ${config.color || 'transparent'}"></div>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center">
                <span class="text-[7px] text-zinc-700 font-mono font-bold">${new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                
                <div class="flex items-center gap-2">
                    <button onclick="event.stopPropagation(); window.removeFromQueue(${qIndex})" class="p-2 bg-zinc-800 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors group/icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                    <button onclick="event.stopPropagation(); window.orderItem(${qIndex})" class="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `}).reverse().join('');
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
    contentLayer.classList.replace('opacity-100', 'opacity-0');
    contentLayer.classList.add('pointer-events-none');
    setTimeout(() => {
        const pivot = document.getElementById("expansion-pivot");
        pivot.style.width = "0"; pivot.style.height = "0"; pivot.style.opacity = "0";
        document.getElementById("page-overlay").style.zIndex = "-1";
        document.body.style.overflow = "auto";
    }, 400);
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
            title: "The Unknown Collective",
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
                        <span class="text-[10px] font-black text-zinc-700 uppercase tracking-[0.8em] rotate-90">UC_LOG_FILE</span>
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
    if(confirm("SYSTEM OVERRIDE: Clear logs?")) {
        studioState.productionQueue = [];
        localStorage.removeItem('uk_studio_queue_local');
        renderHUD();
        renderProductionLog();
    }
};

window.deleteLogItem = (index) => {
    if(!confirm("SYSTEM: Delete build log " + studioState.productionQueue[index]?.id + "?")) return;
    
    const actualIndex = studioState.productionQueue.length - 1 - index;
    studioState.productionQueue.splice(actualIndex, 1);
    
    localStorage.setItem('uk_studio_queue_local', JSON.stringify(studioState.productionQueue));
    renderProductionLog();
    renderHUD();
};

let currentOrderingIndex = null;

window.orderItem = (index) => {
    // Store the index of the item being ordered
    currentOrderingIndex = index;
    window.checkSavedCustomer();
    
    const modal = document.getElementById('customer-modal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('modal-content').classList.remove('scale-95');
    
    // FIX: Target 'confirm-order-btn' instead of 'your-button-id'
    const finalBtn = document.getElementById('confirm-order-btn');
    if (finalBtn) {
        // We use an arrow function to ensure 'e' (the event) is passed
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

    // Set the global bulk flag
    studioState.isBulkOrder = true;
    
    // Open the customer modal
    const modal = document.getElementById('customer-modal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    
    // Auto-fill if they have saved prefs
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
    if (confirmBtn.disabled) return; // Guard clause

    // 1. Enter "Processing" State
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
            // BULK MODE
            while (studioState.productionQueue.length > 0) {
                const item = studioState.productionQueue[0];
                item.customer = customer;
                
                // Update button text with progress
                confirmBtn.innerText = `SENDING (${studioState.productionQueue.length} REMAINING)`;
                
                await window.sendToDiscord(item, 0);
                await new Promise(r => setTimeout(r, 400)); // Delay
            }
            studioState.isBulkOrder = false;
        } else {
            // SINGLE MODE
            const item = studioState.productionQueue[currentOrderingIndex];
            if (item) {
                item.customer = customer;
                await window.sendToDiscord(item, currentOrderingIndex);
            }
        }

        // 2. Success Sequence
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
        // 3. Reset Button State (in case of error)
        confirmBtn.disabled = false;
        confirmBtn.innerText = originalText;
    }
};

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        console.log("[SYSTEM] ESC sequence detected. Closing active overlays.");
        
        // 1. Close the Product Expansion Page
        window.closePage();
        
        // 2. Close the Customer/Fulfillment Modal
        window.closeCustomerModal();
        
        // 3. Close the Contact Modal
        if (typeof window.closeContactForm === 'function') {
            window.closeContactForm();
        }
    }
});

window.onload = initDiagnostics;