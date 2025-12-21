export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase">Apparel / Studio</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Full Tracksuits</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div class="lg:col-span-7 space-y-6">
                    <div class="aspect-[4/5] bg-zinc-900/20 border border-zinc-800 rounded-3xl relative overflow-hidden group">
                        <div class="absolute inset-0 blueprint-grid opacity-30"></div>
                        
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="relative w-3/4 h-3/4 flex flex-col items-center justify-center border border-white/5 rounded-full">
                                <div class="text-[120px] font-black opacity-5 select-none tracking-tighter">UKR-S1</div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                     <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.5em] animate-pulse">Initializing 3D Mesh...</span>
                                </div>
                            </div>
                        </div>

                        <div class="absolute top-6 left-6 font-mono text-[8px] text-zinc-600 space-y-1">
                            <p>REF: TRK-092-ALPHA</p>
                            <p>VER: 2.0.4/STU</p>
                        </div>
                        <div class="absolute bottom-6 right-6 flex gap-3">
                            <div class="bg-black/80 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                                <div class="w-2 h-2 rounded-full bg-purple-500"></div>
                                <span class="text-[9px] font-bold uppercase">Front</span>
                            </div>
                            <div class="bg-black/80/20 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2 opacity-50">
                                <span class="text-[9px] font-bold uppercase">Side</span>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-4">
                        ${[1, 2, 3, 4].map(() => `
                            <div class="aspect-square bg-zinc-900/40 border border-zinc-800 rounded-xl hover:border-purple-500 transition cursor-pointer"></div>
                        `).join('')}
                    </div>
                </div>

                <div class="lg:col-span-5 space-y-8">
                    
                    <div class="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8">
                        <h3 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-4 italic">Material Profile</h3>
                        <div class="grid grid-cols-2 gap-y-6">
                            <div>
                                <p class="text-[9px] text-zinc-500 uppercase">Fabrication</p>
                                <p class="text-xs font-bold uppercase">420GSM Heavy Fleece</p>
                            </div>
                            <div>
                                <p class="text-[9px] text-zinc-500 uppercase">Fit Pattern</p>
                                <p class="text-xs font-bold uppercase">Boxy / Oversized</p>
                            </div>
                            <div>
                                <p class="text-[9px] text-zinc-500 uppercase">Construction</p>
                                <p class="text-xs font-bold uppercase">Flatlock Stitching</p>
                            </div>
                            <div>
                                <p class="text-[9px] text-zinc-500 uppercase">Components</p>
                                <p class="text-xs font-bold uppercase">Chrome Hardware</p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div>
                            <label class="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-4">Select Primary Color</label>
                            <div class="flex gap-4">
                                <div class="w-10 h-10 rounded-full bg-zinc-900 border-2 border-purple-500 cursor-pointer"></div>
                                <div class="w-10 h-10 rounded-full bg-stone-200 border-2 border-transparent cursor-pointer"></div>
                                <div class="w-10 h-10 rounded-full bg-blue-900 border-2 border-transparent cursor-pointer"></div>
                                <div class="w-10 h-10 rounded-full bg-emerald-900 border-2 border-transparent cursor-pointer"></div>
                            </div>
                        </div>

                        <div>
                            <label class="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-4">Branding Method</label>
                            <div class="grid grid-cols-2 gap-3">
                                <button class="bg-zinc-900 border border-zinc-700 py-3 px-4 rounded-xl text-[10px] font-bold uppercase hover:border-purple-500 transition">3D Puff Embroidery</button>
                                <button class="bg-zinc-900 border border-zinc-700 py-3 px-4 rounded-xl text-[10px] font-bold uppercase hover:border-purple-500 transition">Screen Print (HD)</button>
                                <button class="bg-zinc-900 border border-zinc-700 py-3 px-4 rounded-xl text-[10px] font-bold uppercase hover:border-purple-500 transition">Woven Patch</button>
                                <button class="bg-zinc-900 border border-zinc-700 py-3 px-4 rounded-xl text-[10px] font-bold uppercase hover:border-purple-500 transition">Chenille</button>
                            </div>
                        </div>
                    </div>

                    <div class="pt-6 border-t border-zinc-900">
                        <button class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all duration-500">
                            Download Tech Pack (.PDF)
                        </button>
                        <p class="text-center text-[9px] text-zinc-600 mt-4 uppercase font-bold tracking-tighter">
                            Sample production lead time: 14-21 days
                        </p>
                    </div>

                </div>
            </div>
        </div>
    `;
}