export function render() {
  const __TEXT_COLORS = [
    '#FFFFFF', '#000000', '#9333EA', '#3B82F6', '#22C55E', '#EAB308', '#F97316', '#EF4444',
    '#A1A1AA', '#D4D4D8', '#06B6D4', '#EC4899', '#10B981', '#6366F1', '#F43F5E', '#71717A'
  ];

  const __unit = (window?.computeUnitPriceFromTable?.({ product: { slug: 't-shirts' }, config: {} }) ?? 0);
  const __price = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(__unit);

  const folder = 't-shirts';
  const images = ['1.jpeg', '2.jpeg', '3.jpeg'];

  setTimeout(() => {
    if (typeof window.enable3DViewer === 'function') {
      window.enable3DViewer('t-shirts', 'default');
      window.__tshirtsShowPreview?.('3d');
    }
  }, 100);

  const frontLogoPresetFiles = ['ukr-logo-front.png', 'ukd-logo-front.png'];
  const backImagePresetFiles = ['ukr-logo-back.png', 'ukd-logo-back.png'];

  const s = window.TSHIRT_STATE || {};
  const bodyColor = s.bodyColor || '#000000';
  const frontLogoLabel = s.frontLogoLabel || 'None';
  const backTopTextColor = s.backTopTextColor || '#FFFFFF';
  const backBottomTextColor = s.backBottomTextColor || '#FFFFFF';
  const frontLogoTint = s.frontLogoTint || '#FFFFFF';

  const BODY_COLORS = [
    '#000000', '#FFFFFF', '#4B5563', '#991B1B', '#1E3A8A', '#166534', '#EAB308', '#D946EF',
    '#F97316', '#06B6D4', '#8B5CF6', '#EC4899', '#10B981', '#6366F1', '#F43F5E', '#71717A',
    '#3F3F46', '#27272A', '#52525B', '#A1A1AA', '#D4D4D8', '#E4E4E7', '#F4F4F5', '#FAFAFA',
    '#7F1D1D', '#991B1B', '#B91C1C', '#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA',
    '#7C2D12', '#9A3412', '#C2410C', '#EA580C', '#FB923C', '#FDBA74', '#FED7AA', '#78350F',
    '#92400E', '#B45309', '#D97706'
  ];

  const PANEL = 'bg-zinc-900/40 border border-zinc-800 rounded-3xl';
  const SECTION = 'bg-black/30 border border-zinc-800 rounded-2xl';
  const SECTION_HEAD = 'flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800';
  const SECTION_BODY = 'p-6 space-y-4';
  const TITLE = 'text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400';
  const SUB = 'text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600';
  const ACTION = 'text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-red-400 transition';
  const INPUT = 'w-full bg-black/60 border border-zinc-800 p-4 rounded-2xl text-xs font-mono outline-none focus:border-purple-500 transition';
  const BTN_PRESET = 'aspect-square rounded-2xl border border-zinc-800 bg-black overflow-hidden hover:border-purple-500 transition relative group';
  const HR = 'h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent';
  const SWATCH_GRID = 'grid grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2 border border-zinc-800 rounded-xl bg-black/25';
  const SIZE_BTN ='py-3 bg-black/60 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-purple-500 transition';
  const PRESET_TEXT_BTN ='w-full min-w-0 px-4 py-4 rounded-2xl border border-zinc-800 bg-black hover:border-purple-500 transition text-left overflow-hidden';
  const PRESET_TEXT_MAIN ='text-[10px] font-black uppercase tracking-widest text-white leading-tight line-clamp-2 break-words';
  const PRESET_TEXT_SUB ='text-[9px] text-zinc-600 font-bold uppercase tracking-wider mt-1 truncate';

  return `
    <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
        <div>
          <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Apparel / Studio</span>
          <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Custom T-Shirts</h1>
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/40 mt-3">
            <span class="text-[8px] uppercase tracking-[0.4em] font-black text-zinc-500">Price</span>
            <span class="text-[11px] font-black uppercase tracking-widest text-purple-400">${__price}</span>
          </div>
        </div>

        <button onclick="window.closePage()"
          class="group flex items-center justify-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800 self-start md:self-auto">
          <span class="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
          <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div class="lg:col-span-7 space-y-6 lg:sticky lg:top-10">
          <div id="preview-stage" class="aspect-[4/5] bg-zinc-900/20 border border-zinc-800 rounded-3xl relative overflow-hidden">
            <div id="tshirts-preview-2d" data-preview="2d" class="hidden absolute inset-0 z-10">
              <div class="absolute inset-0 blueprint-grid opacity-30"></div>
              <img
                src="./images/${folder}/1.jpeg"
                id="product-base-image"
                class="absolute inset-0 w-full h-full object-contain p-12 transition-all duration-500"
                onerror="this.src='https://via.placeholder.com/800x1000?text=TEE_DATA_MISSING'"
              />
            </div>

            <div id="tshirts-preview-3d" data-preview="3d" class="absolute inset-0 z-20 p-4"></div>

            <div class="absolute bottom-6 left-6 z-30 flex gap-2">
              <button id="btn-studio" onclick="window.tshirtsShowStudio()"
                class="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:border-purple-500 transition">
                Studio
              </button>
              <button id="btn-3d" onclick="window.tshirtsShow3D()"
                class="bg-white text-black px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest transition">
                3D
              </button>
            </div>
          </div>

          <div class="flex gap-4 overflow-x-auto pb-2 themed-scroll-x">
            ${images.map(img => `
              <button
                onclick="document.getElementById('product-base-image') && (document.getElementById('product-base-image').src='./images/${folder}/${img}')"
                class="w-24 h-24 flex-shrink-0 bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500 transition-all group"
              >
                <img src="./images/${folder}/${img}" class="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity">
              </button>
            `).join('')}
          </div>
        </div>

        <div class="lg:col-span-5 space-y-6">
          <div class="${PANEL} overflow-hidden">
            <div class="px-8 py-7">
              <div class="flex items-start justify-between gap-6">
                <div>
                  <div class="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Configurator</div>
                  <div class="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-700 mt-1">PRINT • FRONT + BACK</div>
                </div>
                <div class="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">
                  MODE: <span class="text-zinc-300">PRINT</span>
                </div>
              </div>
            </div>

            <div class="px-8 pb-8 space-y-5">
              <div class="space-y-4">
                <div id="panel-front-logo" class="${SECTION} overflow-hidden">
                  <div class="${SECTION_HEAD}">
                    <div class="min-w-0">
                      <div class="${TITLE}">Front Logo</div>
                      <div class="${SUB}">Required</div>
                    </div>
                    <div class="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                      Active: <span id="tshirt-front-label" class="text-zinc-300">${frontLogoLabel}</span>
                    </div>
                  </div>

                  <div class="${SECTION_BODY}">
                    <div class="grid grid-cols-3 gap-3">
                      ${frontLogoPresetFiles.map((f) => `
                        <button
                          onclick="window.setTShirtFrontLogoPreset('${f}', this)"
                          class="${BTN_PRESET} ${f === s.frontLogoFile ? 'ring-2 ring-purple-500' : ''}"
                          title="${f}"
                        >
                          <img
                            src="${'./images/t-shirts/presets/front/' + f}"
                            onerror="this.src='./images/t-shirt/presets/front/${f}'"
                            class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition"
                          />
                        </button>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="${SECTION} overflow-hidden">
                  <div class="${SECTION_HEAD}">
                    <div class="min-w-0">
                      <div class="${TITLE}">Logo Tint</div>
                      <div class="${SUB}">Text Only</div>
                    </div>
                    <div class="text-[9px] font-black uppercase tracking-widest text-zinc-700">
                      <span id="front-logo-colour-label">${frontLogoTint}</span>
                    </div>
                  </div>

                  <div class="${SECTION_BODY}">
                    <div data-frontlogocolor-group class="${SWATCH_GRID}">
                      ${__TEXT_COLORS.map((color) => `
                        <div
                          data-frontlogocolor
                          onclick="window.setTShirtFrontLogoTint('${color}', this)"
                          style="background-color:${color}"
                          class="aspect-square rounded-md border border-white/10 cursor-pointer hover:scale-105 transition ${color === frontLogoTint ? 'ring-2 ring-purple-500' : ''}"
                          title="${color}"
                        ></div>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="${HR}"></div>

                <div class="grid grid-cols-1 gap-4">

                  <div class="${SECTION} overflow-hidden">
                    <div class="${SECTION_HEAD}">
                      <div class="min-w-0">
                        <div class="${TITLE}">Back Top Text</div>
                        <div class="${SUB}">Optional</div>
                      </div>
                      <div class="text-[9px] font-black uppercase tracking-widest text-zinc-700">
                        <span id="back-top-text-colour-label">${backTopTextColor}</span>
                      </div>
                    </div>

                    <div class="${SECTION_BODY}">
                      <input
                        id="tshirt-back-top-input"
                        type="text"
                        placeholder="ENTER BACK TOP TEXT..."
                        oninput="window.setTShirtBackTopText(this.value)"
                        class="${INPUT}"
                      />
                      <div data-textcolor-group class="${SWATCH_GRID}">
                        ${__TEXT_COLORS.map((color) => `
                          <div
                            data-swatch
                            onclick="window.setTShirtTextColorFor('backTop','${color}', this)"
                            style="background-color:${color}"
                            class="aspect-square rounded-md border border-white/10 cursor-pointer hover:scale-105 transition ${color === backTopTextColor ? 'ring-2 ring-purple-500' : ''}"
                            title="${color}"
                          ></div>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                  <div class="${SECTION} overflow-hidden">
                    <div class="${SECTION_HEAD}">
                      <div class="min-w-0">
                        <div class="${TITLE}">Back Bottom Text</div>
                        <div class="${SUB}">Optional</div>
                      </div>
                      <div class="text-[9px] font-black uppercase tracking-widest text-zinc-700">
                        <span id="back-bottom-text-colour-label">${backBottomTextColor}</span>
                      </div>
                    </div>

                    <div class="${SECTION_BODY}">
                      <input
                        id="tshirt-back-bottom-input"
                        type="text"
                        placeholder="ENTER BACK BOTTOM TEXT..."
                        oninput="window.setTShirtBackBottomText(this.value)"
                        class="${INPUT}"
                      />
                      <div data-textcolor-group class="${SWATCH_GRID}">
                        ${__TEXT_COLORS.map((color) => `
                          <div
                            data-swatch
                            onclick="window.setTShirtTextColorFor('backBottom','${color}', this)"
                            style="background-color:${color}"
                            class="aspect-square rounded-md border border-white/10 cursor-pointer hover:scale-105 transition ${color === backBottomTextColor ? 'ring-2 ring-purple-500' : ''}"
                            title="${color}"
                          ></div>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                </div>

                <div class="${HR}"></div>

                <div class="${SECTION} overflow-hidden">
                  <div class="${SECTION_HEAD}">
                    <div class="min-w-0">
                      <div class="${TITLE}">Back Image</div>
                      <div class="${SUB}">Optional</div>
                    </div>
                    <div class="text-[9px] text-zinc-500 font-black uppercase tracking-widest">
                      Active: <span id="tshirt-back-image-label" class="text-zinc-300">${s.backImageLabel || 'None'}</span>
                    </div>
                  </div>

                  <div class="${SECTION_BODY}">
                    <div class="grid grid-cols-3 gap-3">
                      ${backImagePresetFiles.map((f) => `
                        <button
                          onclick="window.setTShirtBackImagePreset('${f}', this)"
                          class="${BTN_PRESET}"
                          title="${f}"
                        >
                          <img
                            src="./images/t-shirts/presets/back/${f}"
                            onerror="this.src='./images/t-shirt/presets/back/${f}'"
                            class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition"
                          />
                        </button>
                      `).join('')}
                    </div>

                    <div class="flex items-center justify-end pt-2">
                      <button onclick="window.clearTShirtBackImage()" class="${ACTION}">Clear image</button>
                    </div>
                  </div>
                </div>

                <div class="${HR} my-2"></div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div class="${SECTION} overflow-hidden">
                    <div class="${SECTION_HEAD}">
                      <div>
                        <div class="${TITLE}">T-Shirt Colour</div>
                        <div class="${SUB}">Body</div>
                      </div>
                    </div>
                    <div class="${SECTION_BODY}">
                      <div class="${SWATCH_GRID}">
                        ${BODY_COLORS.map((color) => `
                          <div
                            onclick="window.setTShirtBodyColor('${color}', this)"
                            style="background-color:${color}"
                            class="aspect-square rounded-md border border-white/10 cursor-pointer hover:scale-105 transition ${color === bodyColor ? 'active-tee-color ring-2 ring-purple-500' : ''}"
                            title="${color}"
                          ></div>
                        `).join('')}
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div class="${SECTION} overflow-hidden">
                      <div class="${SECTION_HEAD}">
                        <div>
                          <div class="${TITLE}">Size</div>
                          <div class="${SUB}">Fit</div>
                        </div>
                      </div>
                      <div class="${SECTION_BODY}">
                        <div class="grid grid-cols-4 gap-2">
                          ${['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'].map(size => `
                            <button
                              onclick="window.updateSelection(this, 'active-size')"
                              class="${SIZE_BTN} ${size === (s.size || 'L') ? 'active-size ring-2 ring-purple-500 bg-zinc-100 text-black' : ''}"
                            >
                              ${size}
                            </button>
                          `).join('')}
                        </div>
                      </div>
                    </div>

                    <div class="${SECTION} overflow-hidden">
                      <div class="${SECTION_HEAD}">
                        <div>
                          <div class="${TITLE}">Spec</div>
                          <div class="${SUB}">Material</div>
                        </div>
                      </div>
                      <div class="p-6">
                        <div class="text-[10px] font-bold text-zinc-200 uppercase tracking-widest">
                          240GSM Organic • Boxy Fit • Double Needle
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <button onclick="window.saveTShirtConfig()"
            class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  `;
}

window.TSHIRT_STATE = window.TSHIRT_STATE || {
  bodyColor: '#000000',
  size: 'L',
  frontLogoFile: null,
  frontLogoTint: '#FFFFFF',
  frontLogoRawDataURL: null,
  frontLogoDataURL: null,
  frontLogoLabel: 'None',
  backTopText: '',
  backBottomText: '',
  backTopTextColor: '#FFFFFF',
  backBottomTextColor: '#FFFFFF',
  backImage: null,
  backImageLabel: 'None',
};

window.TSHIRT_3D = window.TSHIRT_3D || {
  bodyMaterialName: 't-shirt-colour',
  frontMaterialName: 't-shirt-front-pocket',
  backImageMaterialName: 't-shirt-back-image',
  backTopTextMaterialName: 't-shirt-back-text-top',
  backBottomTextMaterialName: 't-shirt-back-text-bottom',
};

window.TSHIRT_PRINT_PRESETS_BASE = window.TSHIRT_PRINT_PRESETS_BASE || './images/t-shirt/presets/back/';

window.__TSHIRT_IMAGE_CACHE = window.__TSHIRT_IMAGE_CACHE || new Map();

window.fetchAsDataURL_TShirt = async (url) => {
  const key = String(url || '');
  if (!key) return null;

  if (window.__TSHIRT_IMAGE_CACHE.has(key)) return window.__TSHIRT_IMAGE_CACHE.get(key);

  const p = (async () => {
    const res = await fetch(key, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`[TSHIRTS] Failed to fetch: ${key}`);
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.readAsDataURL(blob);
    });
  })();

  window.__TSHIRT_IMAGE_CACHE.set(key, p);
  return p;
};

window.__normalizeLines = window.__normalizeLines || ((text) => {
  const raw = String(text ?? '');
  const t = raw.replaceAll('/n', '\n');
  return t.split('\n').map(s => s.trim()).filter(Boolean);
});

window.makeMultilineTextTextureDataURL = window.makeMultilineTextTextureDataURL || (({
  text,
  color = '#ffffff',
  fontFamily = 'Inter, Arial',
  weight = 900,
  size = 1024,
  maxWidth = 0.86,
  maxHeight = 0.80,
  lineGap = 1.10
}) => {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');

  ctx.clearRect(0, 0, size, size);

  const lines = window.__normalizeLines(text);
  if (!lines.length) return c.toDataURL('image/png');

  const padX = Math.floor((1 - maxWidth) * size / 2);
  const padY = Math.floor((1 - maxHeight) * size / 2);
  const boxW = size - padX * 2;
  const boxH = size - padY * 2;

  let fontSize = Math.floor(size * 0.24);
  const minFontSize = Math.floor(size * 0.06);

  const fits = () => {
    ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
    const widths = lines.map(l => ctx.measureText(l).width);
    const w = Math.max(...widths);
    const lineH = fontSize * lineGap;
    const h = lineH * lines.length;
    return w <= boxW && h <= boxH;
  };

  while (!fits() && fontSize > minFontSize) fontSize -= 6;

  ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.shadowColor = 'rgba(0,0,0,0.65)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 10;

  const lineH = fontSize * lineGap;
  const totalH = lineH * lines.length;
  const startY = (size / 2) - (totalH / 2) + (lineH / 2);

  lines.forEach((l, idx) => ctx.fillText(l, size / 2, startY + idx * lineH));
  return c.toDataURL('image/png');
});

window.makeContainedImageTextureDataURL = window.makeContainedImageTextureDataURL || (async ({ src, size = 1024, padding = 80 }) => {
  if (!src) return null;

  let dataUrl = src;
  if (!String(src).startsWith('data:image')) dataUrl = await window.fetchAsDataURL_TShirt(src);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = dataUrl;

  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  const avail = size - padding * 2;
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  const scale = Math.min(avail / iw, avail / ih);
  const w = Math.max(1, Math.floor(iw * scale));
  const h = Math.max(1, Math.floor(ih * scale));
  const x = Math.floor((size - w) / 2);
  const y = Math.floor((size - h) / 2);

  ctx.drawImage(img, x, y, w, h);
  return c.toDataURL('image/png');
});

window.__emptyTexture = window.__emptyTexture || (() => {
  const c = document.createElement('canvas');
  c.width = 8;
  c.height = 8;
  return c.toDataURL('image/png');
})();

window.__tshirtsShowPreview = (mode) => {
  const d2 = document.getElementById('tshirts-preview-2d');
  const d3 = document.getElementById('tshirts-preview-3d');
  const is3 = mode === '3d';
  if (d2) d2.classList.toggle('hidden', is3);
  if (d3) d3.classList.toggle('hidden', !is3);
};

window.tshirtsShow3D = () => {
  try { window.__tshirtsShowPreview?.('3d'); } catch (_) {}
  try { window.enable3DViewer?.('t-shirts', 'default'); } catch (_) {}
};

window.tshirtsShowStudio = () => {
  try { window.__tshirtsShowPreview?.('2d'); } catch (_) {}
  try { window.disable3DViewer?.(); } catch (_) {}
  try { window.__syncTShirtFront2D?.(); window.__updateTShirtBackPreview?.(); } catch (_) {}
};

window.applyTShirtTo3D = async () => {
  const mv = window.getActiveModelViewer?.();
  if (!mv || !mv.model) return;

  try { window.setMaterialBaseColor?.(mv, window.TSHIRT_3D.bodyMaterialName, window.TSHIRT_STATE.bodyColor); } catch (_) {}

  try {
    if (window.TSHIRT_STATE.frontLogoDataURL) {
      const frontPng = await window.makeContainedImageTextureDataURL({
        src: window.TSHIRT_STATE.frontLogoDataURL,
        size: 1024,
        padding: 110
      });
      if (frontPng) await window.applyBaseColorTextureURI?.(mv, window.TSHIRT_3D.frontMaterialName, frontPng);
    } else {
      await window.applyBaseColorTextureURI?.(mv, window.TSHIRT_3D.frontMaterialName, window.__emptyTexture);
    }
  } catch (e) {
    console.warn('[TSHIRTS] Front logo apply failed:', e);
  }

  try {
    const t = String(window.TSHIRT_STATE.backTopText || '').trim();
    if (t) {
      const topPng = window.makeMultilineTextTextureDataURL({
        text: t,
        color: window.TSHIRT_STATE.backTopTextColor,
        size: 1024,
        maxWidth: 0.92,
        maxHeight: 0.40,
        lineGap: 1.05
      });
      await window.applyBaseColorTextureURI?.(mv, window.TSHIRT_3D.backTopTextMaterialName, topPng);
    } else {
      await window.applyBaseColorTextureURI?.(mv, window.TSHIRT_3D.backTopTextMaterialName, window.__emptyTexture);
    }
  } catch (e) {
    console.warn('[TSHIRTS] Back top text apply failed:', e);
  }

  try {
    const t = String(window.TSHIRT_STATE.backBottomText || '').trim();
    if (t) {
      const bottomPng = window.makeMultilineTextTextureDataURL({
        text: t,
        color: window.TSHIRT_STATE.backBottomTextColor,
        size: 1024,
        maxWidth: 0.92,
        maxHeight: 0.40,
        lineGap: 1.05
      });
      await window.applyBaseColorTextureURI?.(mv, window.TSHIRT_3D.backBottomTextMaterialName, bottomPng);
    } else {
      await window.applyBaseColorTextureURI?.(mv, window.TSHIRT_3D.backBottomTextMaterialName, window.__emptyTexture);
    }
  } catch (e) {
    console.warn('[TSHIRTS] Back bottom text apply failed:', e);
  }

  try {
    if (window.TSHIRT_STATE.backImage) {
      const imgPng = await window.makeContainedImageTextureDataURL({
        src: window.TSHIRT_STATE.backImage,
        size: 1024,
        padding: 90
      });
      if (imgPng) await window.applyBaseColorTextureURI?.(mv, window.TSHIRT_3D.backImageMaterialName, imgPng);
    } else {
      await window.applyBaseColorTextureURI?.(mv, window.TSHIRT_3D.backImageMaterialName, window.__emptyTexture);
    }
  } catch (e) {
    console.warn('[TSHIRTS] Back image apply failed:', e);
  }
};

window.tintImageToDataURL = window.tintImageToDataURL || (async ({ src, color = '#ffffff', size = 1024 }) => {
  if (!src) return null;

  let dataUrl = src;
  if (!String(src).startsWith('data:image')) dataUrl = await window.fetchAsDataURL_TShirt(src);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = dataUrl;
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');

  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(img, 0, 0, size, size);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'source-over';

  return c.toDataURL('image/png');
});

window.setTShirtBodyColor = (hex, btn) => {
  document.querySelectorAll('.active-tee-color').forEach(el => el.classList.remove('active-tee-color'));
  btn?.classList.add('active-tee-color');
  window.TSHIRT_STATE.bodyColor = hex;
  window.applyTShirtTo3D?.();
};

window.setTShirtTextColorFor = (target, hex, btn) => {
  const t = String(target || '').trim();

  const group = btn?.closest?.('[data-textcolor-group]');
  if (group) group.querySelectorAll('[data-swatch]').forEach(el => el.classList.remove('ring-2', 'ring-purple-500'));
  btn?.classList.add('ring-2', 'ring-purple-500');

  if (t === 'backTop') {
    window.TSHIRT_STATE.backTopTextColor = hex;
    const lbl = document.getElementById('back-top-text-colour-label');
    if (lbl) lbl.textContent = hex;
  } else if (t === 'backBottom') {
    window.TSHIRT_STATE.backBottomTextColor = hex;
    const lbl = document.getElementById('back-bottom-text-colour-label');
    if (lbl) lbl.textContent = hex;
  }

  window.applyTShirtTo3D?.();
};

window.setTShirtFrontLogoPreset = async (fileName, btn) => {
  try {
    const grid = btn?.parentElement;
    if (grid) [...grid.querySelectorAll('button')].forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));
    btn?.classList.add('ring-2', 'ring-purple-500');

    let url = `${window.TSHIRT_PRINT_PRESETS_BASE}${fileName}`;
    let dataUrl = null;

    try { dataUrl = await window.fetchAsDataURL_TShirt(url); }
    catch (_) {
      url = `./images/t-shirts/presets/front/${fileName}`;
      dataUrl = await window.fetchAsDataURL_TShirt(url);
    }

    window.TSHIRT_STATE.frontLogoFile = fileName;
    window.TSHIRT_STATE.frontLogoRawDataURL = dataUrl;
    window.TSHIRT_STATE.frontLogoLabel = fileName;

    const tint = window.TSHIRT_STATE.frontLogoTint || '#FFFFFF';

    const tinted = await window.tintNearWhiteOnlyToDataURL({
      src: dataUrl,
      color: tint,
      threshold: 240,
      feather: 25,
      onlyBelow: 0.55
    });

    window.TSHIRT_STATE.frontLogoDataURL = tinted || dataUrl;

    const label = document.getElementById('tshirt-front-label');
    if (label) label.textContent = fileName;

    const tintLbl = document.getElementById('front-logo-colour-label');
    if (tintLbl) tintLbl.textContent = tint;

    window.applyTShirtTo3D?.();
  } catch (e) {
    console.warn('[TSHIRTS] Front logo preset load failed:', e);
  }
};

