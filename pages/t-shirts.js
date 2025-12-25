export function render() {
    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase">Apparel / Studio</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Custom T-Shirts</h1>
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
                                <div class="text-[120px] font-black opacity-5 select-none tracking-tighter uppercase">TEE</div>
                            </div>
                        </div>

                        <div class="absolute bottom-6 left-6 flex gap-3">
                            <button class="bg-purple-600 px-4 py-2 rounded-lg border border-purple-400 text-[9px] font-bold uppercase">Front View</button>
                            <button class="bg-black/80 px-4 py-2 rounded-lg border border-white/10 text-[9px] font-bold uppercase opacity-50 hover:opacity-100 transition">Rear View</button>
                        </div>
                    </div>

                    <div class="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="text-center p-3 border border-zinc-800 rounded-xl">
                                <p class="text-[8px] text-zinc-500 uppercase">Weight</p>
                                <p class="text-[10px] font-bold">240GSM Organic</p>
                            </div>
                            <div class="text-center p-3 border border-zinc-800 rounded-xl">
                                <p class="text-[8px] text-zinc-500 uppercase">Fit</p>
                                <p class="text-[10px] font-bold">Boxy / Oversized</p>
                            </div>
                            <div class="text-center p-3 border border-zinc-800 rounded-xl">
                                <p class="text-[8px] text-zinc-500 uppercase">Stitching</p>
                                <p class="text-[10px] font-bold">Double Needle</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 space-y-8">
                    <div class="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8">
                        <label class="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-6">Configuration</label>
                        
                        <div class="grid grid-cols-8 gap-2 mb-6 max-h-48 overflow-y-auto p-2 border border-zinc-800 rounded-xl">
                            ${['#000000', '#FFFFFF', '#4B5563', '#991B1B', '#1E3A8A', '#166534', '#EAB308', '#D946EF', '#F97316', '#06B6D4', '#8B5CF6', '#EC4899', '#10B981', '#6366F1', '#F43F5E', '#71717A', '#3F3F46', '#27272A', '#52525B']
                                .map((color, i) => `
                                <div 
                                    onclick="window.updateSelection(this, 'active-color')" 
                                    data-color="${color}" 
                                    style="background-color: ${color}" 
                                    class="aspect-square rounded-md border border-zinc-700 cursor-pointer hover:scale-110 transition ${i === 0 ? 'active-color' : ''}">
                                </div>`).join('')}
                        </div>

                        <div class="grid grid-cols-4 gap-2">
                            ${['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'].map(size => `
                                <button onclick="window.updateSelection(this, 'active-size')" class="py-3 bg-black border border-zinc-800 rounded-xl text-[10px] font-bold hover:border-purple-500 transition ${size === 'L' ? 'active-size' : ''}">${size}</button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8">
                        <label class="text-[10px] font-black uppercase text-zinc-500 tracking-widest block mb-6">Design Content</label>
                        <div class="space-y-6">
                            <div>
                                <p class="text-[8px] text-zinc-400 uppercase font-bold mb-2">Front Content</p>
                                <input type="text" placeholder="ENTER FRONT TEXT..." class="w-full bg-black border border-zinc-800 p-4 rounded-xl text-xs font-mono outline-none focus:border-purple-500 transition mb-3">
                                <select id="font-front-t" class="w-full bg-zinc-800 border-none p-4 rounded-xl text-[10px] font-bold uppercase text-zinc-400">
                                    <option>Standard Bold</option>
                                    <option>Gothic Script</option>
                                    <option>Modern Sans</option>
                                </select>
                            </div>
                            
                            <div class="pt-4 border-t border-zinc-800">
                                <p class="text-[8px] text-zinc-400 uppercase font-bold mb-2">Rear Content (Text and/or Image)</p>
                                <input type="text" placeholder="ENTER REAR TEXT..." class="w-full bg-black border border-zinc-800 p-4 rounded-xl text-xs font-mono outline-none focus:border-purple-500 transition mb-3">
                                <select id="font-rear-t" class="w-full bg-zinc-800 border-none p-4 rounded-xl text-[10px] font-bold uppercase text-zinc-400">
                                    <option>Standard Bold</option>
                                    <option>Gothic Script</option>
                                    <option>Modern Sans</option>
                                </select>
                                <div class="w-full border-2 border-dashed border-zinc-800 rounded-xl p-6 text-center hover:border-purple-500/50 cursor-pointer transition group">
                                    <div class="text-xl mb-1 group-hover:scale-110 transition-transform">↑</div>
                                    <span class="text-[9px] text-zinc-600 uppercase font-bold">Upload Vector / PNG</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onclick="saveDesignToQueue('T-Shirt', { 
                            front: document.querySelector('input[placeholder*=\\'FRONT\\']')?.value || 'None',
                            frontFont: document.getElementById('font-front-t').value,
                            back: document.querySelector('input[placeholder*=\\'REAR\\']')?.value || 'None',
                            backFont: document.getElementById('font-rear-t').value,
                            color: document.querySelector('.active-color')?.dataset.color || '#000000',
                            size: document.querySelector('.active-size')?.innerText || 'L',
                            specs: '240GSM Organic'
                        })"
                        class="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all">
                        Finalize Studio Config
                    </button>

                </div>
            </div>
        </div>
    `;
}