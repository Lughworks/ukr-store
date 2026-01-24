export function render() {
    const __unit = (window?.computeUnitPriceFromTable?.({ product: { slug: 'hats' }, config: {} }) ?? 0);
    const __price = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(__unit);

    setTimeout(() => {
        if (typeof window.enable3DViewer === 'function') {
            window.enable3DViewer('hats', 'default');
        }
    }, 50);

    return `
    <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
      <div class="flex justify-between items-center mb-12">
        <div>
          <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Hardware / Division 02</span>
          <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Hats</h1>
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/40">
            <span class="text-[8px] uppercase tracking-[0.4em] font-black text-zinc-500">Price</span>
            <span class="text-[11px] font-black uppercase tracking-widest text-purple-400">${__price}</span>
          </div>
        </div>

        <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
          <span class="text-[10px] font-bold uppercase tracking-widest text-inherit">Back to Studio</span>
          <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-7">
          <div id="preview-stage" class="aspect-square bg-zinc-900/20 border border-zinc-800 rounded-[3rem] flex items-center justify-center p-8 relative overflow-hidden">
            <div data-preview="3d" class="absolute inset-0 p-4"></div>
          </div>
        </div>

        <div class="lg:col-span-5 space-y-6">
          <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
            <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-4 text-purple-500 italic">Step 1: Select Logo</h3>
            <div class="grid grid-cols-2 gap-4">
              <button onclick="window.updateHatLogo('UR?', this)" class="active-preset p-4 bg-zinc-800 border border-zinc-700 rounded-2xl font-black italic">UR?</button>
              <button onclick="window.updateHatLogo('UD?', this)" class="p-4 bg-zinc-800 border border-zinc-700 rounded-2xl font-black italic opacity-60 hover:opacity-100">UD?</button>
            </div>
          </div>

          <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Step 2: Fill Style</h3>
              <div class="flex gap-2">
                <button id="btn-mode-color" onclick="window.toggleFillMode('color')" class="text-[9px] font-bold px-3 py-1 bg-white text-black rounded-full transition-all">Solid</button>
                <button id="btn-mode-pattern" onclick="window.toggleFillMode('pattern')" class="text-[9px] font-bold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full transition-all">Pattern</button>
              </div>
            </div>

            <div id="fill-colors" class="grid grid-cols-7 gap-2">
              ${['#FFFFFF', '#FF0000', '#9333EA', '#22C55E', '#3B82F6', '#EAB308', '#000000'].map(color => `
                <div
                  onclick="window.applyLogoFill('color', '${color}', this)"
                  style="background-color: ${color}"
                  class="aspect-square rounded-md border-2 border-transparent cursor-pointer hover:scale-110 transition"
                ></div>
              `).join('')}
            </div>

            <div id="fill-patterns" class="hidden grid grid-cols-3 gap-3 mt-4">
              ${['Camo', 'Grid', 'Acid', 'Digital', 'Carbon', 'Leopard'].map(pat => `
                <div
                  onclick="window.applyLogoFill('pattern', '${pat.toLowerCase()}.png', this)"
                  style="background-image: url('./images/hats/patterns/${pat.toLowerCase()}.png'); background-size: cover; background-position: center;"
                  class="aspect-square rounded-xl border-2 border-transparent cursor-pointer hover:scale-110 transition flex items-end p-2 group"
                >
                  <span class="text-[7px] font-black uppercase bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">${pat}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
            <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-4 text-zinc-400">Step 3: Product Colour</h3>
            <div id="hat-body-colors" class="grid grid-cols-7 gap-2">
              ${['#FFFFFF', '#FF0000', '#9333EA', '#22C55E', '#3B82F6', '#EAB308', '#000000'].map(color => `
                <div
                  onclick="window.applyHatBodyColor('${color}', this)"
                  style="background-color:${color}"
                  class="aspect-square rounded-md border-2 border-transparent cursor-pointer hover:scale-110 transition"
                ></div>
              `).join('')}
            </div>
          </div>

          <button onclick="window.saveHatConfig()" class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-xl">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

window.HAT_STATE = {
    text: 'UR?',
    fillMode: 'color',
    fillValue: '#000000',
    bodyColor: '#000000'
};

window.HAT_3D = {
    bodyMaterialName: 'hat-colour',
    logoMaterialName: 'hat-text'
};


window.__HAT_PATTERN_CACHE = window.__HAT_PATTERN_CACHE || new Map();

window.loadHatPatternImage = async (fileName) => {
    const key = String(fileName || '').trim();
    if (!key) throw new Error('No pattern fileName');

    if (window.__HAT_PATTERN_CACHE.has(key)) return window.__HAT_PATTERN_CACHE.get(key);

    const url = `./images/hats/patterns/${key}`;

    const p = new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = async () => {
            try { if (img.decode) await img.decode(); } catch (_) { }
            resolve(img);
        };
        img.onerror = () => reject(new Error(`[HATS] Pattern failed to load: ${url}`));
        img.src = url;
    });

    window.__HAT_PATTERN_CACHE.set(key, p);
    return p;
};

