export function render() {
    const maxCapacity = 50; 
    const sequence = Array.from({ length: maxCapacity }, (_, i) => i + 1);

    return `
        <style>
            .gallery-viewport {
                font-family: 'Rajdhani', sans-serif;
                content-visibility: auto;
                contain-intrinsic-size: 1px 400px; 
            }

            .masonry-layout {
                column-gap: 1.5rem;
                display: block;
            }

            .asset-node {
                break-inside: avoid;
                margin-bottom: 1.5rem;
                border-radius: 2rem;
                background: #0a0a0a;
                border: 1px solid rgba(255, 255, 255, 0.05);
                position: relative;
                overflow: hidden;
                transform: translateZ(0);
                transition: border-color 0.3s ease;
            }

            .asset-node.corrupted {
                display: none !important;
            }

            .asset-node:hover {
                border-color: #9c3bf6;
                box-shadow: 0 0 30px rgba(156, 59, 246, 0.1);
            }

            .img-processor {
                width: 100%;
                height: auto;
                display: block;
                filter: grayscale(1);
                transition: filter 0.4s steps(4), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                image-rendering: -webkit-optimize-contrast;
            }

            .asset-node:hover .img-processor {
                filter: grayscale(0);
                transform: scale(1.03);
            }

            .skeleton-shimmer {
                position: absolute;
                inset: 0;
                background: linear-gradient(90deg, #050505 25%, #0f0f0f 50%, #050505 75%);
                background-size: 200% 100%;
                animation: shimmer 2s infinite linear;
            }

            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
        </style>

        <div class="gallery-viewport min-h-screen bg-black text-white p-4 md:p-12 relative overflow-y-auto">
            
            <div class="flex justify-between items-center mb-16 px-4">
                <div>
                    <span class="text-[10px] text-purple-500 font-black tracking-[0.5em] uppercase italic">Visual Log / Automated Archive</span>
                    <h1 class="heading-font text-4xl md:text-7xl font-black uppercase tracking-tighter mt-2 leading-none">The Archive</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-8 py-4 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-black uppercase tracking-widest">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="masonry-layout columns-1 md:columns-2 lg:columns-3 max-w-7xl mx-auto pb-24 px-4">
                ${sequence.map(id => `
                    <div class="asset-node group" id="node-${id}">
                        <div class="skeleton-shimmer"></div>
                        
                        <img src="./images/gallery/${id}.png" 
                             loading="lazy"
                             decoding="async" 
                             onload="this.previousElementSibling.style.display='none'"
                             onerror="document.getElementById('node-${id}').classList.add('corrupted')"
                             class="img-processor relative z-10" 
                             alt="Asset ${id}">
                        
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-end z-20 pointer-events-none">
                            <span class="text-[8px] text-purple-500 font-bold uppercase tracking-[0.4em]">Node_Sequence // ${id.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="fixed bottom-0 left-0 w-full p-2 bg-black/90 backdrop-blur-md border-t border-zinc-900 flex justify-between px-6 z-[100]">
                <p class="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Directory_Scan: Active</p>
                <p class="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Auto_Cull_Missing: Enabled</p>
            </div>
        </div>
    `;
}