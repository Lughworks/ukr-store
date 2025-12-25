export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative overflow-y-auto">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-blue-500 font-bold tracking-[0.3em] uppercase italic">Intelligence / Archive</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">ur_Riderz</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Exit Archive</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div class="lg:col-span-7 space-y-8">
                    <div class="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[2rem] relative overflow-hidden">
                        <div class="absolute inset-0 blueprint-grid opacity-10"></div>
                        <h2 class="text-xs font-black uppercase tracking-[0.4em] text-blue-500 mb-6 italic">// Operational_Bio</h2>
                        <p class="text-lg text-zinc-400 leading-relaxed font-medium">
                            Unknown Riderz. Specialized in high-speed urban transit and technical mobility. 
                            Our doctrine is built on the pursuit—optimized for low-light environments and high-density urban terrain.
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl">
                            <span class="text-[8px] text-zinc-600 font-black uppercase block mb-2">Focus</span>
                            <span class="text-xs font-bold uppercase tracking-widest text-white">Urban Stealth</span>
                        </div>
                        <div class="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl">
                            <span class="text-[8px] text-zinc-600 font-black uppercase block mb-2">Unit Type</span>
                            <span class="text-xs font-bold uppercase tracking-widest text-white">Interceptor</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5">
                    <div class="bg-zinc-900/10 border border-zinc-800 rounded-[2.5rem] p-3 h-full min-h-[500px] relative overflow-hidden group">
                        <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                        
                        <div class="w-full h-full rounded-[1.8rem] overflow-hidden relative z-10">
                            <img src="./images/ur/ur_asset_01.png" 
                                 onerror="this.src='https://placehold.co/600x800/111/white?text=ur_INTEL_IMAGE'" 
                                 class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                                 alt="ur Tactical Visual">
                            
                            <div class="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                                <span class="text-[9px] text-blue-500 font-black uppercase tracking-[0.3em]">Visual_Reference_01</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}