window.makeFilledTextTextureDataURL = async ({
    text,
    fillMode = 'color',
    fillValue = '#FFFFFF',
    fontFamily = 'Inter, Arial',
    weight = 900,
    size = 1024,
    targetWidth = 0.78
}) => {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');

    ctx.clearRect(0, 0, size, size);

    let fillStyle = fillValue;

    if (fillMode === 'pattern') {
        try {
            const img = await window.loadHatPatternImage(fillValue);
            const pat = ctx.createPattern(img, 'repeat');
            fillStyle = pat || '#FFFFFF';
        } catch (err) {
            console.warn(err);
            fillMode = 'color';
            fillStyle = '#FFFFFF';
        }
    }

    const t = String(text || '');
    let fontPx = 260;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const fit = () => {
        ctx.font = `${weight} ${fontPx}px ${fontFamily}`;
        const measured = ctx.measureText(t).width || 1;
        const desired = size * targetWidth;
        const scale = desired / measured;
        fontPx = Math.max(24, Math.floor(fontPx * scale));
        ctx.font = `${weight} ${fontPx}px ${fontFamily}`;
    };

    fit();

    ctx.shadowColor = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 10;

    ctx.fillStyle = fillStyle;
    ctx.fillText(t, size / 2, size / 2);

    return c.toDataURL('image/png');
};

window.applyHatTo3D = async () => {
    const mv = window.getActiveModelViewer?.();
    if (!mv || !mv.model) return;

    if (window.HAT_STATE.bodyColor) {
        window.setMaterialBaseColor?.(mv, window.HAT_3D.bodyMaterialName, window.HAT_STATE.bodyColor);
    }

    try {
        const png = await window.makeFilledTextTextureDataURL({
            text: window.HAT_STATE.text,
            fillMode: window.HAT_STATE.fillMode,
            fillValue: window.HAT_STATE.fillValue,
            size: 1024,
            targetWidth: 0.78
        });

        await window.applyBaseColorTextureURI?.(mv, window.HAT_3D.logoMaterialName, png);
    } catch (e) {
        console.warn('[HATS] applyHatTo3D failed:', e);
    }
};

window.toggleFillMode = (mode) => {
    const btnColor = document.getElementById('btn-mode-color');
    const btnPat = document.getElementById('btn-mode-pattern');
    const colors = document.getElementById('fill-colors');
    const pats = document.getElementById('fill-patterns');

    const isPattern = mode === 'pattern';

    if (btnColor) {
        btnColor.className = isPattern
            ? 'text-[9px] font-bold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full transition-all'
            : 'text-[9px] font-bold px-3 py-1 bg-white text-black rounded-full transition-all';
    }
    if (btnPat) {
        btnPat.className = isPattern
            ? 'text-[9px] font-bold px-3 py-1 bg-white text-black rounded-full transition-all'
            : 'text-[9px] font-bold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full transition-all';
    }

    if (colors) colors.classList.toggle('hidden', isPattern);
    if (pats) pats.classList.toggle('hidden', !isPattern);

    window.HAT_STATE.fillMode = isPattern ? 'pattern' : 'color';

    if (isPattern && String(window.HAT_STATE.fillValue).startsWith('#')) {
        window.HAT_STATE.fillValue = 'camo.png';

        const patternImg = document.getElementById('svg-logo-pattern-img');
        patternImg?.setAttribute('href', `./images/hats/patterns/${window.HAT_STATE.fillValue}`);

        const logo = document.getElementById('svg-logo-target');
        if (logo) logo.style.fill = 'url(#logo-pattern-fill)';
    }

    window.applyHatTo3D?.();
};

window.updateHatLogo = (text, btn) => {
    window.updateSelection?.(btn, 'active-preset');

    const el = document.getElementById('svg-logo-target');
    if (el) el.textContent = text;

    window.HAT_STATE.text = text;
    window.applyHatTo3D?.();
};

window.applyLogoFill = (type, value, btn) => {
    const logo = document.getElementById('svg-logo-target');
    const patternImg = document.getElementById('svg-logo-pattern-img');

    document.querySelectorAll('#fill-colors div, #fill-patterns div').forEach(el => {
        el.style.borderColor = 'transparent';
    });
    if (btn) btn.style.borderColor = '#9333ea';

    if (type === 'pattern') {
        patternImg?.setAttribute('href', `./images/hats/patterns/${value}`);
        if (logo) logo.style.fill = 'url(#logo-pattern-fill)';

        window.HAT_STATE.fillMode = 'pattern';
        window.HAT_STATE.fillValue = value;
    } else {
        if (logo) logo.style.fill = value;

        window.HAT_STATE.fillMode = 'color';
        window.HAT_STATE.fillValue = value;
    }

    window.applyHatTo3D?.();
};

window.applyHatBodyColor = (hex, btn) => {
    btn?.parentElement?.querySelectorAll('div')?.forEach(el => (el.style.borderColor = 'transparent'));
    if (btn) btn.style.borderColor = '#9333ea';

    window.HAT_STATE.bodyColor = hex;

    const body = document.getElementById('svg-hat-body');
    if (body) body.setAttribute('fill', hex);

    window.applyHatTo3D?.();
};

window.saveHatConfig = () => {
    const logo = document.getElementById('svg-logo-target');

    window.saveDesignToQueue?.(
        { slug: 'hats', label: 'Hat' },
        {
            logo: window.HAT_STATE.text,
            fillMode: window.HAT_STATE.fillMode,
            fillValue: window.HAT_STATE.fillValue,
            bodyColor: window.HAT_STATE.bodyColor || null,
            specs: 'Hat / Embroidery'
        },
        { text: (logo?.textContent || 'Hat') }
    );
};

window.on3DModelReady = (slug, mv) => {
    if (slug !== 'hats') return;
    window.applyHatTo3D?.();
};
