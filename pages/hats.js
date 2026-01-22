export function render() {
  const __unit = (window?.computeUnitPriceFromTable?.({ product: { slug: 'hats' }, config: {} }) ?? 0);
const __price = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(__unit);
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
                        <div data-preview="2d" class="absolute inset-0">
                            <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                        
                            <svg id="hat-svg-engine" viewBox="0 0 500 500" class="w-full h-full drop-shadow-2xl">
                                <defs>
                                    <pattern id="logo-pattern-fill" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                        <image id="svg-logo-pattern-img" href="" x="0" y="0" width="120" height="120" preserveAspectRatio="xMidYMid slice" />
                                    </pattern>
                                    
                                    <clipPath id="hat-clip">
                                        <path d="M250,120 C180,120 100,160 80,240 C75,260 70,300 70,320 L430,320 C430,300 425,260 420,240 C400,160 320,120 250,120 Z" />
                                        <path d="M70,320 C70,350 120,400 250,400 C380,400 430,350 430,320 L70,320 Z" />
                                    </clipPath>
                                </defs>

                                <rect width="500" height="500" fill="#303030ff" clip-path="url(#hat-clip)" />
                                <path d="M250,120 C180,120 100,160 80,240 C75,260 70,300 70,320 L430,320 C430,300 425,260 420,240 C400,160 320,120 250,120 Z" fill="black" opacity="0.4" />
                                
                                <text id="svg-logo-target" x="50%" y="275" text-anchor="middle" 
                                    class="heading-font italic font-black" 
                                    style="font-size: 110px; fill: #ffffff; transition: fill 0.3s ease;">
                                    UR?
                                </text>
                            </svg>
                        </div>
                        <div data-preview="3d" class="hidden absolute inset-0 p-4"></div>
                        <div class="absolute bottom-6 left-6 z-30 flex gap-2">
                            <button onclick="window.disable3DViewer()" class="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:border-purple-500 transition">Studio</button>
                            <button onclick="window.enable3DViewer('hats','default')" class="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:border-purple-500 transition">3D</button>
                        </div>
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

                        <div id="fill-colors" class="grid grid-cols-7 gap-2">${['#FFFFFF', '#FF0000', '#9333EA', '#22C55E', '#3B82F6', '#EAB308', '#000000'].map(color => `
                            <div onclick="window.applyLogoFill('color', '${color}', this)" style="background-color: ${color}" class="aspect-square rounded-md border-2 border-transparent cursor-pointer hover:scale-110 transition active-color-indicator"></div>`).join('')}
                        </div>

                        <div id="fill-patterns" class="hidden grid grid-cols-3 gap-3">${['Camo', 'Grid', 'Acid', 'Digital', 'Carbon', 'Leopard'].map(pat => `<div onclick="window.applyLogoFill('pattern', '${pat.toLowerCase()}.png', this)" style="background-image: url('./images/hats/patterns/${pat.toLowerCase()}.png'); background-size: cover; background-position: center;"class="aspect-square rounded-xl border-2 border-transparent cursor-pointer hover:scale-110 transition flex items-end p-2 group"><span class="text-[7px] font-black uppercase bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">${pat}</span></div>`).join('')}</div>
                    </div>

                    <button onclick="window.saveHatConfig()" class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.updateHatLogo = (text, btn) => {
    window.updateSelection(btn, 'active-preset');
    document.getElementById('svg-logo-target').textContent = text;
};

window.toggleFillMode = (mode) => {
    const isPattern = mode === 'pattern';
    document.getElementById('fill-colors').classList.toggle('hidden', isPattern);
    document.getElementById('fill-patterns').classList.toggle('hidden', !isPattern);
        const colorBtn = document.getElementById('btn-mode-color');
    const patternBtn = document.getElementById('btn-mode-pattern');
    
    if(isPattern) {
        patternBtn.className = "text-[9px] font-bold px-3 py-1 bg-white text-black rounded-full transition-all";
        colorBtn.className = "text-[9px] font-bold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full transition-all";
    } else {
        colorBtn.className = "text-[9px] font-bold px-3 py-1 bg-white text-black rounded-full transition-all";
        patternBtn.className = "text-[9px] font-bold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full transition-all";
    }
};

window.applyLogoFill = (type, value, btn) => {
    const logo = document.getElementById('svg-logo-target');
    const patternImg = document.getElementById('svg-logo-pattern-img');
    
    document.querySelectorAll('#fill-colors div, #fill-patterns div').forEach(el => {
        el.style.borderColor = 'transparent';
    });
    btn.style.borderColor = '#9333ea';

    if (type === 'pattern') {
        patternImg.setAttribute('href', `./images/hats/patterns/${value}`);
        logo.style.fill = 'url(#logo-pattern-fill)';
    } else {
        logo.style.fill = value;
    }
};

window.saveHatConfig = () => {
    const logo = document.getElementById('svg-logo-target');
    window.saveDesignToQueue({ slug: 'hats', label: 'Hat' }, {
        logo: logo.textContent,
        fill: logo.style.fill,
        specs: "SVG-Engine Dye-Sub Fill"
    }, { text: (logo.textContent || 'Hat') });
};