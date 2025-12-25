export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative overflow-y-auto">
            <div class="flex justify-between items-start mb-16">

                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Intelligence / Archive</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Unknown_Collective</h1>
                </div>

                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Exit Archive</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="w-full mb-12">
                <div class="bg-zinc-900/10 border border-zinc-800 rounded-[3rem] p-4 h-[400px] relative overflow-hidden group">
                    <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                    <div class="w-full h-full rounded-[2.2rem] overflow-hidden relative z-10">
                        <img src="./images/general/general_asset_01.png" 
                             onerror="this.src='https://placehold.co/1200x500/111/white?text=COLLECTIVE_CORE_VISUAL'" 
                             class="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" 
                             alt="Collective Core">
                        
                        <div class="absolute top-8 left-8 flex flex-col gap-2">
                            <div class="bg-black/60 backdrop-blur-md border border-purple-500/30 px-4 py-1 rounded-sm">
                                <span class="text-[8px] font-mono text-purple-400">COORD_51.5074_N_0.1278_W</span>
                            </div>
                            <div class="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1 rounded-sm">
                                <span class="text-[8px] font-mono text-zinc-400">SIGNAL: ENCRYPTED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem]">
                    <h3 class="text-purple-500 font-black text-[10px] uppercase tracking-widest mb-4">01 / Objective</h3>
                    <p class="text-xs text-zinc-400 leading-relaxed font-medium uppercase tracking-wider">
                        To bridge the gap between technical performance and underground culture, providing hardware for the unindexed.
                    </p>
                </div>
                
                <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem]">
                    <h3 class="text-purple-500 font-black text-[10px] uppercase tracking-widest mb-4">02 / Methodology</h3>
                    <p class="text-xs text-zinc-400 leading-relaxed font-medium uppercase tracking-wider">
                        Operating in low-light environments. Iterative prototyping. Field-tested in the urban sprawl and midnight circuits.
                    </p>
                </div>

                <div class="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem]">
                    <h3 class="text-purple-500 font-black text-[10px] uppercase tracking-widest mb-4">03 / Connectivity</h3>
                    <p class="text-xs text-zinc-400 leading-relaxed font-medium uppercase tracking-wider">
                        A decentralized network of riders, drivers, and creators. We are the ghost in the machine.
                    </p>
                </div>
            </div>

            <div class="pt-12 border-t border-zinc-900 flex justify-between items-center text-[8px] text-zinc-700 font-black uppercase tracking-[0.5em]">
                <span>Status: Optimal</span>
                <span>User_Access: Admin_Level_01</span>
                <span>UK? Archive © 2025</span>
            </div>
        </div>
    `;
}