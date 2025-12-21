export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase">Apparel / Studio</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">T-Shirts</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                <div class="lg:col-span-4 space-y-8">
                    <section>
                        <h3 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Fit Selection</h3>
                        <div class="space-y-3">
                            <button class="w-full p-4 bg-white text-black rounded-xl border border-white text-left flex justify-between items-center">
                                <span class="text-[10px] font-black uppercase">Oversized / Boxy</span>
                                <span class="text-[8px] bg-black text-white px-2 py-1 rounded">Popular</span>
                            </button>
                            <button class="w-full p-4 bg-zinc-900/40 text-white rounded-xl border border-zinc-800 hover:border-zinc-500 text-left transition-all">
                                <span class="text-[10px] font-black uppercase">Standard Streetwear</span>
                            </button>
                            <button class="w-full p-4 bg-zinc-900/40 text-white rounded-xl border border-zinc-800 hover:border-zinc-500 text-left transition-all">
                                <span class="text-[10px] font-black uppercase">Slim / Athletic</span>
                            </button>
                        </div>
                    </section>

                    <section>
                        <h3 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Fabric Weight (GSM)</h3>
                        <div class="grid grid-cols-3 gap-2">
                            <div class="p-3 border border-zinc-800 rounded-lg text-center cursor-pointer hover:border-purple-500">
                                <p class="text-xs font-bold">180</p>
                                <p class="text-[7px] text-zinc-500 uppercase">Light</p>
                            </div>
                            <div class="p-3 border border-purple-500 bg-purple-500/10 rounded-lg text-center cursor-pointer">
                                <p class="text-xs font-bold">240</p>
                                <p class="text-[7px] text-purple-400 uppercase">Heavy</p>
                            </div>
                            <div class="p-3 border border-zinc-800 rounded-lg text-center cursor-pointer hover:border-purple-500">
                                <p class="text-xs font-bold">300</p>
                                <p class="text-[7px] text-zinc-500 uppercase">Ultra</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="lg:col-span-5">
                    <div class="aspect-[4/5] bg-zinc-900/20 border border-zinc-800 rounded-3xl relative overflow-hidden flex items-center justify-center group">
                        <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                        
                        <div class="absolute top-1/4 left-10 right-10 border-t border-dashed border-zinc-800 flex justify-between">
                            <span class="text-[7px] text-zinc-600 -mt-4 uppercase">Chest Width: 62cm</span>
                        </div>
                        
                        <div class="z-10 text-center">
                            <div class="w-48 h-64 border-2 border-white/5 rounded-t-full relative">
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Mesh_Preview</span>
                                </div>
                            </div>
                        </div>

                        <div class="absolute bottom-6 flex gap-2">
                            <div class="w-2 h-2 rounded-full bg-white"></div>
                            <div class="w-2 h-2 rounded-full bg-zinc-800"></div>
                            <div class="w-2 h-2 rounded-full bg-zinc-800"></div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-3 space-y-6">
                    <div class="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                        <h4 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Print Technique</h4>
                        <div class="space-y-2">
                            <div class="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition">
                                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span class="text-[9px] font-bold uppercase">Screen Print (Waterbased)</span>
                            </div>
                            <div class="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition">
                                <div class="w-2 h-2 bg-zinc-700 rounded-full"></div>
                                <span class="text-[9px] font-bold uppercase">DTG (High Res)</span>
                            </div>
                            <div class="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition">
                                <div class="w-2 h-2 bg-zinc-700 rounded-full"></div>
                                <span class="text-[9px] font-bold uppercase">Discharge Printing</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                        <h4 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Bulk Pricing</h4>
                        <p class="text-xl font-black">£8.50 <span class="text-xs font-normal opacity-40">/unit</span></p>
                        <p class="text-[8px] text-zinc-600 mt-1 uppercase">Price based on 250+ units</p>
                    </div>

                    <button class="w-full bg-purple-600 text-white py-5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
                        Start Tech Pack
                    </button>
                </div>

            </div>
        </div>
    `;
}