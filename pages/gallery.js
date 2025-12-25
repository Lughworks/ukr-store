export function render() {
    // List your actual filenames here. 
    // If you have 10 images, ensure they are 1.png through 10.png
    const images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png']; 

    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative overflow-y-auto">
            <div class="flex justify-between items-center mb-16">
                <div>
                    <span class="text-[10px] text-zinc-500 font-black tracking-[0.5em] uppercase italic">Visual Log / Evidence</span>
                    <h1 class="heading-font text-4xl md:text-7xl font-black uppercase tracking-tighter mt-2">The Archive</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-8 py-4 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-black uppercase tracking-widest text-inherit">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto pb-24">
                ${images.map(imgName => `
                    <div class="break-inside-avoid group relative bg-zinc-900/20 border border-zinc-800 rounded-[2rem] overflow-hidden">
                        <img src="./images/gallery/${imgName}" 
                             onerror="this.style.display='none'; this.parentElement.innerHTML += '<div class=\'p-12 text-center text-[8px] text-zinc-700 uppercase font-black tracking-widest\'>Data Missing: ${imgName}</div>'" 
                             class="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                             alt="Gallery Data">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end pointer-events-none">
                            <span class="text-[8px] text-white/50 font-mono uppercase tracking-[0.4em]">Asset ID: ${imgName.split('.')[0]}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
