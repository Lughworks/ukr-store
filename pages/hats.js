export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase">Accessories / Studio</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Hats</h1>
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
                        <div id="hat-preview-target" class="relative z-10 text-center">
                             <div class="w-64 h-64 border-4 border-dashed border-zinc-800 rounded-full flex items-center justify-center">
                                <span class="text-[10px] uppercase font-black text-zinc-700 tracking-[0.5em]">Studio_Preview</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 space-y-8">
                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-6 text-purple-500">Select Design Style</h3>
                        <div class="grid grid-cols-1 gap-3">
                            <button onclick="toggleHatMode('text', this)" class="active-preset p-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-left transition-all">
                                <span class="block text-xs font-black uppercase">Preset 01: Typography</span>
                                <span class="text-[9px] text-zinc-500 uppercase font-bold tracking-tighter">Embroidery • Extended Palette</span>
                            </button>
                            <button onclick="toggleHatMode('logo', this)" class="p-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-left transition-all opacity-60 hover:opacity-100">
                                <span class="block text-xs font-black uppercase">Preset 02: Logo Array</span>
                                <span class="text-[9px] text-zinc-500 uppercase font-bold tracking-tighter">Full Print • Pattern Design</span>
                            </button>
                        </div>
                    </div>

                    <div id="hat-options-container" class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 id="option-title" class="text-xs font-black uppercase tracking-[0.2em] mb-6 text-zinc-400 italic">Available Palette</h3>
                        
                        <div id="solid-colors" class="grid grid-cols-8 gap-2 mb-2 max-h-48 overflow-y-auto p-2 border border-zinc-800 rounded-xl">
                            ${['#000000', '#FFFFFF', '#991B1B', '#1E3A8A']
                                .map((color, i) => `
                                <div 
                                    onclick="window.updateSelection(this, 'active-color')" 
                                    data-color="${color}" 
                                    style="background-color: ${color}" 
                                    class="aspect-square rounded-md border border-zinc-700 cursor-pointer hover:scale-110 transition ${i === 0 ? 'active-color' : ''}">
                                </div>`).join('')}
                        </div>

                            <div id="pattern-options" class="hidden grid grid-cols-4 gap-2 mb-2 p-2 border border-zinc-800 rounded-xl">
                                ${[
                                    { id: 'Camo', file: 'camo_woodland.png' },
                                    { id: 'Grid', file: 'tech_grid.png' },
                                    { id: 'Acid', file: 'acid_wash.png' },
                                    { id: 'Digital', file: 'digi_camo.png' },
                                    { id: 'Carbon', file: 'carbon_fiber.png' },
                                    { id: 'Leopard', file: 'leopard_print.png' }
                                ].map((pat, i) => `
                                    <div 
                                        onclick="window.updateSelection(this, 'active-preset')" 
                                        data-pattern="${pat.id}" 
                                        style="background-image: url('../images/hats/patterns/${pat.file}'); background-size: cover;" 
                                        class="aspect-square rounded-md border border-zinc-700 cursor-pointer hover:scale-110 transition group relative ${i === 0 ? 'active-preset' : ''}">
                                        
                                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/80 transition-opacity rounded-md">
                                            <span class="text-[7px] font-black uppercase tracking-tighter text-white">${pat.id}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                    </div>

                    <button 
                        onclick="saveHatConfig()"
                        class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                        Finalize Hat Build
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.toggleHatMode = (mode, btn) => {
    updateSelection(btn, 'active-preset');
    
    const title = document.getElementById('option-title');
    const colors = document.getElementById('solid-colors');
    const patterns = document.getElementById('pattern-options');

    if (mode === 'logo') {
        title.innerText = 'Available Patterns';
        colors.classList.add('hidden');
        patterns.classList.remove('hidden');
    } else {
        title.innerText = 'Available Palette';
        colors.classList.remove('hidden');
        patterns.classList.add('hidden');
    }
};

window.saveHatConfig = () => {
    const isLogoMode = !document.getElementById('pattern-options').classList.contains('hidden');
    const activePresetBtn = document.querySelector('.active-preset');
    const styleName = activePresetBtn ? activePresetBtn.querySelector('span').innerText : 'Preset';
    
    // Determine the value to save (Hex color or Pattern Name)
    const colorOrPattern = isLogoMode 
        ? document.querySelector('#pattern-options .active-preset')?.dataset.pattern 
        : document.querySelector('#solid-colors .active-color')?.dataset.color;

    const config = {
        front: styleName,
        frontFont: 'Preset Style',
        color: colorOrPattern,
        // We save the pattern flag so the Production Log can render the mini-image
        isPattern: isLogoMode, 
        image: isLogoMode ? `../images/hats/patterns/${colorOrPattern.toLowerCase()}.png` : null,
        size: 'Adjustable',
        specs: isLogoMode ? 'Sublimated Tech Wrap' : '3D Embroidery'
    };

    saveDesignToQueue('Hat', config);
};

window.updateHatPreview = (type, value) => {
    const target = document.getElementById('hat-preview-target');
    if (!target) return;

    if (type === 'pattern') {
        // Find the filename from our list or just use the ID
        const fileName = value.toLowerCase().replace(' ', '_') + '.png';
        target.style.backgroundImage = `url('../images/hats/patterns/${fileName}')`;
        target.style.backgroundSize = 'cover';
        target.innerHTML = ''; // Clear the "Studio_Preview" text
    } else {
        target.style.backgroundImage = 'none';
        target.style.backgroundColor = value;
        target.innerHTML = `<span class="text-[10px] uppercase font-black text-zinc-700">${value}</span>`;
    }
};