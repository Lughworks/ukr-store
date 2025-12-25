export function render() {
    const personnel = [
        { 
            id: 'ARCH-01', 
            role: 'Lead Architect', 
            alias: 'OVERSEER',
            bio: 'Specializing in technical outerwear and modular systems. Oversees the integration of Division 01 and 02 hardware.', 
            specs: { clearance: 'LEVEL_05', sector: 'LONDON_CORE', sync: '98%' },
            tags: ['SYSTEMS_DESIGN', 'TEXTILE_TECH'] 
        },
        { 
            id: 'VIS-02', 
            role: 'Visual Director', 
            alias: 'GHOST_02',
            bio: 'Responsible for the visual language and digital presence of the collective. Managing the Archive and Log operations.', 
            specs: { clearance: 'LEVEL_04', sector: 'NEON_DISTRICT', sync: '92%' },
            tags: ['DIGITAL_ARTS', 'ARCHIVE_MGMT'] 
        }
    ];

    return `
        <div class="min-h-screen bg-black text-white p-4 md:p-12 relative overflow-y-auto">
            <div class="relative mb-20 px-4">
                <div class="absolute top-0 left-0 w-full h-[1px] bg-purple-500/30 animate-pulse"></div>
                <div class="flex justify-between items-end">
                    <div>
                        <span class="text-[10px] text-purple-500 font-black tracking-[0.6em] uppercase italic">Personnel_Dossier / Unindexed</span>
                        <h1 class="heading-font text-5xl md:text-8xl font-black uppercase tracking-tighter mt-4">The_Collective</h1>
                    </div>
                    <button onclick="window.closePage()" class="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all mb-2">
                        <span class="text-[10px] font-black uppercase tracking-widest">Exit_Archive</span>
                    </button>
                </div>
            </div>

            <div class="max-w-6xl mx-auto space-y-6 pb-24 px-4">
                ${personnel.map(member => `
                    <div class="group bg-zinc-900/20 border border-zinc-800 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-purple-500/50">
                        <div onclick="this.parentElement.classList.toggle('max-h-[1000px]'); this.parentElement.classList.toggle('max-h-32')" 
                             class="p-10 cursor-pointer flex justify-between items-center relative overflow-hidden">
                            
                            <div class="flex items-center gap-8 relative z-10">
                                <div class="text-4xl font-black italic text-zinc-800 group-hover:text-purple-500/20 transition-colors tracking-tighter">
                                    ${member.id.split('-')[1]}
                                </div>
                                <div>
                                    <h4 class="text-2xl font-black uppercase tracking-tighter text-white group-hover:translate-x-2 transition-transform">${member.role}</h4>
                                    <span class="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.4em]">${member.alias}</span>
                                </div>
                            </div>

                            <div class="flex items-center gap-6">
                                <div class="hidden md:flex flex-col items-end">
                                    <span class="text-[7px] text-zinc-600 font-black uppercase tracking-widest">Sync_Status</span>
                                    <span class="text-xs font-mono text-purple-500">${member.specs.sync}</span>
                                </div>
                                <div class="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white transition-all">
                                    <span class="text-xs transition-transform duration-500 group-[.max-h-\[1000px\]]:rotate-180">↓</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="px-10 pb-12 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-zinc-800/50">
                            
                            <div class="lg:col-span-4">
                                <div class="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
                                    <div class="absolute inset-0 blueprint-grid opacity-10"></div>
                                    <div class="aspect-[3/4] bg-zinc-800/30 rounded-xl mb-6 flex items-center justify-center border border-zinc-700/50 relative group/photo">
                                        <span class="text-[8px] text-zinc-600 font-black uppercase rotate-90 absolute right-4">No_Visual_On_File</span>
                                        <div class="w-20 h-20 border-2 border-purple-500/20 rounded-full flex items-center justify-center">
                                            <span class="text-2xl font-black text-purple-500/40 italic">UC</span>
                                        </div>
                                    </div>
                                    <div class="space-y-3">
                                        <div class="flex justify-between border-b border-zinc-800 pb-2">
                                            <span class="text-[8px] text-zinc-500 font-black uppercase">Clearance</span>
                                            <span class="text-[8px] text-white font-mono">${member.specs.clearance}</span>
                                        </div>
                                        <div class="flex justify-between border-b border-zinc-800 pb-2">
                                            <span class="text-[8px] text-zinc-500 font-black uppercase">Sector</span>
                                            <span class="text-[8px] text-white font-mono">${member.specs.sector}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="lg:col-span-8 flex flex-col justify-between py-2">
                                <div>
                                    <h5 class="text-[10px] text-purple-500 font-black uppercase tracking-[0.4em] mb-6">// Operational_Summary</h5>
                                    <p class="text-lg text-zinc-400 font-medium leading-relaxed uppercase tracking-tight">
                                        ${member.bio}
                                    </p>
                                </div>
                                
                                <div class="mt-8 space-y-6">
                                    <div class="flex flex-wrap gap-2">
                                        ${member.tags.map(tag => `
                                            <span class="text-[9px] px-4 py-2 bg-black border border-zinc-800 rounded-full text-zinc-400 font-black tracking-widest hover:border-purple-500 hover:text-white transition-colors cursor-default">${tag}</span>
                                        `).join('')}
                                    </div>
                                    <div class="pt-6 border-t border-zinc-800 flex gap-12">
                                        <div>
                                            <span class="text-[7px] text-zinc-600 font-black uppercase block mb-1">Assigned_Projects</span>
                                            <span class="text-[10px] text-white font-bold uppercase tracking-widest">ur_ud_CORE</span>
                                        </div>
                                        <div>
                                            <span class="text-[7px] text-zinc-600 font-black uppercase block mb-1">Signal_Strength</span>
                                            <span class="text-[10px] text-green-500 font-bold uppercase tracking-widest animate-pulse">Stable</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}