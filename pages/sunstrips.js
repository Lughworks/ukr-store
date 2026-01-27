export function render() {
  const __unit = (window?.computeUnitPriceFromTable?.({ product: { slug: 'sunstrips' }, config: {} }) ?? 0);
  const __price = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(__unit);
  
  setTimeout(() => {
    if (typeof window.enable3DViewer === 'function') {
      window.enable3DViewer('sunstrips', 'default');
    }
  }, 50);

  return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative overflow-y-auto">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Automotive / Driverz Division</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Sunstrips</h1>
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

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div class="lg:col-span-7">
                    <div id="preview-stage" class="aspect-[21/9] bg-zinc-900/20 border border-zinc-800 rounded-3xl flex items-center justify-center group relative overflow-hidden">
                        <div data-preview="3d" class="absolute inset-0 p-4"></div>
                    </div>
                </div>

                <div class="lg:col-span-5 space-y-8">
                    <div class="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 space-y-8">
                        <div>
                            <label class="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Build Specification</label>
                            <p class="text-2xl font-black italic uppercase tracking-tighter text-white">"Unknown Drivers" Banner</p>
                        </div>

                        <div class="grid grid-cols-1 gap-6">
                            <div class="flex justify-between items-end border-b border-zinc-800 pb-4">
                                <span class="text-[10px] font-black uppercase tracking-widest text-zinc-500">Material</span>
                                <span class="text-xs font-bold uppercase text-zinc-200 tracking-wider">Matte Black Vinyl</span>
                            </div>
                            <div class="flex justify-between items-end border-b border-zinc-800 pb-4">
                                <span class="text-[10px] font-black uppercase tracking-widest text-zinc-500">Dimensions</span>
                                <span class="text-xs font-bold uppercase text-zinc-200 tracking-wider">1400mm x 250mm</span>
                            </div>
                            <div class="flex justify-between items-end border-b border-zinc-800 pb-4">
                                <span class="text-[10px] font-black uppercase tracking-widest text-zinc-500">Durability</span>
                                <span class="text-xs font-bold uppercase text-zinc-200 tracking-wider">5-7 Year UV Rated</span>
                            </div>
                        </div>

                        <div class="bg-purple-500/5 border border-purple-500/20 p-4 rounded-xl">
                            <p class="text-[9px] text-purple-400 uppercase font-bold leading-relaxed tracking-wider">
                                System Note: This is a universal oversized unit. Professional trimming required to match windshield curvature during application.
                            </p>
                        </div>
                    </div>

                    <button onclick="window.saveSunstripConfig()" 
                        class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.saveSunstripConfig = () => {
    const config = {
        front: 'Unknown Drivers',
        frontFont: 'Impact Bold Italic',
        color: 'Matte Black',
        size: 'Universal (140cm)',
        specs: 'Die-Cut Vinyl / No Customization'
    };

    window.saveDesignToQueue({ slug: 'sunstrips', label: 'Sunstrip' }, config, { text: (config.front || 'Sunstrip') });
};