export function render() {
  const __unit = (window?.computeUnitPriceFromTable?.({ product: { slug: 'balaclavas' }, config: {} }) ?? 0);
const __price = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(__unit);
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Accessories / Division 02</span>
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
                        <div data-preview="2d" class="absolute inset-0">
                        <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                        
                        <svg id="balaclava-svg-engine" viewBox="0 0 500 500" class="w-full h-full drop-shadow-2xl">
                            <defs>
                                <clipPath id="neck-gaiter-clip">
                                    <path d="M150,100 L350,100 C370,100 380,120 380,150 L380,400 C380,430 360,450 340,450 L160,450 C140,450 120,430 120,400 L120,150 C120,120 130,100 150,100 Z" />
                                </clipPath>
                            </defs>

                            <rect width="500" height="500" fill="#0c0c0c" clip-path="url(#neck-gaiter-clip)" />
                            
                            <path d="M120,150 Q250,130 380,150 L380,400 Q250,420 120,400 Z" fill="black" opacity="0.5" pointer-events="none" />
                            
                            <text id="svg-logo-target" x="50%" y="220" text-anchor="middle" class="heading-font italic font-black" style="font-size: 70px; fill: #ffffff; transition: all 0.3s ease; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.9));">UR?</text>
                        </svg>
                        </div>
                            <div data-preview="3d" class="hidden absolute inset-0 p-4"></div>
                        <!-- VIEW TOGGLE -->
                        <div class="absolute bottom-6 left-6 z-30 flex gap-2">
                            <button onclick="window.disable3DViewer()" class="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:border-purple-500 transition">Studio</button>
                            <button onclick="window.enable3DViewer('balaclavas','default')" class="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:border-purple-500 transition">3D</button>
                        </div>
                    </div>
                </div>
                    
                <div class="lg:col-span-5 space-y-6">
                    
                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-4 text-purple-500 italic">Step 1: Identity Selection</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${[
                                {short: 'UR?', full: 'UnknownRiderz'},
                                {short: 'UD?', full: 'UnknownDriverz'}
                            ].map(brand => `<button onclick="window.updateBalaclavaLogo('${brand.short}', this, 75)" class="p-4 bg-zinc-800 border border-zinc-700 rounded-2xl font-black italic text-xl hover:bg-zinc-700 transition">${brand.short}</button><button onclick="window.updateBalaclavaLogo('${brand.full}', this, 32)" class="p-4 bg-zinc-800 border border-zinc-700 rounded-2xl font-black italic text-[10px] tracking-widest hover:bg-zinc-700 transition">${brand.full}</button>`).join('')}
                        </div>
                    </div>

                    <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                        <h3 class="text-xs font-black uppercase tracking-[0.2em] mb-6 text-zinc-400">Step 2: Logo Color</h3>
                        <div class="grid grid-cols-6 gap-3">${['#FFFFFF', '#FF0000', '#9333EA', '#22C55E', '#3B82F6', '#EAB308', '#FF6B00', '#555555'].map(color => `<div onclick="window.applyLogoColor('${color}', this)" style="background-color: ${color}" class="aspect-square rounded-full border-2 border-transparent cursor-pointer hover:scale-110 transition active:scale-95"></div>`).join('')}</div>
                    </div>

                    <button onclick="window.saveBalaclavaConfig()" class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.updateBalaclavaLogo = (text, btn, size) => {
    window.updateSelection(btn, 'active-preset');
    const logo = document.getElementById('svg-logo-target');
    logo.textContent = text;
    logo.style.fontSize = size + 'px';
};

window.applyLogoColor = (color, btn) => {
    btn.parentElement.querySelectorAll('div').forEach(el => el.style.borderColor = 'transparent');
    btn.style.borderColor = '#9333ea';
    const logo = document.getElementById('svg-logo-target');
    if (logo) logo.style.fill = color;
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