window.setTShirtFrontLogoTint = async (hex, btn) => {
  const group = btn?.closest?.('[data-frontlogocolor-group]');
  if (group) group.querySelectorAll('[data-frontlogocolor]').forEach(el => el.classList.remove('ring-2', 'ring-purple-500'));
  btn?.classList.add('ring-2', 'ring-purple-500');

  window.TSHIRT_STATE.frontLogoTint = hex;

  const lbl = document.getElementById('front-logo-colour-label');
  if (lbl) lbl.textContent = hex;

  const raw = window.TSHIRT_STATE.frontLogoRawDataURL || window.TSHIRT_STATE.frontLogoDataURL;
  if (raw) {
    const tinted = await window.tintNearWhiteOnlyToDataURL({
      src: raw,
      color: hex,
      threshold: 240,
      feather: 25,
      onlyBelow: 0.55
    });

    window.TSHIRT_STATE.frontLogoDataURL = tinted || raw;
  }

  window.applyTShirtTo3D?.();
};

window.tintNearWhiteOnlyToDataURL = window.tintNearWhiteOnlyToDataURL || (async ({
  src,
  color = '#ffffff',
  threshold = 235,
  feather = 20,
  onlyBelow = 0.55,
  size = 1024
}) => {
  if (!src) return null;

  let dataUrl = src;
  if (!String(src).startsWith('data:image')) dataUrl = await window.fetchAsDataURL_TShirt(src);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = dataUrl;
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');

  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(img, 0, 0, size, size);

  const imageData = ctx.getImageData(0, 0, size, size);
  const d = imageData.data;

  const hex = String(color).replace('#', '').trim();
  const rr = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
  const gg = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
  const bb = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);

  const yCut = Math.floor(size * Math.max(0, Math.min(1, onlyBelow)));

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const a = d[i + 3];
      if (a === 0) continue;

      if (y < yCut) continue;

      const r = d[i], g = d[i + 1], b = d[i + 2];

      const minc = Math.min(r, g, b);

      if (minc < (threshold - feather)) continue;

      const t = Math.max(0, Math.min(1, (minc - (threshold - feather)) / Math.max(1, feather)));

      d[i]     = Math.round(r * (1 - t) + rr * t);
      d[i + 1] = Math.round(g * (1 - t) + gg * t);
      d[i + 2] = Math.round(b * (1 - t) + bb * t);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return c.toDataURL('image/png');
});

