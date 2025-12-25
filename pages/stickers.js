export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase">Merchandise / Studio</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Custom Stickers</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                <div class="lg:col-span-7">
                    <div class="aspect-square bg-zinc-900/20 border border-zinc-800 rounded-3xl relative overflow-hidden flex items-center justify-center group">
                        <div class="absolute inset-0 blueprint-grid opacity-30"></div>
                        <div id="sticker-preview" class="relative w-64 h-64 bg-white rounded-lg shadow-2xl flex items-center justify-center overflow-hidden">
                            <span id="sticker-text-target" class="text-black font-black uppercase text-2xl tracking-tighter">UK? STUDIO</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 space-y-8">
                    
                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-6 text-purple-500 italic">Production Mode</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <button onclick="toggleStickerMode('text', this)" class="active-preset py-4 bg-black border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest transition">Custom Text</button>
                            <button onclick="toggleStickerMode('logo', this)" class="py-4 bg-black border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition">Logo Presets</button>
                        </div>
                    </div>

                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <div id="sticker-text-config">
                            <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-4 text-zinc-400">Typography</h3>
                            <input type="text" id="sticker-input" oninput="document.getElementById('sticker-text-target').innerText = this.value" placeholder="ENTER SLOGAN" class="w-full bg-black border border-zinc-800 p-4 rounded-xl text-xs font-mono outline-none focus:border-purple-500 transition mb-4">
                        </div>

                        <div id="sticker-logo-config" class="hidden">
                            <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-4 text-zinc-400">Select Pattern</h3>
                            <div class="grid grid-cols-4 gap-2">
                                ${['Camo', 'Grid', 'Acid', 'Digital'].map((pat, i) => `
                                    <div 
                                        onclick="window.updateSelection(this, 'active-color'); updateStickerPreview('${pat}')" 
                                        data-pattern="${pat}"
                                        style="background-image: url('../images/stickers/patterns/${pat.toLowerCase()}.png'); background-size: cover;"
                                        class="aspect-square rounded-md border border-zinc-700 cursor-pointer hover:scale-110 transition ${i === 0 ? 'active-color' : ''}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-6 text-zinc-400 italic">Bulk Quantity</h3>
                        <div class="grid grid-cols-4 gap-2">
                            ${['25', '50', '100', '150'].map(qty => `
                                <button onclick="window.updateSelection(this, 'active-size')" class="py-3 bg-black border border-zinc-800 rounded-xl text-[10px] font-bold hover:border-purple-500 transition ${qty === '100' ? 'active-size' : ''}">${qty}</button>
                            `).join('')}
                        </div>
                    </div>

                    <button 
                        onclick="saveStickerConfig()"
                        class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-2xl">
                        Log Production Request
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.toggleStickerMode = (mode, btn) => {
    window.updateSelection(btn, 'active-preset');
    const textConfig = document.getElementById('sticker-text-config');
    const logoConfig = document.getElementById('sticker-logo-config');
    const previewTarget = document.getElementById('sticker-preview');
    const textTarget = document.getElementById('sticker-text-target');

    if(mode === 'logo') {
        textConfig.classList.add('hidden');
        logoConfig.classList.remove('hidden');
        textTarget.classList.add('hidden');
        updateStickerPreview('Camo'); // Default
    } else {
        textConfig.classList.remove('hidden');
        logoConfig.classList.add('hidden');
        textTarget.classList.remove('hidden');
        previewTarget.style.backgroundImage = 'none';
        previewTarget.style.backgroundColor = 'white';
    }
};

window.updateStickerPreview = (pattern) => {
    const preview = document.getElementById('sticker-preview');
    preview.style.backgroundImage = `url('../images/hats/patterns/${pattern.toLowerCase()}.png')`;
    preview.style.backgroundSize = 'cover';
};

window.saveStickerConfig = () => {
    const isLogo = !document.getElementById('sticker-logo-config').classList.contains('hidden');
    const qty = document.querySelector('.active-size').innerText;
    
    const config = {
        front: isLogo ? document.querySelector('#sticker-logo-config .active-color').dataset.pattern : document.getElementById('sticker-input').value || 'UK? STUDIO',
        frontFont: isLogo ? 'Logo Preset' : 'Standard Sans',
        color: isLogo ? 'Multi-Pattern' : 'Black/White',
        size: qty + ' Units',
        specs: 'Weatherproof Vinyl Die-Cut'
    };

    saveDesignToQueue('Sticker', config);
};