export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase">Accessories / Studio</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Balaclavas</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div class="lg:col-span-7">
                    <div class="aspect-square bg-zinc-900/20 border border-zinc-800 rounded-3xl relative overflow-hidden flex items-center justify-center">
                        <div class="absolute inset-0 blueprint-grid opacity-30"></div>
                        <div id="balaclava-preview-target" class="relative z-10">
                             <div class="w-48 h-64 border-4 border-dashed border-zinc-800 rounded-full flex flex-col items-center justify-center">
                                <span id="preview-text-display" class="text-xl font-black uppercase tracking-tighter text-zinc-700 italic">UNIT_READY</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 space-y-8">
                    
                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-6 text-purple-500 italic">Select Unit Base</h3>
                        <div class="grid grid-cols-8 gap-2 mb-2 p-2 border border-zinc-800 rounded-xl">
                            ${['#EC4899', '#2563EB', '#DC2626', '#000000', '#FFFFFF']
                                .map((color, i) => `
                                <div 
                                    onclick="window.updateSelection(this, 'active-color')" 
                                    data-color="${color}" 
                                    style="background-color: ${color}" 
                                    class="aspect-square rounded-md border border-zinc-700 cursor-pointer hover:scale-110 transition ${i === 3 ? 'active-color' : ''}">
                                </div>`).join('')}
                        </div>
                        <p class="text-[7px] text-zinc-600 uppercase mt-2 tracking-widest">Matte Poly-Stretch Finish</p>
                    </div>

                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-6 text-zinc-400">Identity Presets</h3>
                        <div class="grid grid-cols-1 gap-2">
                            ${['UnknownRiders', 'UnknownDrivers'].map((text, i) => `
                                <button 
                                    onclick="window.updateBalaclavaPreview('${text}', this)" 
                                    class="py-4 bg-black border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-purple-500 transition ${i === 0 ? 'active-preset' : 'opacity-60'}">
                                    ${text}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <button 
                        onclick="saveBalaclavaConfig()"
                        class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95">
                        Finalize Unit Build
                    </button>

                    <div class="border-t border-zinc-800 pt-6">
                        <div class="flex justify-between items-center text-[8px] text-zinc-500 font-bold uppercase tracking-widest">
                            <span>Material: Poly-Blend</span>
                            <span>Fit: One Size</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Logical Helpers
window.updateBalaclavaPreview = (text, btn) => {
    window.updateSelection(btn, 'active-preset');
    const display = document.getElementById('preview-text-display');
    if (display) {
        display.innerText = text;
        display.classList.remove('text-zinc-700');
        display.classList.add('text-purple-500');
    }
};

window.saveBalaclavaConfig = () => {
    const activePresetBtn = document.querySelector('.active-preset');
    const activeColor = document.querySelector('.active-color');

    const config = {
        front: activePresetBtn ? activePresetBtn.innerText.trim() : 'UnknownRiders',
        frontFont: 'Impact Mono',
        color: activeColor ? activeColor.dataset.color : '#000000',
        size: 'One Size',
        specs: 'Poly-Stretch / Vinyl Press'
    };

    saveDesignToQueue('Balaclava', config);
};