window.clearTShirtFrontLogoPreset = () => {
  window.TSHIRT_STATE.frontLogoFile = null;
  window.TSHIRT_STATE.frontLogoDataURL = null;
  window.TSHIRT_STATE.frontLogoLabel = 'None';
  window.TSHIRT_STATE.frontLogoRawDataURL = null;

  const label = document.getElementById('tshirt-front-label');
  if (label) label.textContent = 'None';

  document.querySelectorAll('#panel-front-logo button.ring-2').forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));

  const imgEl = document.getElementById('preview-front-img');
  if (imgEl) imgEl.removeAttribute('src');

  window.applyTShirtTo3D?.();
};

window.setTShirtBackTopText = (value) => {
  window.TSHIRT_STATE.backTopText = String(value || '');
  window.__updateTShirtBackPreview?.();
  window.applyTShirtTo3D?.();
};

window.setTShirtBackBottomText = (value) => {
  window.TSHIRT_STATE.backBottomText = String(value || '');
  window.__updateTShirtBackPreview?.();
  window.applyTShirtTo3D?.();
};

window.setTShirtBackImagePreset = async (fileName, btn) => {
  try {
    const grid = btn?.parentElement;
    if (grid) [...grid.querySelectorAll('button')].forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));
    btn?.classList.add('ring-2', 'ring-purple-500');

    let url = `${window.TSHIRT_PRINT_PRESETS_BASE}${fileName}`;
    let dataUrl = null;

    try { dataUrl = await window.fetchAsDataURL_TShirt(url); }
    catch (_) {
      url = `./images/t-shirts/presets/back/${fileName}`;
      dataUrl = await window.fetchAsDataURL_TShirt(url);
    }

    window.TSHIRT_STATE.backImage = dataUrl;
    window.TSHIRT_STATE.backImageLabel = fileName;

    const label = document.getElementById('tshirt-back-image-label');
    if (label) label.textContent = fileName;

    window.applyTShirtTo3D?.();
  } catch (e) {
    console.warn('[TSHIRTS] Back image preset load failed:', e);
  }
};

