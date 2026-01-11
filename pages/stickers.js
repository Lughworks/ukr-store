export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Merchandise / Division 02</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Custom Stickers</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-inherit">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                <div class="lg:col-span-7 flex items-center justify-center min-h-[400px] bg-zinc-950/50 rounded-[3rem] border border-zinc-900 relative overflow-hidden">
                    <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                    
                    <div id="sticker-diecut-container" class="relative transition-transform duration-500 hover:scale-105">
                        <svg id="sticker-svg" viewBox="0 0 600 300" width="500" height="250" style="overflow: visible;" class="filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                            <defs>
                                <pattern id="sticker-pattern-fill" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                    <image id="svg-sticker-pattern-img" href="" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
                                </pattern>
                            </defs>
                            
                            <text id="sticker-text-bg" x="50%" y="55%" text-anchor="middle" dominant-baseline="middle"
                                  class="heading-font italic font-black"
                                  style="font-size: 80px; fill: white; stroke: white; stroke-width: 3px; stroke-linejoin: round; paint-order: stroke;">
                                UE STUDIO
                            </text>

                            <text id="sticker-text-main" x="50%" y="55%" text-anchor="middle" dominant-baseline="middle"
                                  class="heading-font italic font-black"
                                  style="font-size: 80px; fill: #000000; transition: fill 0.3s ease;">
                                UE STUDIO
                            </text>
                        </svg>
                    </div>
                </div>

                <div class="lg:col-span-5 space-y-6">
                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <div class="flex flex-col gap-4 mb-6">
                            <div class="flex justify-between items-center">
                                <h3 class="text-xs font-black uppercase tracking-[0.2em] text-purple-500 italic">Typography</h3>
                                <span class="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Identity Presets</span>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-2">
                                <button onclick="window.setStickerText('UR?')" class="text-[9px] font-black px-3 py-2 bg-zinc-800 hover:bg-white hover:text-black rounded-xl transition-all border border-zinc-700">UR?</button>
                                <button onclick="window.setStickerText('UD?')" class="text-[9px] font-black px-3 py-2 bg-zinc-800 hover:bg-white hover:text-black rounded-xl transition-all border border-zinc-700">UD?</button>
                                <button onclick="window.setStickerText('UnknownRiderz')" class="text-[8px] font-black px-3 py-2 bg-zinc-800 hover:bg-white hover:text-black rounded-xl transition-all border border-zinc-700 uppercase tracking-tighter">UnknownRiderz</button>
                                <button onclick="window.setStickerText('UnknownDriverz')" class="text-[8px] font-black px-3 py-2 bg-zinc-800 hover:bg-white hover:text-black rounded-xl transition-all border border-zinc-700 uppercase tracking-tighter">UnknownDriverz</button>
                            </div>
                        </div>

                        <input type="text" id="sticker-input" 
                            oninput="window.setStickerText(this.value)" 
                            placeholder="OR ENTER CUSTOM SLOGAN" 
                            class="w-full bg-black border border-zinc-800 p-4 rounded-xl text-xs font-mono outline-none focus:border-purple-500 transition">
                    </div>

                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Appearance</h3>
                            <div class="flex gap-2">
                                <button id="btn-sticker-color" onclick="window.toggleStickerFillMode('color')" class="text-[9px] font-bold px-3 py-1 bg-white text-black rounded-full">Solid</button>
                                <button id="btn-sticker-pattern" onclick="window.toggleStickerFillMode('pattern')" class="text-[9px] font-bold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full">Pattern</button>
                            </div>
                        </div>

                        <div id="sticker-fill-colors" class="grid grid-cols-7 gap-2">
                            ${['#000000', '#FF0000', '#9333EA', '#22C55E', '#3B82F6', '#EAB308', '#FFFFFF'].map(color => `
                                <div onclick="window.applyStickerFill('color', '${color}', this)" 
                                     style="background-color: ${color}" 
                                     class="aspect-square rounded-md border-2 border-transparent cursor-pointer hover:scale-110 transition ${color === '#000000' ? 'border-purple-500' : ''}"></div>
                            `).join('')}
                        </div>

                        <div id="sticker-fill-patterns" class="hidden grid grid-cols-4 gap-2">
                            ${['Camo', 'Grid', 'Acid', 'Digital', 'Carbon', 'Leopard'].map(pat => `
                                <div onclick="window.applyStickerFill('pattern', '${pat.toLowerCase()}.png', this)" 
                                     style="background-image: url('./images/stickers/patterns/${pat.toLowerCase()}.png'); background-size: cover;"
                                     class="aspect-square rounded-md border-2 border-transparent cursor-pointer hover:scale-110 transition"></div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-4 text-zinc-400 italic">Bulk Quantity</h3>
                        <div class="grid grid-cols-4 gap-2">
                            ${['25', '50', '100', '150'].map(qty => `
                                <button onclick="window.updateSelection(this, 'active-size')" class="py-3 bg-black border border-zinc-800 rounded-xl text-[10px] font-bold hover:border-purple-500 transition ${qty === '50' ? 'active-size border-purple-500' : ''}">${qty}</button>
                            `).join('')}
                        </div>
                    </div>

                    <button onclick="window.saveStickerConfig()" class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                        Log Production Request
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.setStickerText = (val) => {
    const text = val.toUpperCase() || 'UE STUDIO';
    document.getElementById('sticker-text-bg').textContent = text;
    document.getElementById('sticker-text-main').textContent = text;
    
    const fontSize = text.length > 12 ? 40 : (text.length > 8 ? 55 : 85);
    document.getElementById('sticker-text-bg').style.fontSize = fontSize + 'px';
    document.getElementById('sticker-text-main').style.fontSize = fontSize + 'px';
};

window.toggleStickerFillMode = (mode) => {
    const isPattern = mode === 'pattern';
    document.getElementById('sticker-fill-colors').classList.toggle('hidden', isPattern);
    document.getElementById('sticker-fill-patterns').classList.toggle('hidden', !isPattern);
    
    document.getElementById('btn-sticker-color').className = !isPattern ? "text-[9px] font-bold px-3 py-1 bg-white text-black rounded-full" : "text-[9px] font-bold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full";
    document.getElementById('btn-sticker-pattern').className = isPattern ? "text-[9px] font-bold px-3 py-1 bg-white text-black rounded-full" : "text-[9px] font-bold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full";
};

window.applyStickerFill = (type, value, btn) => {
    const mainText = document.getElementById('sticker-text-main');
    const patternImg = document.getElementById('svg-sticker-pattern-img');
    
    document.querySelectorAll('#sticker-fill-colors div, #sticker-fill-patterns div').forEach(el => el.style.borderColor = 'transparent');
    btn.style.borderColor = '#9333ea';

    if (type === 'pattern') {
        patternImg.setAttribute('href', `./images/stickers/patterns/${value}`);
        mainText.style.fill = 'url(#sticker-pattern-fill)';
    } else {
        mainText.style.fill = value;
    }
};

window.saveStickerConfig = () => {
    const mainText = document.getElementById('sticker-text-main');
    const qty = document.querySelector('.active-size').innerText;
    
    window.saveDesignToQueue('Sticker', {
        content: mainText.textContent,
        fill: mainText.style.fill,
        quantity: qty,
        specs: 'Weatherproof Vinyl / Die-Cut Outline'
    });
};