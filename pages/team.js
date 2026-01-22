export function render() {
    const personnel = [
        { 
            id: 'TEST-01', 
            role: '', 
            alias: '',
            image: 'overseer.png', 
            bio: '', 
            specs: { clearance: '', sector: '', sync: '' },
            socials: [
                { icon: 'fa-brands fa-instagram', url: 'https://instagram.com/unknownempire_' },
                { icon: 'fa-brands fa-tiktok', url: '#' },
                { icon: 'fa-solid fa-envelope', url: 'mailto:contact@unknownempire.com' },
                { icon: 'fa-solid fa-globe', url: '#' }
            ]
        },
        { 
            id: 'TEST-02', 
            role: '', 
            alias: '',
            image: 'overseer.png', 
            bio: '', 
            specs: { clearance: '', sector: '', sync: '' },
            socials: [
                { icon: 'fa-brands fa-instagram', url: 'https://instagram.com/unknownempire_' },
                { icon: 'fa-brands fa-tiktok', url: '#' },
                { icon: 'fa-solid fa-envelope', url: 'mailto:contact@unknownempire.com' },
                { icon: 'fa-solid fa-globe', url: '#' }
            ]
        },
        { 
            id: 'TEST-03', 
            role: '', 
            alias: '',
            image: 'overseer.png', 
            bio: '', 
            specs: { clearance: '', sector: '', sync: '' },
            socials: [
                { icon: 'fa-brands fa-instagram', url: 'https://instagram.com/unknownempire_' },
                { icon: 'fa-brands fa-tiktok', url: '#' },
                { icon: 'fa-solid fa-envelope', url: 'mailto:contact@unknownempire.com' },
                { icon: 'fa-solid fa-globe', url: '#' }
            ]
        },
        { 
            id: 'TEST-04', 
            role: '', 
            alias: '',
            image: 'overseer.png', 
            bio: '', 
            specs: { clearance: '', sector: '', sync: '' },
            socials: [
                { icon: 'fa-brands fa-instagram', url: 'https://instagram.com/unknownempire_' },
                { icon: 'fa-brands fa-tiktok', url: '#' },
                { icon: 'fa-solid fa-envelope', url: 'mailto:contact@unknownempire.com' },
                { icon: 'fa-solid fa-globe', url: '#' }
            ]
        },
        { 
            id: 'TEST-05', 
            role: '', 
            alias: '',
            image: 'overseer.png', 
            bio: '', 
            specs: { clearance: '', sector: '', sync: '' },
            socials: [
                { icon: 'fa-brands fa-instagram', url: 'https://instagram.com/unknownempire_' },
                { icon: 'fa-brands fa-tiktok', url: '#' },
                { icon: 'fa-solid fa-envelope', url: 'mailto:contact@unknownempire.com' },
                { icon: 'fa-solid fa-globe', url: '#' }
            ]
        },
        { 
            id: 'TEST-06', 
            role: '', 
            alias: '',
            image: 'overseer.png', 
            bio: '', 
            specs: { clearance: '', sector: '', sync: '' },
            socials: [
                { icon: 'fa-brands fa-instagram', url: 'https://instagram.com/unknownempire_' },
                { icon: 'fa-brands fa-tiktok', url: '#' },
                { icon: 'fa-solid fa-envelope', url: 'mailto:contact@unknownempire.com' },
                { icon: 'fa-solid fa-globe', url: '#' }
            ]
        },
    ];

    return `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;500;700&display=swap" rel="stylesheet">

        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative overflow-y-auto font-['Rajdhani']">
            
            <div class="flex justify-between items-center mb-12 px-4">
                <div>
                    <span class="text-[10px] text-purple-500 font-bold tracking-[0.3em] uppercase italic">Intelligence / Personnel Archive</span>
                    <h1 class="heading-font text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2 leading-none">The Team</h1>
                </div>
                <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 hover:bg-white hover:text-black transition-all px-6 py-3 rounded-full border border-zinc-800">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
                    <span class="text-xl group-hover:rotate-90 transition-transform">×</span>
                </button>
            </div>

            <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 px-4">
                ${personnel.map(member => `
                    <div class="bg-zinc-900/10 border border-zinc-800 rounded-[2.5rem] relative overflow-hidden group min-h-[280px] flex flex-col justify-between">
                        <div class="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
                        
                        <div class="absolute top-0 right-0 w-3/4 h-full z-0 pointer-events-none">
                            <img src="../images/teams/${member.image}" 
                                 onerror="this.parentElement.style.opacity='0'"
                                 class="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-700"
                                 style="-webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 100%); mask-image: linear-gradient(to left, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 100%);">
                        </div>

                        <div class="p-8 relative z-10 h-full flex flex-col justify-between">
                            
                            <div>
                                <div class="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 class="text-xs font-black uppercase tracking-[0.4em] text-purple-500 italic leading-none">// Operative</h2>
                                        <h3 class="text-3xl font-black uppercase italic tracking-tighter mt-1">${member.role}</h3>
                                        <p class="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">${member.alias}</p>
                                    </div>
                                    <div class="flex gap-2">
                                        ${member.socials.map(soc => `
                                            <a href="${soc.url}" target="_blank" class="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-zinc-800 flex items-center justify-center text-xs hover:bg-white hover:text-black transition-all">
                                                <i class="${soc.icon}"></i>
                                            </a>
                                        `).join('')}
                                    </div>
                                </div>

                                <p class="text-[11px] text-zinc-400 font-medium leading-relaxed uppercase max-w-[65%]">
                                    ${member.bio}
                                </p>
                            </div>

                            <div class="flex justify-between items-end pt-6 border-t border-zinc-800/50 mt-8">
                                <div class="flex gap-8">
                                    <div>
                                        <span class="text-[7px] text-zinc-600 font-black uppercase block mb-1 tracking-widest">Sector_ID</span>
                                        <p class="text-[10px] font-bold text-white uppercase tracking-tighter">${member.specs.sector}</p>
                                    </div>
                                    <div>
                                        <span class="text-[7px] text-zinc-600 font-black uppercase block mb-1 tracking-widest">Sync_Rate</span>
                                        <p class="text-[10px] font-bold text-purple-500 uppercase tracking-tighter">${member.specs.sync}</p>
                                    </div>
                                </div>
                                <div class="bg-black/80 backdrop-blur-sm border border-white/5 px-3 py-1 rounded-full">
                                    <span class="text-[8px] text-zinc-500 font-black uppercase tracking-widest">${member.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="fixed bottom-0 left-0 w-full p-2 bg-black/90 backdrop-blur-md border-t border-zinc-900 flex justify-between px-6 z-50">
                <p class="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Operational_Uplink: Active</p>
                <p class="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Ref: UE_PERSONNEL_MANIFEST</p>
            </div>
        </div>
    `;
}