window.setTShirtBackImageFromUpload = () => {
  const src = document.querySelector('#tshirt-image-preview-container img')?.src || null;
  if (!src) return;

  window.TSHIRT_STATE.backImage = src;
  window.TSHIRT_STATE.backImageLabel = 'Upload';

  const label = document.getElementById('tshirt-back-image-label');
  if (label) label.textContent = 'Upload';

  document.querySelectorAll('#panel-print button.ring-2').forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));

  window.applyTShirtTo3D?.();
};

window.clearTShirtBackImage = () => {
  window.TSHIRT_STATE.backImage = null;
  window.TSHIRT_STATE.backImageLabel = 'None';

  const label = document.getElementById('tshirt-back-image-label');
  if (label) label.textContent = 'None';

  const container = document.getElementById('tshirt-image-preview-container');
  if (container) {
    container.innerHTML = `
      <div class="text-center px-4">
        <span class="text-zinc-600 text-[9px] uppercase font-bold tracking-widest">Click to Upload Artwork</span>
      </div>
    `;
  }
  const input = document.getElementById('tshirt-artwork-upload-input');
  if (input) input.value = '';

  document.querySelectorAll('#panel-print button.ring-2').forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));

  window.applyTShirtTo3D?.();
};

window.__updateTShirtBackPreview = () => {
  const el = document.getElementById('preview-back-line');
  if (!el) return;

  const parts = [];
  if (String(window.TSHIRT_STATE.backTopText || '').trim()) parts.push(`TOP: ${window.TSHIRT_STATE.backTopText}`);
  if (String(window.TSHIRT_STATE.backBottomText || '').trim()) parts.push(`BOTTOM: ${window.TSHIRT_STATE.backBottomText}`);
  if (window.TSHIRT_STATE.backImageLabel && window.TSHIRT_STATE.backImageLabel !== 'None') parts.push(`IMAGE: ${window.TSHIRT_STATE.backImageLabel}`);

  el.textContent = parts.length ? parts.join(' • ') : 'None';
};

