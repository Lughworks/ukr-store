// pages/lanyards.js
export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase">Accessories / Studio</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Lanyards</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div class="space-y-6">
                    <div class="aspect-square bg-zinc-900/30 border border-zinc-800 rounded-3xl flex items-center justify-center relative overflow-hidden group">
                        <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                        
                        <div class="relative z-10 flex flex-col items-center">
                            <div class="w-64 h-96 border-4 border-purple-500/30 rounded-full flex items-center justify-center animate-pulse">
                                <span class="text-zinc-500 text-[10px] font-bold uppercase tracking-widest text-center">
                                    [ 2D Asset Preview ]<br/>Sublimation Mapping
                                </span>
                            </div>
                        </div>

                        <div class="absolute bottom-6 left-6 flex gap-2">
                            <div class="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded text-[8px] font-bold uppercase">Front View</div>
                            <div class="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded text-[8px] font-bold uppercase opacity-40">Back View</div>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-4">
                        <div class="aspect-square bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-purple-500 cursor-pointer transition"></div>
                        <div class="aspect-square bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-purple-500 cursor-pointer transition"></div>
                        <div class="aspect-square bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-purple-500 cursor-pointer transition flex items-center justify-center">
                            <span class="text-2xl text-zinc-700">+</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-12">
                    <section>
                        <h3 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">Configuration Options</h3>
                        <div class="space-y-8">
                            <div>
                                <label class="text-xs font-bold uppercase block mb-4">Ribbon Width</label>
                                <div class="flex gap-3">
                                    <button class="px-6 py-2 border border-purple-500 text-purple-500 text-[10px] font-bold uppercase rounded">15mm</button>
                                    <button class="px-6 py-2 border border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase rounded hover:border-zinc-500 transition">20mm</button>
                                    <button class="px-6 py-2 border border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase rounded hover:border-zinc-500 transition">25mm</button>
                                </div>
                            </div>

                            <div>
                                <label class="text-xs font-bold uppercase block mb-4">Clip Attachment</label>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="p-4 border border-zinc-800 rounded-xl bg-zinc-900/20 hover:border-zinc-600 cursor-pointer transition flex items-center gap-4">
                                        <div class="w-8 h-8 rounded bg-zinc-800"></div>
                                        <span class="text-[10px] font-bold uppercase">Trigger Clip</span>
                                    </div>
                                    <div class="p-4 border border-zinc-800 rounded-xl bg-zinc-900/20 hover:border-zinc-600 cursor-pointer transition flex items-center gap-4">
                                        <div class="w-8 h-8 rounded bg-zinc-800"></div>
                                        <span class="text-[10px] font-bold uppercase">Dog Clip</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl">
                        <h3 class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 italic underline">Production Specs</h3>
                        <div class="grid grid-cols-2 gap-y-6 gap-x-12">
                            <div>
                                <p class="text-[10px] text-zinc-500 uppercase font-bold">Minimum Order</p>
                                <p class="text-sm font-bold">50 Units</p>
                            </div>
                            <div>
                                <p class="text-[10px] text-zinc-500 uppercase font-bold">Lead Time</p>
                                <p class="text-sm font-bold">10-14 Working Days</p>
                            </div>
                            <div>
                                <p class="text-[10px] text-zinc-500 uppercase font-bold">Print Method</p>
                                <p class="text-sm font-bold">Sublimation Printing</p>
                            </div>
                            <div>
                                <p class="text-[10px] text-zinc-500 uppercase font-bold">Safety Break</p>
                                <p class="text-sm font-bold">Included as Standard</p>
                            </div>
                        </div>
                    </section>

                    <button class="w-full bg-purple-600 py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
                        Generate Quote Request
                    </button>
                </div>
            </div>
        </div>
    `;
}