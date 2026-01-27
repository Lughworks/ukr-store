export function render() {
  const __unit = (window?.computeUnitPriceFromTable?.({ product: { slug: 'plate' }, config: {} }) ?? 0);
  const __price = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(__unit);

  const folder = 'plate';
  const images = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg'];

  const PANEL = 'bg-zinc-900/40 border border-zinc-800 rounded-3xl';
  const SECTION = 'bg-black/30 border border-zinc-800 rounded-2xl';
  const SECTION_HEAD = 'flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800';
  const SECTION_BODY = 'p-6 space-y-4';
  const TITLE = 'text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400';
  const SUB = 'text-[9px] font-black uppercase tracking-[0.25em] text-zinc-600';
  const HR = 'h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent';

  const SIZE_BTN =
    'py-3 px-2 bg-black/60 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-purple-500 transition';

  window.PLATE_STATE = window.PLATE_STATE || {
    size: '240x240mm',
  };

  const s = window.PLATE_STATE || {};
  const size = s.size || '240x240mm';

  setTimeout(() => {
    if (typeof window.enable3DViewer === 'function') {
      window.enable3DViewer('plate', 'default');
      window.__platesShowPreview?.('3d');
    }
  }, 50);

  return `
    <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
        <div>
          <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Automotive / Driverz Division</span>
          <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Plate Holder</h1>
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
            <div id="plates-preview-2d" data-preview="2d" class="hidden absolute inset-0 z-10">
              <div class="absolute inset-0 blueprint-grid opacity-30"></div>
              <img
                src="./images/${folder}/1.jpeg"
                id="product-base-image"
                class="absolute inset-0 w-full h-full object-contain z-10 p-8 transition-all duration-500"
                onerror="this.src='https://via.placeholder.com/800x1000?text=PLATE_DATA_MISSING'"
              />
            </div>

            <div id="plates-preview-3d" data-preview="3d" class="absolute inset-0 z-20 p-4"></div>

            <div class="absolute bottom-6 left-6 z-30 flex gap-2">
              <button onclick="window.platesShowStudio()"
                class="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:border-purple-500 transition">Studio</button>
              <button onclick="window.platesShow3D()"
                class="bg-white text-black px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest transition">3D</button>
            </div>
          </div>

          <div class="flex gap-3 overflow-x-auto pb-2 themed-scroll-x">
            ${images.map(img => `
              <button
                onclick="document.getElementById('product-base-image') && (document.getElementById('product-base-image').src='./images/${folder}/${img}')"
                class="w-24 h-24 flex-shrink-0 bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500 transition-all group"
              >
                <img src="./images/${folder}/${img}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity">
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
                  <div class="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-700 mt-1">SIZE ONLY</div>
                </div>
                <div class="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">
                  SIZE: <span id="plate-size-label" class="text-zinc-300">${size}</span>
                </div>
              </div>
            </div>

            <div class="px-8 pb-8 space-y-4">
              <div class="${SECTION} overflow-hidden">
                <div class="${SECTION_HEAD}">
                  <div>
                    <div class="${TITLE}">Size</div>
                    <div class="${SUB}">Required</div>
                  </div>
                </div>

                <div class="${SECTION_BODY}">
                  <div class="grid grid-cols-2 gap-3">
                    ${['240x240mm', '560x560mm'].map(sz => `
                      <button
                        onclick="window.setPlateSize('${sz}', this)"
                        class="${SIZE_BTN} ${sz === size ? 'active-plate-size ring-2 ring-purple-500 bg-zinc-100 text-black' : ''}"
                      >
                        ${sz}
                      </button>
                    `).join('')}
                  </div>

                  <div class="${HR} my-2"></div>

                  <div class="text-[10px] font-bold text-zinc-200 uppercase tracking-widest">
                    Confirm your size before adding to cart.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onclick="window.savePlateConfig()"
            class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95">
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  `;
}

window.__platesShowPreview = window.__platesShowPreview || function (mode) {
  const d2 = document.getElementById('plates-preview-2d');
  const d3 = document.getElementById('plates-preview-3d');
  const is3 = mode === '3d';
  if (d2) d2.classList.toggle('hidden', is3);
  if (d3) d3.classList.toggle('hidden', !is3);
};

window.platesShow3D = window.platesShow3D || function () {
  try { window.__platesShowPreview('3d'); } catch (_) { }
  try { window.enable3DViewer?.('plate', 'default'); } catch (_) { }
};

window.platesShowStudio = window.platesShowStudio || function () {
  try { window.__platesShowPreview('2d'); } catch (_) { }
  try { window.disable3DViewer?.(); } catch (_) { }
};

window.setPlateSize = window.setPlateSize || function (sz, btn) {
  window.PLATE_STATE = window.PLATE_STATE || {};
  window.PLATE_STATE.size = sz;

  document.querySelectorAll('.active-plate-size').forEach(el =>
    el.classList.remove('active-plate-size', 'ring-2', 'ring-purple-500', 'bg-zinc-100', 'text-black')
  );

  btn?.classList.add('active-plate-size', 'ring-2', 'ring-purple-500', 'bg-zinc-100', 'text-black');

  const lbl = document.getElementById('plate-size-label');
  if (lbl) lbl.textContent = sz;
};

window.savePlateConfig = window.savePlateConfig || function () {
  const st = window.PLATE_STATE || {};
  const sz = String(st.size || '').trim();
  if (!sz) {
    alert('Size is required.');
    return;
  }

  const config = { size: sz };

  window.saveDesignToQueue?.(
    { slug: 'plate', label: 'Plate Holder' },
    config,
    { text: 'SIZE • ' + sz }
  );
};