window.saveTShirtConfig = () => {
  if (!window.TSHIRT_STATE.frontLogoDataURL) {
    alert('Front logo is required (choose one of the 2 logo presets).');
    return;
  }
  const v = window.validateTShirtConfig?.();
  if (v && !v.ok) {
    alert(v.msg);
    return;
  }
  const size = document.querySelector('.active-size')?.innerText || window.TSHIRT_STATE.size || 'L';
  const color = window.TSHIRT_STATE.bodyColor || document.querySelector('.active-tee-color')?.dataset?.color || '#000000';
  window.TSHIRT_STATE.size = size;

  const config = {
    bodyColor: color,
    size,
    specs: '240GSM Organic',

    frontLogoFile: window.TSHIRT_STATE.frontLogoFile,
    frontLogo: window.TSHIRT_STATE.frontLogoLabel,
    frontLogoImage: window.TSHIRT_STATE.frontLogoDataURL,

    backTopText: window.TSHIRT_STATE.backTopText || '',
    backBottomText: window.TSHIRT_STATE.backBottomText || '',
    backTopTextColor: window.TSHIRT_STATE.backTopTextColor,
    backBottomTextColor: window.TSHIRT_STATE.backBottomTextColor,
    backImage: window.TSHIRT_STATE.backImage || null,
    backImageLabel: window.TSHIRT_STATE.backImageLabel || 'None',
  };

  const previewLabel = `PRINT • FRONT LOGO ${window.TSHIRT_STATE.frontLogoLabel || 'Preset'}`;

  window.saveDesignToQueue(
    { slug: 't-shirts', label: 'T-Shirt' },
    config,
    { text: previewLabel }
  );
};

