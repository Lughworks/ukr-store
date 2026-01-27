export function render() {
    const __unit = (window?.computeUnitPriceFromTable?.({ product: { slug: 'balaclavas' }, config: {} }) ?? 0);
    const __price = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(__unit);
    
    setTimeout(() => {
        if (typeof window.enable3DViewer === 'function') {
            window.enable3DViewer('balaclavas', 'default');
        }
    }, 50);

    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Apparel / Empire</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Neck Balaclavas</h1>
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
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-4 text-purple-500 italic">Step 1: Identity Selection</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${[
                                { short: 'UR?', full: 'UnknownRiderz' },
                                { short: 'UD?', full: 'UnknownDriverz' }
                            ].map(brand => `<button onclick="window.updateBalaclavaLogo('${brand.short}', this, 75)" class="p-4 bg-zinc-800 border border-zinc-700 rounded-2xl font-black italic text-xl hover:bg-zinc-700 transition">${brand.short}</button><button onclick="window.updateBalaclavaLogo('${brand.full}', this, 32)" class="p-4 bg-zinc-800 border border-zinc-700 rounded-2xl font-black italic text-[10px] tracking-widest hover:bg-zinc-700 transition">${brand.full}</button>`).join('')}
                        </div>
                    </div>
                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-4 text-zinc-400">Step 2: Product Color</h3>
                        <div class="grid grid-cols-7 gap-2">
                            ${['#FFFFFF', '#FF0000', '#9333EA', '#22C55E', '#3B82F6', '#EAB308', '#FF6B00', '#555555'].map(color => `
                                <div onclick="window.applyLogoColor('${color}', this)" style="background-color: ${color}" class="aspect-square rounded-md border-2 border-transparent cursor-pointer hover:scale-110 transition"></div>
                            `).join('')}
                        </div>
                    </div>
                    <button onclick="window.saveBalaclavaConfig()" class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.BALACLAVA_STATE = {
    text: 'UR?',
    bodyColor: '#000000'
};

window.updateBalaclavaLogo = (text, btn, size) => {
    window.updateSelection(btn, 'active-preset');

    const logo = document.getElementById('svg-logo-target');
    if (logo) {
        logo.textContent = text;
        logo.style.fontSize = size + 'px';
        logo.style.fill = '#FFFFFF';
    }

    window.BALACLAVA_STATE.text = text;

    window.applyBalaclavaTo3D?.();
};

window.applyLogoColor = (color, btn) => {
    btn.parentElement.querySelectorAll('div').forEach(el => el.style.borderColor = 'transparent');
    btn.style.borderColor = '#9333ea';

    window.BALACLAVA_STATE.bodyColor = color;
    window.applyBalaclavaTo3D?.();
};
window.saveBalaclavaConfig = () => {
    const logo = document.getElementById('svg-logo-target');

    window.saveDesignToQueue({ slug: 'balaclavas', label: 'Balaclava' }, {
        logo: logo.textContent,
        textColor: logo.style.fill || '#FFFFFF',
        fontSize: logo.style.fontSize,
        specs: "Neck Gaiter / Vinyl Print"
    }, { text: (logo.textContent || 'Balaclava') });
};

window.BALACLAVA_3D = {
    bodyMaterialName: 'balaclava-colour',
    textMaterialName: 'balaclava-text',
};

window.applyBalaclavaTo3D = async () => {
    const mv = window.getActiveModelViewer?.();
    if (!mv) return;

    if (!mv.model) return;

    window.setMaterialBaseColor?.(mv, window.BALACLAVA_3D.bodyMaterialName, window.BALACLAVA_STATE.bodyColor);

    const png = window.makeTextTextureDataURL({
        text: window.BALACLAVA_STATE.text,
        color: '#FFFFFF',
        font: 'bold 180px Inter, Arial',
        size: 1024
    });

    await window.applyBaseColorTextureURI?.(mv, window.BALACLAVA_3D.textMaterialName, png);
};

window.on3DModelReady = (slug, mv) => {
    if (slug !== 'balaclavas') return;
    window.applyBalaclavaTo3D?.();
};