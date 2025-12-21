const studioState = { activeSessions: [], currentOpenPage: null };

function initDiagnostics() {
    setInterval(() => {
        document.getElementById('system-clock').innerText = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }, 1000);
    setInterval(() => {
        document.getElementById('buffer-val').innerText = (60 + Math.random() * 10).toFixed(1);
    }, 4000);
}

function addToQueue(name) {
    const hud = document.getElementById('hud-items');
    if (studioState.activeSessions.includes(name)) return;

    studioState.activeSessions.push(name);
    const dot = document.createElement('button');
    dot.title = `REOPEN: ${name.toUpperCase()}`;
    dot.onclick = (e) => { e.stopPropagation(); openProduct(name); };
    
    if (hud.children.length >= 8) {
        hud.removeChild(hud.firstChild);
        studioState.activeSessions.shift();
    }
    hud.appendChild(dot);
}

window.clearQueue = () => {
    document.getElementById('hud-items').innerHTML = '';
    studioState.activeSessions = [];
};

async function openProduct(rawName) {
    const pageName = rawName.toLowerCase().replace(/\s/g, "").replace("-", "");
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
    } catch (err) { console.error(err); window.closePage(); }
}

document.querySelectorAll(".bento-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.add('scanline-active');
        setTimeout(() => card.classList.remove('scanline-active'), 500);
        const name = card.querySelector("h3").innerText;
        addToQueue(name);
        openProduct(name);
    });
});

window.closePage = () => {
    const contentLayer = document.getElementById("content-layer");
    contentLayer.classList.replace('opacity-100', 'opacity-0');
    contentLayer.classList.add('pointer-events-none');
    document.getElementById("page-overlay").style.zIndex = "-1";
    document.getElementById("expansion-pivot").style.opacity = "0";
    document.body.style.overflow = "auto";
};

initDiagnostics();