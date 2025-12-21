export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase">Accessories / Studio</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Headwear</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <div class="lg:col-span-4 space-y-4">
                    <h3 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Select Silhouette</h3>
                    
                    <div class="p-4 bg-white text-black rounded-2xl flex items-center justify-between cursor-pointer border border-white">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-zinc-200 rounded-lg"></div>
                            <div>
                                <p class="text-[10px] font-black uppercase leading-none">The "Bally"</p>
                                <p class="text-[8px] font-bold opacity-60 uppercase mt-1 text-zinc-600">3-Hole Knit</p>
                            </div>
                        </div>
                        <span class="text-xs">→</span>
                    </div>

                    <div class="p-4 bg-zinc-900/40 text-white rounded-2xl flex items-center justify-between cursor-pointer border border-zinc-800 hover:border-zinc-500 transition">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-zinc-800 rounded-lg"></div>
                            <div>
                                <p class="text-[10px] font-black uppercase leading-none">Tech Beanie</p>
                                <p class="text-[8px] font-bold opacity-60 uppercase mt-1">Reflective Thread</p>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 bg-zinc-900/40 text-white rounded-2xl flex items-center justify-between cursor-pointer border border-zinc-800 hover:border-zinc-500 transition opacity-50">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-zinc-800 rounded-lg"></div>
                            <div>
                                <p class="text-[10px] font-black uppercase leading-none">Tactical Hood</p>
                                <p class="text-[8px] font-bold opacity-60 uppercase mt-1">Coming Soon</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5">
                    <div class="aspect-square bg-zinc-900/20 border border-zinc-800 rounded-3xl relative overflow-hidden flex items-center justify-center">
                        <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                        
                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div class="w-full h-[1px] bg-white/5"></div>
                            <div class="h-full w-[1px] bg-white/5"></div>
                        </div>

                        <div class="text-center z-10">
                            <div class="text-[100px] font-black text-white/5 select-none">HEAD</div>
                            <div class="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">Wireframe Preview Active</div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-3 space-y-6">
                    <div class="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl">
                        <h4 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">Customization</h4>
                        
                        <div class="space-y-4">
                            <div>
                                <p class="text-[9px] text-zinc-500 uppercase font-bold mb-2">Embroidery Placement</p>
                                <div class="grid grid-cols-2 gap-2">
                                    <button class="bg-black border border-zinc-700 py-2 rounded text-[8px] font-bold uppercase hover:border-purple-500">Center Front</button>
                                    <button class="bg-black border border-zinc-700 py-2 rounded text-[8px] font-bold uppercase hover:border-purple-500">Side Temple</button>
                                </div>
                            </div>

                            <div>
                                <p class="text-[9px] text-zinc-500 uppercase font-bold mb-2">Thread Type</p>
                                <select class="w-full bg-black border border-zinc-700 py-2 px-3 rounded text-[9px] font-bold uppercase text-white outline-none focus:border-purple-500 transition">
                                    <option>Standard Cotton</option>
                                    <option>Metallic Silver</option>
                                    <option>Neon Reflective</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 bg-purple-900/20 border border-purple-500/30 rounded-2xl">
                        <p class="text-[9px] text-purple-400 font-bold uppercase mb-1">Production Quote</p>
                        <p class="text-xl font-black uppercase tracking-tighter">£12.50 <span class="text-[10px] font-normal opacity-60">/unit</span></p>
                        <p class="text-[8px] text-zinc-500 mt-2 uppercase">Estimate based on 100 units</p>
                    </div>

                    <button class="w-full bg-white text-black py-5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all duration-300">
                        Start Design
                    </button>
                </div>

            </div>
        </div>
    `;
}