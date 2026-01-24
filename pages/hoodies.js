export function render() {
  const __TEXT_COLORS = [
    '#FFFFFF', '#000000', '#9333EA', '#3B82F6', '#22C55E', '#EAB308', '#F97316', '#EF4444',
    '#A1A1AA', '#D4D4D8', '#06B6D4', '#EC4899', '#10B981', '#6366F1', '#F43F5E', '#71717A'
  ];

  const __unit = (window?.computeUnitPriceFromTable?.({ product: { slug: 'hoodies' }, config: {} }) ?? 0);
  const __price = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(__unit);

  const folder = 'hoodies';
  const images = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg'];

  const frontPrintPresetFiles = ['ukr-logo-front.png', 'ukd-logo-front.png'];
  const backPrintPresetFiles = ['ukr-logo-back.png', 'ukd-logo-back.png'];

  const s = window.HOODIE_STATE || {};
  const isPrint = (s.mode || 'print') === 'print';

  const frontTextColor = s.frontTextColor || '#FFFFFF';
  const backTopTextColor = s.backTopTextColor || '#FFFFFF';
  const backEmbTextColor = s.backEmbTextColor || '#FFFFFF';

  const frontPrintTint = s.frontPrintTint || '#FFFFFF';
  const frontLabel = s.frontLabel || 'None';

  const bodyColor = s.bodyColor || '#000000';

  const BODY_COLORS = [
    '#000000', '#FFFFFF', '#4B5563', '#991B1B', '#1E3A8A', '#166534', '#EAB308', '#D946EF',
    '#F97316', '#06B6D4', '#8B5CF6', '#EC4899', '#10B981', '#6366F1', '#F43F5E', '#71717A',
    '#3F3F46', '#27272A', '#52525B', '#A1A1AA', '#D4D4D8', '#E4E4E7', '#F4F4F5', '#FAFAFA',
    '#7F1D1D', '#991B1B', '#B91C1C', '#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA',
    '#7C2D12', '#9A3412', '#C2410C', '#EA580C', '#FB923C', '#FDBA74', '#FED7AA', '#78350F',
    '#92400E', '#B45309', '#D97706'
  ];

  setTimeout(() => {
    if (typeof window.enable3DViewer === 'function') {
      window.enable3DViewer('hoodies', 'default');
      window.__hoodiesShowPreview?.('3d');
    }
  }, 50);

  // Shared UI system (match t-shirts)
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
  const SIZE_BTN =
    'py-3 bg-black/60 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-purple-500 transition';

  // ✅ New: “Preset text” buttons that never overflow:
  // - no fixed height
  // - internal padding
  // - truncation + clamp
  // - full text on hover via title
  const PRESET_TEXT_BTN =
    'w-full min-w-0 px-4 py-4 rounded-2xl border border-zinc-800 bg-black hover:border-purple-500 transition text-left overflow-hidden';
  const PRESET_TEXT_MAIN =
    'text-[10px] font-black uppercase tracking-widest text-white leading-tight line-clamp-2 break-words';
  const PRESET_TEXT_SUB =
    'text-[9px] text-zinc-600 font-bold uppercase tracking-wider mt-1 truncate';

  return `
    <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">
        <div>
          <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Apparel / Studio</span>
          <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Custom Hoodies</h1>
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

        <!-- LEFT: PREVIEW -->
        <div class="lg:col-span-7 space-y-6 lg:sticky lg:top-10">
          <div id="preview-stage" class="aspect-[4/5] bg-zinc-900/20 border border-zinc-800 rounded-3xl relative overflow-hidden">
            <div id="hoodies-preview-2d" data-preview="2d" class="hidden absolute inset-0">
              <div class="absolute inset-0 blueprint-grid opacity-30"></div>
              <img
                src="./images/${folder}/1.jpeg"
                id="product-base-image"
                class="absolute inset-0 w-full h-full object-contain z-10 p-8 transition-all duration-500"
                onerror="this.src='https://via.placeholder.com/800x1000?text=HOODIE_DATA_MISSING'"
              />
            </div>

            <div id="hoodies-preview-3d" data-preview="3d" class="absolute inset-0 p-4"></div>

            <div class="absolute bottom-6 left-6 z-30 flex gap-2">
              <button onclick="window.hoodiesShowStudio()"
                class="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:border-purple-500 transition">Studio</button>
              <button onclick="window.hoodiesShow3D()"
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

          <div class="${PANEL} p-6">
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-3 border border-zinc-800 rounded-xl">
                <p class="text-[8px] text-zinc-500 uppercase">Composition</p>
                <p class="text-[10px] font-bold">80% Cotton / 20% Poly</p>
              </div>
              <div class="text-center p-3 border border-zinc-800 rounded-xl">
                <p class="text-[8px] text-zinc-500 uppercase">Pocket</p>
                <p class="text-[10px] font-bold">Kangaroo Pouch</p>
              </div>
              <div class="text-center p-3 border border-zinc-800 rounded-xl">
                <p class="text-[8px] text-zinc-500 uppercase">Hood</p>
                <p class="text-[10px] font-bold">Double Lined</p>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: CONFIGURATOR -->
        <div class="lg:col-span-5 space-y-6">

          <div class="${PANEL} overflow-hidden">
            <div class="px-8 py-7">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <div class="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Customization</div>
                  <div class="text-[9px] font-black uppercase tracking-[0.35em] text-zinc-700 mt-1">Front + Back</div>
                </div>

                <div class="inline-flex items-center rounded-full border border-zinc-800 bg-black p-1">
                  <button id="tab-print"
                    onclick="window.setHoodieMode('print')"
                    class="${isPrint
                      ? 'px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-white text-black transition'
                      : 'px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white transition'}">
                    Print
                  </button>
                  <button id="tab-emb"
                    onclick="window.setHoodieMode('embroidered')"
                    class="${!isPrint
                      ? 'px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-white text-black transition'
                      : 'px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white transition'}">
                    Embroidered
                  </button>
                </div>
              </div>
            </div>

            <div class="px-8 pb-8 space-y-5">
              <div class="space-y-4">

                <!-- FRONT LOGO -->
                <div class="${SECTION} overflow-hidden">
                  <div class="${SECTION_HEAD}">
                    <div class="min-w-0">
                      <div class="${TITLE}">Front Logo</div>
                      <div class="${SUB}">${isPrint ? 'Required • Print' : 'Required • Emb'}</div>
                    </div>
                    <div class="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                      Active: <span id="hoodie-front-label" class="text-zinc-300">${isPrint ? (frontLabel || 'None') : (s.frontTextPreset || 'UnknownRiderz')}</span>
                    </div>
                  </div>

                  <div class="${SECTION_BODY}">
                    <!-- Print presets -->
                    <div id="panel-front-print" class="${isPrint ? '' : 'hidden'} space-y-3">
                      <div class="grid grid-cols-3 gap-3">
                        ${frontPrintPresetFiles.map((f) => `
                          <button
                            onclick="window.setHoodieFrontPrintPreset('${f}', this)"
                            class="${BTN_PRESET} ${f === s.frontPrintFile ? 'ring-2 ring-purple-500' : ''}"
                            title="${f}"
                          >
                            <img
                              src="${'./images/hoodie/presets/front/' + f}"
                              onerror="this.onerror=null; this.src='${'./images/hoodies/presets/front/' + f}'"
                              class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition"
                            />
                          </button>
                        `).join('')}
                      </div>
                    </div>

                    <!-- Emb text presets (no overflow) -->
                    <div id="panel-front-embroidered" class="${isPrint ? 'hidden' : ''} space-y-3">
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onclick="window.setHoodieFrontTextPreset('UnknownRiderz', this)"
                          class="active-front ${PRESET_TEXT_BTN}"
                          title="UnknownRiderz"
                        >
                          <div class="${PRESET_TEXT_MAIN}">UnknownRiderz</div>
                          <div class="${PRESET_TEXT_SUB}">Front embroidery preset</div>
                        </button>

                        <button
                          onclick="window.setHoodieFrontTextPreset('UnknownDriverz', this)"
                          class="${PRESET_TEXT_BTN} opacity-90 hover:opacity-100"
                          title="UnknownDriverz"
                        >
                          <div class="${PRESET_TEXT_MAIN}">UnknownDriverz</div>
                          <div class="${PRESET_TEXT_SUB}">Front embroidery preset</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- FRONT COLOUR -->
                <div class="${SECTION} overflow-hidden">
                  <div class="${SECTION_HEAD}">
                    <div class="min-w-0">
                      <div id="ui-front-colour-title" class="${TITLE}">${isPrint ? 'Logo Tint' : 'Front Embroidery Colour'}</div>
                      <div id="ui-front-colour-sub" class="${SUB}">${isPrint ? 'Text only' : 'Thread'}</div>
                    </div>

                    <div class="text-[9px] font-black uppercase tracking-widest text-zinc-700">
                      <span id="hoodie-front-tint-label" class="${isPrint ? '' : 'hidden'}">${frontPrintTint}</span>
                      <span id="hoodie-front-emb-colour-label" class="${isPrint ? 'hidden' : ''}">${frontTextColor}</span>
                    </div>
                  </div>

                  <div class="${SECTION_BODY}">
                    <div id="panel-front-tint" class="${isPrint ? '' : 'hidden'}">
                      <div class="${SWATCH_GRID}" data-frontprinttint-group>
                        ${__TEXT_COLORS.map((color) => `
                          <div
                            data-frontprinttint
                            onclick="window.setHoodieFrontPrintTint('${color}', this)"
                            style="background-color:${color}"
                            class="aspect-square rounded-md border border-white/10 cursor-pointer hover:scale-105 transition ${color === frontPrintTint ? 'ring-2 ring-purple-500' : ''}"
                            title="${color}"
                          ></div>
                        `).join('')}
                      </div>
                    </div>

                    <div id="panel-front-emb-colour" class="${isPrint ? 'hidden' : ''}">
                      <div class="${SWATCH_GRID}" data-textcolor-group>
                        ${__TEXT_COLORS.map((color) => `
                          <div
                            data-swatch
                            onclick="window.setHoodieTextColorFor('front','${color}', this)"
                            style="background-color:${color}"
                            class="aspect-square rounded-md border border-white/10 cursor-pointer hover:scale-105 transition ${color === frontTextColor ? 'ring-2 ring-purple-500' : ''}"
                            title="${color}"
                          ></div>
                        `).join('')}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="${HR}"></div>

                <!-- BACK OPTIONS -->
                <div class="grid grid-cols-1 gap-4">

                  <!-- Back: Print top text OR Emb preset + colour (stacked, scroll-safe) -->
                  <div class="${SECTION} overflow-hidden">
                    <div class="${SECTION_HEAD}">
                      <div class="min-w-0">
                        <div class="${TITLE}">${isPrint ? 'Back Top Text' : 'Back Embroidery'}</div>
                        <div class="${SUB}">Optional</div>
                      </div>
                      <div class="text-[9px] font-black uppercase tracking-widest text-zinc-700">
                        <span id="${isPrint ? 'ui-back-top-colour-label' : 'hoodie-emb-back-label'}">${
                          isPrint
                            ? backTopTextColor
                            : (s.embBackText ? s.embBackText.replaceAll('/n', ' / ').replaceAll('\n', ' / ') : 'None')
                        }</span>
                      </div>
                    </div>

                    <div class="${SECTION_BODY}">
                      <!-- PRINT -->
                      <div id="panel-print" class="${isPrint ? '' : 'hidden'} space-y-4">
                        <input
                          id="hoodie-back-top-input"
                          type="text"
                          placeholder="ENTER BACK TOP TEXT..."
                          oninput="window.setHoodieBackTopText(this.value)"
                          class="${INPUT}"
                        />
                        <div data-textcolor-group class="${SWATCH_GRID}">
                          ${__TEXT_COLORS.map((color) => `
                            <div
                              data-swatch
                              onclick="window.setHoodieTextColorFor('backTop','${color}', this)"
                              style="background-color:${color}"
                              class="aspect-square rounded-md border border-white/10 cursor-pointer hover:scale-105 transition ${color === backTopTextColor ? 'ring-2 ring-purple-500' : ''}"
                              title="${color}"
                            ></div>
                          `).join('')}
                        </div>
                      </div>

                      <!-- EMB -->
                      <div id="panel-embroidered" class="${isPrint ? 'hidden' : ''} space-y-4">
                        <div class="grid grid-cols-1 gap-3">
                          <!-- Presets in a bounded scroll box -->
                          <div class="border border-zinc-800 rounded-2xl bg-black/25 p-3 max-h-52 overflow-y-auto">
                            <div id="emb-back-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
                          </div>

                          <!-- Colour swatches (bounded) -->
                          <div class="space-y-2">
                            <div class="flex items-center justify-between">
                              <div class="${SUB}">Back Embroidery Colour</div>
                              <div class="text-[9px] font-black uppercase tracking-widest text-zinc-700">
                                <span id="hoodie-emb-back-colour-label">${backEmbTextColor}</span>
                              </div>
                            </div>

                            <div class="${SWATCH_GRID}" data-textcolor-group>
                              ${__TEXT_COLORS.map((color) => `
                                <div
                                  data-swatch
                                  onclick="window.setHoodieTextColorFor('backEmb','${color}', this)"
                                  style="background-color:${color}"
                                  class="aspect-square rounded-md border border-white/10 cursor-pointer hover:scale-105 transition ${color === backEmbTextColor ? 'ring-2 ring-purple-500' : ''}"
                                  title="${color}"
                                ></div>
                              `).join('')}
                            </div>
                          </div>

                          <div class="flex items-center justify-end">
                            <button onclick="window.clearHoodieEmbroideredBack()" class="${ACTION}">Clear</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Back image (Print only) -->
                  <div class="${SECTION} overflow-hidden">
                    <div class="${SECTION_HEAD}">
                      <div class="min-w-0">
                        <div class="${TITLE}">Back Image</div>
                        <div class="${SUB}">${isPrint ? 'Optional • Print' : 'Disabled in Emb'}</div>
                      </div>

                      <div class="text-[9px] text-zinc-500 font-black uppercase tracking-widest">
                        ${isPrint
                          ? `Active: <span id="hoodie-back-image-label" class="text-zinc-300">${s.backImageLabel || 'None'}</span>`
                          : `<span class="text-zinc-700">N/A</span>`
                        }
                      </div>
                    </div>

                    <div class="${SECTION_BODY}">
                      <div id="panel-back-print" class="${isPrint ? '' : 'hidden'} space-y-4">
                        <div class="grid grid-cols-3 gap-3">
                          ${backPrintPresetFiles.map((f) => `
                            <button
                              onclick="window.setHoodieBackPrintPreset('${f}', this)"
                              class="${BTN_PRESET}"
                              title="${f}"
                            >
                              <img
                                src="${'./images/hoodie/presets/print/' + f}"
                                onerror="this.onerror=null; this.src='${'./images/hoodies/presets/print/' + f}'"
                                class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition"
                              />
                            </button>
                          `).join('')}
                        </div>

                        <div id="image-upload-zone"
                          onclick="document.getElementById('artwork-upload-input') && document.getElementById('artwork-upload-input').click()"
                          class="aspect-video bg-black/50 border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center hover:border-purple-500 cursor-pointer overflow-hidden transition"
                        >
                          <input type="file" id="artwork-upload-input" class="hidden" accept="image/*"
                            onchange="window.handleImageUpload(this); window.setHoodieBackImageFromUpload();">
                          <div id="image-preview-container" class="w-full h-full flex items-center justify-center">
                            <div class="text-center px-4">
                              <span class="text-zinc-600 text-[9px] uppercase font-bold tracking-widest">Click to Upload Artwork</span>
                            </div>
                          </div>
                        </div>

                        <div class="flex items-center justify-end">
                          <button onclick="window.clearHoodieBackImage()" class="${ACTION}">Clear image</button>
                        </div>
                      </div>

                      <div class="${isPrint ? 'hidden' : ''} text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                        Back images are only available in PRINT mode.
                      </div>
                    </div>
                  </div>

                </div>

                <div class="${HR}"></div>

                <!-- COLOUR + SIZE/SPEC -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="${SECTION} overflow-hidden">
                    <div class="${SECTION_HEAD}">
                      <div>
                        <div class="${TITLE}">Hoodie Colour</div>
                        <div class="${SUB}">Body</div>
                      </div>
                    </div>
                    <div class="${SECTION_BODY}">
                      <div class="${SWATCH_GRID}">
                        ${BODY_COLORS.map((color) => `
                          <div
                            onclick="window.setHoodieBodyColor('${color}', this)"
                            data-color="${color}"
                            style="background-color:${color}"
                            class="aspect-square rounded-md border border-white/10 cursor-pointer hover:scale-105 transition ${color === bodyColor ? 'active-hoodie-color ring-2 ring-purple-500' : ''}"
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
                          ${['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map(sz => `
                            <button
                              onclick="window.updateSelection(this, 'active-size')"
                              class="${SIZE_BTN} ${sz === (s.size || 'L') ? 'active-size ring-2 ring-purple-500 bg-zinc-100 text-black' : ''}"
                            >
                              ${sz}
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
                          80% Cotton • 20% Poly • Kangaroo Pouch • Double Lined Hood
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div><!-- /space-y-4 -->
            </div>
          </div>

          <button
            onclick="window.saveHoodieConfig()"
            class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95">
            Add to Cart
          </button>

        </div>
      </div>
    </div>

    <script>
      (function(){
        try{
          if (window.enable3DViewer) {
            setTimeout(function(){
              try { window.hoodiesShow3D && window.hoodiesShow3D(); } catch(e) {}
            }, 0);
          }
        } catch(e) {}
      })();
    </script>
  `;
}

// ---------- HARD FAIL VALIDATION (shared) ----------
window.__hardFail = (msg, field = '') => ({ ok: false, msg, field });
window.__ok = () => ({ ok: true });

window.__len = (v) => String(v ?? '').trim().length;

// optional: consistent trim
window.__trim = (v) => String(v ?? '').trim();


window.HOODIE_EMB_BACK_PRESETS = window.HOODIE_EMB_BACK_PRESETS || [
  'EAT\nSLEEP\nRIDE\nREPEAT',
  'EAT\nSLEEP\nDRIVE\nREPEAT',
];

window.HOODIE_STATE = window.HOODIE_STATE || {
  mode: 'print',
  frontTextPreset: 'UnknownRiderz',
  frontPrintFile: null,
  frontPrintRawDataURL: null,   // NEW
  frontPrintDataURL: null,
  frontPrintTint: '#FFFFFF',    // NEW
  frontLabel: 'None',
  bodyColor: '#000000',
  frontTextColor: '#FFFFFF',
  backTopTextColor: '#FFFFFF',
  backEmbTextColor: '#FFFFFF',
  backTopText: '',
  backImage: null,
  backImageLabel: 'None',
  embBackText: null
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
  if (!String(src).startsWith('data:image')) dataUrl = await window.fetchAsDataURL(src);

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

      d[i] = Math.round(r * (1 - t) + rr * t);
      d[i + 1] = Math.round(g * (1 - t) + gg * t);
      d[i + 2] = Math.round(b * (1 - t) + bb * t);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return c.toDataURL('image/png');
});

window.setHoodieFrontPrintTint = async (hex, btn) => {
  // UI ring
  const group = btn?.closest?.('[data-frontprinttint-group]');
  if (group) group.querySelectorAll('[data-frontprinttint]').forEach(el => el.classList.remove('ring-2', 'ring-purple-500'));
  btn?.classList.add('ring-2', 'ring-purple-500');

  window.HOODIE_STATE.frontPrintTint = hex;

  const lbl = document.getElementById('hoodie-front-tint-label');
  if (lbl) lbl.textContent = hex;

  // re-tint from RAW (prevents compounding)
  const raw = window.HOODIE_STATE.frontPrintRawDataURL || window.HOODIE_STATE.frontPrintDataURL;
  if (raw) {
    const tinted = await window.tintNearWhiteOnlyToDataURL({
      src: raw,
      color: hex,
      threshold: 240,
      feather: 25,
      onlyBelow: 0.55
    });

    window.HOODIE_STATE.frontPrintDataURL = tinted || raw;
    window.applyHoodieTo3D?.();
  }
};

window.HOODIE_3D = window.HOODIE_3D || {
  bodyMaterialName: 'hoodie-colour',
  frontMaterialName: 'hoodie-front-pocket',
  backImageMaterialName: 'hoodie-back-image',
  backTopTextMaterialName: 'hoodie-back-text-top',
  backEmbTextMaterialName: 'hoodie-back-text-full'
};

window.HOODIE_PRINT_PRESETS_BASE = window.HOODIE_PRINT_PRESETS_BASE || './images/hoodie/presets/print/';
window.HOODIE_FRONT_PRINT_PRESETS_BASE = window.HOODIE_FRONT_PRINT_PRESETS_BASE || './images/hoodie/presets/front/';

window.__HOODIE_IMAGE_CACHE = window.__HOODIE_IMAGE_CACHE || new Map();

window.fetchAsDataURL = async (url) => {
  const key = String(url || '');
  if (!key) return null;

  if (window.__HOODIE_IMAGE_CACHE.has(key)) return window.__HOODIE_IMAGE_CACHE.get(key);

  const p = (async () => {
    const res = await fetch(key, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`[HOODIES] Failed to fetch: ${key}`);
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.readAsDataURL(blob);
    });
  })();

  window.__HOODIE_IMAGE_CACHE.set(key, p);
  return p;
};

window.__normalizeLines = (text) => {
  const raw = String(text ?? '');
  const t = raw.replaceAll('/n', '\n');
  return t.split('\n').map(s => s.trim()).filter(Boolean);
};

window.makeMultilineTextTextureDataURL = ({ text, color = '#ffffff', fontFamily = 'Inter, Arial', weight = 900, size = 1024, maxWidth = 0.86, maxHeight = 0.80, lineGap = 1.10 }) => {
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
};

window.makeContainedImageTextureDataURL = async ({ src, size = 1024, padding = 80 }) => {
  if (!src) return null;

  let dataUrl = src;
  if (!String(src).startsWith('data:image')) dataUrl = await window.fetchAsDataURL(src);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = dataUrl;

  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = rej;
  });

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
};

window.__emptyTexture = window.__emptyTexture || (() => {
  const c = document.createElement('canvas');
  c.width = 8;
  c.height = 8;
  return c.toDataURL('image/png');
})();

window.applyHoodieTo3D = async () => {
  const mv = window.getActiveModelViewer?.();
  if (!mv || !mv.model) return;

  try {
    window.setMaterialBaseColor?.(mv, window.HOODIE_3D.bodyMaterialName, window.HOODIE_STATE.bodyColor);
  } catch (_) { }

  if (window.HOODIE_STATE.mode === 'print') {
    try {
      if (window.HOODIE_STATE.frontPrintDataURL) {
        const frontPng = await window.makeContainedImageTextureDataURL({
          src: window.HOODIE_STATE.frontPrintDataURL,
          size: 1024,
          padding: 110
        });
        if (frontPng) await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.frontMaterialName, frontPng);
      } else {
        await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.frontMaterialName, window.__emptyTexture);
      }
    } catch (e) {
      console.warn('[HOODIES] Front print apply failed:', e);
    }
  } else {
    try {
      const frontText = String(window.HOODIE_STATE.frontTextPreset || 'UnknownRiderz');
      const frontPng = window.makeMultilineTextTextureDataURL({
        text: frontText,
        color: window.HOODIE_STATE.frontTextColor,
        size: 1024,
        maxWidth: 0.86,
        maxHeight: 0.60,
        lineGap: 1.05
      });
      await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.frontMaterialName, frontPng);
    } catch (e) {
      console.warn('[HOODIES] Front embroidered apply failed:', e);
    }
  }

  if (window.HOODIE_STATE.mode === 'print') {
    try {
      const t = String(window.HOODIE_STATE.backTopText || '').trim();
      if (t) {
        const topPng = window.makeMultilineTextTextureDataURL({
          text: t,
          color: window.HOODIE_STATE.backTopTextColor,
          size: 1024,
          maxWidth: 0.92,
          maxHeight: 0.45,
          lineGap: 1.05
        });
        await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.backTopTextMaterialName, topPng);
      } else {
        await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.backTopTextMaterialName, window.__emptyTexture);
      }
    } catch (e) {
      console.warn('[HOODIES] Back top text apply failed:', e);
    }

    try {
      if (window.HOODIE_STATE.backImage) {
        const imgPng = await window.makeContainedImageTextureDataURL({
          src: window.HOODIE_STATE.backImage,
          color: window.HOODIE_STATE.backEmbTextColor,
          size: 1024,
          padding: 90
        });
        if (imgPng) await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.backImageMaterialName, imgPng);
      } else {
        await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.backImageMaterialName, window.__emptyTexture);
      }
    } catch (e) {
      console.warn('[HOODIES] Back image apply failed:', e);
    }

    try {
      await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.backEmbTextMaterialName, window.__emptyTexture);
    } catch (_) { }
  } else {
    try {
      const t = String(window.HOODIE_STATE.embBackText || '').trim();
      if (t) {
        const embPng = window.makeMultilineTextTextureDataURL({
          text: t,
          color: window.HOODIE_STATE.backEmbTextColor,
          size: 1024,
          maxWidth: 0.88,
          maxHeight: 0.80,
          lineGap: 1.12
        });
        await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.backEmbTextMaterialName, embPng);
      } else {
        await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.backEmbTextMaterialName, window.__emptyTexture);
      }
    } catch (e) {
      console.warn('[HOODIES] Emb back apply failed:', e);
    }

    try {
      await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.backTopTextMaterialName, window.__emptyTexture);
      await window.applyBaseColorTextureURI?.(mv, window.HOODIE_3D.backImageMaterialName, window.__emptyTexture);
    } catch (_) { }
  }
};

window.__hoodiesShowPreview = (mode) => {
  const d2 = document.getElementById('hoodies-preview-2d');
  const d3 = document.getElementById('hoodies-preview-3d');
  const is3 = mode === '3d';

  if (d2) d2.classList.toggle('hidden', is3);
  if (d3) d3.classList.toggle('hidden', !is3);
};

window.hoodiesShow3D = () => {
  try { window.__hoodiesShowPreview?.('3d'); } catch (_) { }
  try { window.enable3DViewer?.('hoodies', 'default'); } catch (_) { }
};

window.hoodiesShowStudio = () => {
  try { window.__hoodiesShowPreview?.('2d'); } catch (_) { }
  try { window.disable3DViewer?.(); } catch (_) { }
  try { window.__syncHoodieFront2D?.(); window.__updateHoodieBackPreview?.(); } catch (_) { }
};

window.setHoodieMode = (mode) => {
  window.HOODIE_STATE.mode = (mode === 'embroidered') ? 'embroidered' : 'print';

  const tabPrint = document.getElementById('tab-print');
  const tabEmb = document.getElementById('tab-emb');
  const isPrint = window.HOODIE_STATE.mode === 'print';

  const activeTab = 'px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-white text-black transition';
  const idleTab = 'px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white transition';

  if (tabPrint) tabPrint.className = isPrint ? activeTab : idleTab;
  if (tabEmb) tabEmb.className = isPrint ? idleTab : activeTab;

  const pPrint = document.getElementById('panel-print');
  const pEmb = document.getElementById('panel-embroidered');
  if (pPrint) pPrint.classList.toggle('hidden', !isPrint);
  if (pEmb) pEmb.classList.toggle('hidden', isPrint);

  const frontPrint = document.getElementById('panel-front-print');
  const frontEmb = document.getElementById('panel-front-embroidered');
  if (frontPrint) frontPrint.classList.toggle('hidden', !isPrint);
  if (frontEmb) frontEmb.classList.toggle('hidden', isPrint);

  const lblFront = document.getElementById('ui-front-mode-label');
  const lblBack = document.getElementById('ui-back-mode-label');
  if (lblFront) lblFront.textContent = isPrint ? 'PRINT' : 'EMB';
  if (lblBack) lblBack.textContent = isPrint ? 'PRINT' : 'EMB';

    // Toggle FRONT colour card internals (print tint vs emb colour)
  const frontTintPanel = document.getElementById('panel-front-tint');
  const frontEmbColorPanel = document.getElementById('panel-front-emb-colour');
  if (frontTintPanel) frontTintPanel.classList.toggle('hidden', !isPrint);
  if (frontEmbColorPanel) frontEmbColorPanel.classList.toggle('hidden', isPrint);

  const tintLbl = document.getElementById('hoodie-front-tint-label');
  const embLbl = document.getElementById('hoodie-front-emb-colour-label');
  if (tintLbl) tintLbl.classList.toggle('hidden', !isPrint);
  if (embLbl) embLbl.classList.toggle('hidden', isPrint);

  const tTitle = document.getElementById('ui-front-colour-title');
  const tSub = document.getElementById('ui-front-colour-sub');
  if (tTitle) tTitle.textContent = isPrint ? 'Logo Tint' : 'Front Embroidery Colour';
  if (tSub) tSub.textContent = isPrint ? 'Text only' : 'Thread';
  
  window.__syncHoodieFront2D?.();
  window.__updateHoodieBackPreview?.();

  window.applyHoodieTo3D?.();
};

window.setHoodieFrontTextPreset = (preset, btn) => {
  window.HOODIE_STATE.frontTextPreset = preset;

  const wrap = btn?.parentElement;
  if (wrap) [...wrap.querySelectorAll('button')].forEach(b => b.classList.remove('active-front'));
  btn?.classList.add('active-front');

  window.__syncHoodieFront2D?.();
  window.applyHoodieTo3D?.();
};

window.setHoodieFrontPrintPreset = async (fileName, btn) => {
  try {
    const grid = btn?.parentElement;
    if (grid) [...grid.querySelectorAll('button')].forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));
    btn?.classList.add('ring-2', 'ring-purple-500');

    let url = `${window.HOODIE_FRONT_PRINT_PRESETS_BASE}${fileName}`;
    let dataUrl = null;

    try { dataUrl = await window.fetchAsDataURL(url); }
    catch (_) {
      url = `./images/hoodies/presets/front/${fileName}`;
      dataUrl = await window.fetchAsDataURL(url);
    }

    window.HOODIE_STATE.frontPrintFile = fileName;
    window.HOODIE_STATE.frontPrintRawDataURL = dataUrl; // NEW (raw)
    window.HOODIE_STATE.frontLabel = fileName;

    // apply tint to near-white text under logo
    const tint = window.HOODIE_STATE.frontPrintTint || '#FFFFFF';
    const tinted = await window.tintNearWhiteOnlyToDataURL({
      src: dataUrl,
      color: tint,
      threshold: 240,
      feather: 25,
      onlyBelow: 0.55
    });

    window.HOODIE_STATE.frontPrintDataURL = tinted || dataUrl;

    const label = document.getElementById('hoodie-front-label');
    if (label) label.textContent = fileName;

    const tintLbl = document.getElementById('hoodie-front-tint-label');
    if (tintLbl) tintLbl.textContent = tint;

    window.__syncHoodieFront2D?.();
    window.applyHoodieTo3D?.();
  } catch (e) {
    console.warn('[HOODIES] Front preset load failed:', e);
  }
};

window.clearHoodieFrontPrintPreset = () => {
  window.HOODIE_STATE.frontPrintFile = null;
  window.HOODIE_STATE.frontPrintRawDataURL = null; // NEW
  window.HOODIE_STATE.frontPrintDataURL = null;
  window.HOODIE_STATE.frontLabel = 'None';

  const label = document.getElementById('hoodie-front-label');
  if (label) label.textContent = 'None';

  document.querySelectorAll('#panel-front-print button.ring-2').forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));

  window.__syncHoodieFront2D?.();
  window.applyHoodieTo3D?.();
};

window.setHoodieBodyColor = (hex, btn) => {
  document.querySelectorAll('.active-hoodie-color').forEach(el => el.classList.remove('active-hoodie-color'));
  btn?.classList.add('active-hoodie-color');

  window.HOODIE_STATE.bodyColor = hex;
  window.applyHoodieTo3D?.();
};

window.setHoodieTextColorFor = (target, hex, btn) => {
  const t = String(target || '').trim();

  // Ring only inside the current swatch group
  const group = btn?.closest?.('[data-textcolor-group]');
  if (group) group.querySelectorAll('[data-swatch]').forEach(el => el.classList.remove('ring-2', 'ring-purple-500'));
  btn?.classList.add('ring-2', 'ring-purple-500');

  if (t === 'front') {
    window.HOODIE_STATE.frontTextColor = hex;

    // ✅ Update the label in the front colour card (Emb mode)
    const lbl = document.getElementById('hoodie-front-colour-label');
    if (lbl) lbl.textContent = hex;
  }
  else if (t === 'backTop') {
    window.HOODIE_STATE.backTopTextColor = hex;

    // ✅ If you have a back-top label, update it too (optional)
    const lbl = document.getElementById('ui-back-top-colour-label');
    if (lbl) lbl.textContent = hex;
  }
  else if (t === 'backEmb') {
    window.HOODIE_STATE.backEmbTextColor = hex;

    // ✅ If you have a back-emb label, update it too (optional)
    const lbl = document.getElementById('hoodie-front-emb-colour-label');
    if (lbl) lbl.textContent = hex;
    
  }
  else if (t === 'backEmb') {
    window.HOODIE_STATE.backEmbTextColor = hex;

    const lbl = document.getElementById('hoodie-emb-back-colour-label');
    if (lbl) lbl.textContent = hex;
  }

  window.__syncHoodieFront2D?.();
  window.applyHoodieTo3D?.();
};

window.setHoodieBackTopText = (value) => {
  window.HOODIE_STATE.backTopText = String(value || '');
  window.__updateHoodieBackPreview?.();
  window.applyHoodieTo3D?.();
};

window.setHoodieBackPrintPreset = async (fileName, btn) => {
  try {
    const grid = btn?.parentElement;
    if (grid) [...grid.querySelectorAll('button')].forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));
    btn?.classList.add('ring-2', 'ring-purple-500');

    let url = `${window.HOODIE_PRINT_PRESETS_BASE}${fileName}`;
    let dataUrl = null;

    try { dataUrl = await window.fetchAsDataURL(url); }
    catch (_) {
      url = `./images/hoodies/presets/print/${fileName}`;
      dataUrl = await window.fetchAsDataURL(url);
    }

    window.HOODIE_STATE.backImage = dataUrl;
    window.HOODIE_STATE.backImageLabel = fileName;

    const label = document.getElementById('hoodie-back-image-label');
    if (label) label.textContent = fileName;

    window.__updateHoodieBackPreview?.();
    window.applyHoodieTo3D?.();
  } catch (e) {
    console.warn('[HOODIES] Back preset load failed:', e);
  }
};

window.setHoodieBackImageFromUpload = () => {
  const src = document.querySelector('#image-preview-container img')?.src || null;
  if (!src) return;

  window.HOODIE_STATE.backImage = src;
  window.HOODIE_STATE.backImageLabel = 'Upload';

  const label = document.getElementById('hoodie-back-image-label');
  if (label) label.textContent = 'Upload';

  document.querySelectorAll('#panel-print button.ring-2').forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));

  window.__updateHoodieBackPreview?.();
  window.applyHoodieTo3D?.();
};

window.clearHoodieBackImage = () => {
  window.HOODIE_STATE.backImage = null;
  window.HOODIE_STATE.backImageLabel = 'None';

  const label = document.getElementById('hoodie-back-image-label');
  if (label) label.textContent = 'None';

  const container = document.getElementById('image-preview-container');
  if (container) {
    container.innerHTML = `
      <div class="text-center px-4">
        <span class="text-zinc-600 text-[9px] uppercase font-bold tracking-widest">Click to Upload Artwork</span>
      </div>
    `;
  }
  const input = document.getElementById('artwork-upload-input');
  if (input) input.value = '';

  document.querySelectorAll('#panel-print button.ring-2').forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));

  window.__updateHoodieBackPreview?.();
  window.applyHoodieTo3D?.();
};

window.setHoodieEmbroideredBackPreset = (text, btn) => {
  window.HOODIE_STATE.embBackText = text;

  const grid = btn?.parentElement;
  if (grid) [...grid.querySelectorAll('button')].forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));
  btn?.classList.add('ring-2', 'ring-purple-500');

  const label = document.getElementById('hoodie-emb-back-label');
  if (label) label.textContent = text.replaceAll('/n', ' / ').replaceAll('\n', ' / ');

  window.__updateHoodieBackPreview?.();
  window.applyHoodieTo3D?.();
};

window.setHoodieEmbroideredBackPresetByIndex = (idx, btn) => {
  const list = window.HOODIE_EMB_BACK_PRESETS || [];
  const i = Number(idx);
  const raw = (Number.isFinite(i) && i >= 0 && i < list.length) ? list[i] : '';
  const text = String(raw || '').replaceAll('/n', '\n');
  window.setHoodieEmbroideredBackPreset(text, btn);
};

window.clearHoodieEmbroideredBack = () => {
  window.HOODIE_STATE.embBackText = null;

  const label = document.getElementById('hoodie-emb-back-label');
  if (label) label.textContent = 'None';

  document.querySelectorAll('#panel-embroidered button.ring-2').forEach(b => b.classList.remove('ring-2', 'ring-purple-500'));

  window.__updateHoodieBackPreview?.();
  window.applyHoodieTo3D?.();
};

window.__syncHoodieFront2D = () => {
  const textWrap = document.getElementById('preview-front-text-wrap');
  const imgWrap = document.getElementById('preview-front-img-wrap');
  const textEl = document.getElementById('preview-front-text');
  const imgEl = document.getElementById('preview-front-img');

  if (window.HOODIE_STATE.mode === 'print') {
    if (textWrap) textWrap.classList.add('hidden');
    if (imgWrap) imgWrap.classList.remove('hidden');

    if (imgEl) {
      if (window.HOODIE_STATE.frontPrintDataURL) imgEl.src = window.HOODIE_STATE.frontPrintDataURL;
      else if (window.HOODIE_STATE.frontPrintFile) imgEl.src = `${window.HOODIE_FRONT_PRINT_PRESETS_BASE}${window.HOODIE_STATE.frontPrintFile}`;
      else imgEl.removeAttribute('src');
    }
  } else {
    if (imgWrap) imgWrap.classList.add('hidden');
    if (textWrap) textWrap.classList.remove('hidden');

    if (textEl) {
      textEl.textContent = String(window.HOODIE_STATE.frontTextPreset || 'UnknownRiderz').toUpperCase();
      textEl.style.color = window.HOODIE_STATE.frontTextColor || '#FFFFFF';
    }
  }
};

window.__updateHoodieBackPreview = () => {
  const el = document.getElementById('preview-back-line');
  if (!el) return;

  if (window.HOODIE_STATE.mode === 'print') {
    const parts = [];
    if (String(window.HOODIE_STATE.backTopText || '').trim()) parts.push(`TEXT: ${window.HOODIE_STATE.backTopText}`);
    if (window.HOODIE_STATE.backImageLabel && window.HOODIE_STATE.backImageLabel !== 'None') parts.push(`IMAGE: ${window.HOODIE_STATE.backImageLabel}`);
    el.textContent = parts.length ? parts.join(' • ') : 'None';
  } else {
    el.textContent = window.HOODIE_STATE.embBackText
      ? `EMB: ${window.HOODIE_STATE.embBackText.replaceAll('/n', ' / ').replaceAll('\n', ' / ')}`
      : 'None';
  }
};

window.__mountEmbBackGrid = () => {
  const grid = document.getElementById('emb-back-grid');
  if (!grid) return;

  grid.innerHTML = (window.HOODIE_EMB_BACK_PRESETS || []).map((t, i) => {
    const label = String(t)
      .replaceAll('/n', '\n')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .join(' / ');

    return `
      <button
        onclick="window.setHoodieEmbroideredBackPresetByIndex(${i}, this)"
        class="px-4 py-4 rounded-2xl border border-zinc-800 bg-black hover:border-purple-500 transition text-left"
      >
        <div class="text-[10px] font-black uppercase tracking-widest text-white">${label}</div>
        <div class="text-[9px] text-zinc-600 font-bold uppercase tracking-wider mt-1">Back full embroidery</div>
      </button>
    `;
  }).join('');
};

window.saveHoodieConfig = () => {
  if (window.HOODIE_STATE.mode === 'print') {
    if (!window.HOODIE_STATE.frontPrintDataURL) {
      alert('Front logo (print preset) is required for PRINT builds.');
      return;
    }
  } else {
    const front = String(window.HOODIE_STATE.frontTextPreset || '').trim();
    if (!front) {
      alert('Front logo text is required for EMBROIDERED builds.');
      return;
    }
  }
  const v = window.validateHoodieConfig?.();
  if (v && !v.ok) {
    alert(v.msg);
    return;
  }
  const size = document.querySelector('.active-size')?.innerText || 'L';
  const color = window.HOODIE_STATE.bodyColor || document.querySelector('.active-hoodie-color')?.dataset?.color || '#000000';

  const config = {
    mode: window.HOODIE_STATE.mode,
    bodyColor: color,
    size,
    specs: window.HOODIE_STATE.mode === 'print' ? 'Hoodie / Print' : 'Hoodie / Embroidered'
  };

  if (window.HOODIE_STATE.mode === 'print') {
    config.frontPresetFile = window.HOODIE_STATE.frontPrintFile;
    config.frontPreset = window.HOODIE_STATE.frontLabel || window.HOODIE_STATE.frontPrintFile || 'Front Preset';
    config.frontImage = window.HOODIE_STATE.frontPrintDataURL;

    config.backTopText = window.HOODIE_STATE.backTopText || '';
    config.backTopTextColor = window.HOODIE_STATE.backTopTextColor || '#FFFFFF';
    config.backImage = window.HOODIE_STATE.backImage || null;
    config.backImageLabel = window.HOODIE_STATE.backImageLabel || 'None';
  } else {
    config.frontTextPreset = window.HOODIE_STATE.frontTextPreset;
    config.frontTextColor = window.HOODIE_STATE.frontTextColor || '#FFFFFF';
    config.backEmbText = window.HOODIE_STATE.embBackText || null;
    config.backEmbTextColor = window.HOODIE_STATE.backEmbTextColor || '#FFFFFF';
  }

  const previewLabel =
    window.HOODIE_STATE.mode === 'print'
      ? `PRINT • FRONT ${window.HOODIE_STATE.frontLabel || 'Preset'}`
      : `EMB • FRONT ${window.HOODIE_STATE.frontTextPreset || 'Text'}`;

  window.saveDesignToQueue(
    { slug: 'hoodies', label: 'Hoodie' },
    config,
    { text: previewLabel }
  );
};

window.on3DModelReady = (slug, mv) => {
  if (slug !== 'hoodies') return;

  window.__mountEmbBackGrid?.();
  window.setHoodieMode?.(window.HOODIE_STATE.mode);
  window.__hoodiesShowPreview?.('3d');
  window.__syncHoodieFront2D?.();
  window.__updateHoodieBackPreview?.();

  if (window.HOODIE_STATE.mode === 'print' && !window.HOODIE_STATE.frontPrintDataURL) {
    const firstBtn = document.querySelector('#panel-front-print button');
    if (firstBtn) {
      const title = firstBtn.getAttribute('title') || null;
      if (title) window.setHoodieFrontPrintPreset(title, firstBtn);
    }
  }

  window.applyHoodieTo3D?.();
};

window.validateHoodieConfig = () => {
  const s = window.HOODIE_STATE || {};
  const mode = (s.mode === 'embroidered') ? 'embroidered' : 'print';

  // Required: body colour + size (size comes from UI but validate anyway)
  if (!window.__trim(s.bodyColor)) return window.__hardFail('Please choose a hoodie colour.', 'bodyColor');

  // Required: front selection depends on mode
  if (mode === 'print') {
    // Must have a front preset selected
    if (!window.__trim(s.frontPrintFile) && !window.__trim(s.frontLabel) && !s.frontPrintDataURL) {
      return window.__hardFail('Front logo is required for PRINT hoodies.', 'frontPrintFile');
    }
  } else {
    // Must have a front embroidery text preset
    if (!window.__trim(s.frontTextPreset)) {
      return window.__hardFail('Front logo text is required for EMBROIDERED hoodies.', 'frontTextPreset');
    }
  }

  // Print mode rules
  if (mode === 'print') {
    // Back top text limits (optional)
    if (window.__len(s.backTopText) > 28) {
      return window.__hardFail('Back top text is too long (max 28 characters).', 'backTopText');
    }

    // If back image exists, it must look like an image dataURL
    if (s.backImage && !String(s.backImage).startsWith('data:image')) {
      return window.__hardFail('Back image must be a valid uploaded image.', 'backImage');
    }
  }

  // Embroidered mode rules
  if (mode === 'embroidered') {
    // Back emb text is optional BUT if present validate length/lines
    const emb = window.__trim(s.embBackText);
    if (emb) {
      const lines = emb.replaceAll('/n', '\n').split('\n').map(l => l.trim()).filter(Boolean);

      if (lines.length > 4) {
        return window.__hardFail('Back embroidery supports up to 4 lines.', 'embBackText');
      }
      if (emb.length > 44) {
        return window.__hardFail('Back embroidery text is too long (max 44 characters).', 'embBackText');
      }
    }
  }

  return window.__ok();
};