window.on3DModelReady = (slug, mv) => {
  if (slug !== 't-shirts') return;

  window.__tshirtsShowPreview?.('3d');
  try { window.enable3DViewer?.('t-shirts', 'default'); } catch (_) {}

  window.__updateTShirtBackPreview?.();

  if (!window.TSHIRT_STATE.frontLogoDataURL) {
    const firstBtn = document.querySelector('#panel-front-logo button');
    if (firstBtn) {
      const title = firstBtn.getAttribute('title') || null;
      if (title) window.setTShirtFrontLogoPreset(title, firstBtn);
    }
  }

  window.applyTShirtTo3D?.();
};

window.validateTShirtConfig = () => {
  const s = window.TSHIRT_STATE || {};

  if (!window.__trim(s.bodyColor)) return window.__hardFail('Please choose a t-shirt colour.', 'bodyColor');

  if (!window.__trim(s.frontLogoFile) && !window.__trim(s.frontLogoLabel) && !s.frontLogoDataURL) {
    return window.__hardFail('Front logo is required (choose one of the logo presets).', 'frontLogoFile');
  }

  if (window.__len(s.backTopText) > 28) {
    return window.__hardFail('Back top text is too long (max 28 characters).', 'backTopText');
  }
  if (window.__len(s.backBottomText) > 28) {
    return window.__hardFail('Back bottom text is too long (max 28 characters).', 'backBottomText');
  }

  if (s.backImage && !String(s.backImage).startsWith('data:image')) {
    return window.__hardFail('Back image must be a valid image.', 'backImage');
  }

  return window.__ok();
};