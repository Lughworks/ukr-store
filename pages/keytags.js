export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase">Accessories / Studio</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Key Tags</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div class="lg:col-span-3 space-y-4">
                    <h3 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Fabrication Type</h3>
                    
                    <button class="w-full p-4 bg-white text-black rounded-2xl flex items-center gap-4 border border-white transition-all text-left">
                        <div class="w-10 h-10 bg-zinc-200 rounded-lg flex items-center justify-center font-bold text-xs">EMB</div>
                        <div>
                            <p class="text-[10px] font-black uppercase leading-none">Embroidered</p>
                            <p class="text-[8px] font-bold opacity-60 uppercase mt-1">Flight Tag Style</p>
                        </div>
                    </button>

                    <button class="w-full p-4 bg-zinc-900/40 text-white rounded-2xl flex items-center gap-4 border border-zinc-800 hover:border-zinc-500 transition-all text-left">
                        <div class="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center font-bold text-xs">PVC</div>
                        <div>
                            <p class="text-[10px] font-black uppercase leading-none">Soft Rubber</p>
                            <p class="text-[8px] font-bold opacity-60 uppercase mt-1">3D Molded</p>
                        </div>
                    </button>

                    <button class="w-full p-4 bg-zinc-900/40 text-white rounded-2xl flex items-center gap-4 border border-zinc-800 hover:border-zinc-500 transition-all text-left">
                        <div class="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center font-bold text-xs">WVN</div>
                        <div>
                            <p class="text-[10px] font-black uppercase leading-none">Woven Detail</p>
                            <p class="text-[8px] font-bold opacity-60 uppercase mt-1">High Resolution</p>
                        </div>
                    </button>
                </div>

                <div class="lg:col-span-6">
                    <div class="aspect-square bg-zinc-900/20 border border-zinc-800 rounded-3xl relative overflow-hidden flex items-center justify-center">
                        <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                        
                        <div class="z-10 text-center">
                            <div class="relative inline-block px-12 py-4 border-2 border-purple-500/50 rounded-md rotate-[-5deg] bg-black/40 backdrop-blur-sm">
                                <span class="text-4xl font-black italic tracking-tighter opacity-20">UKR-TAG</span>
                                <div class="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 border-2 border-zinc-700 rounded-full"></div>
                            </div>
                            <p class="mt-12 text-[9px] font-mono text-zinc-600 tracking-[0.5em] uppercase">Viewport: Custom_Shape_Active</p>
                        </div>

                        <div class="absolute bottom-6 left-6 font-mono text-[8px] text-zinc-500">
                            X: 130mm | Y: 30mm | Z: 3mm
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-3 space-y-6">
                    <div class="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                        <h4 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Hardware Options</h4>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="aspect-square bg-black border border-zinc-700 rounded-lg flex flex-col items-center justify-center p-2 hover:border-purple-500 cursor-pointer">
                                <div class="w-6 h-6 border-2 border-zinc-600 rounded-full mb-2"></div>
                                <span class="text-[8px] font-bold uppercase">Split Ring</span>
                            </div>
                            <div class="aspect-square bg-black border border-zinc-700 rounded-lg flex flex-col items-center justify-center p-2 hover:border-purple-500 cursor-pointer">
                                <div class="w-6 h-1 w-4 border-2 border-zinc-600 rounded mb-2"></div>
                                <span class="text-[8px] font-bold uppercase">Carabiner</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                        <h4 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">MOQ Requirement</h4>
                        <p class="text-xl font-black">50 <span class="text-xs font-normal opacity-40">UNITS</span></p>
                        <p class="text-[8px] text-zinc-600 mt-1 uppercase">Standard Lead Time: 12 Days</p>
                    </div>

                    <button class="w-full bg-white text-black py-5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all duration-300">
                        Download Template
                    </button>
                </div>
            </div>
        </div>
    `;
}