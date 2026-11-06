export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS = {
    fabricantes: 'fabricantes/',
    colores: 'colores/',
    tipos_producto: 'tipos-producto/',
    arquitecturas: 'arquitecturas/',
    sockets: 'sockets/',
    chipsets_gpu: 'chipsets-gpu/',
}

async function list(path) {
    let page = 1;
    let all = []
    while (true) {
        const res = await fetch(`${API_URL}${path}?page=${page}`, { cache: "no-store" });
        if (!res.ok) throw new error(`La API respondió ${res.status} en ${path}`);
        const data = await res.json();
        if (Array.isArray(data)) return data;
        all = all.concat(data.results ?? []);
        if (!data.next) return all;
        page += 1;
    }
}

export const getFabricantes= () => list(ENDPOINTS.fabricantes)
export const getColores= () => list(ENDPOINTS.colores)
export const getTipos_producto= () => list(ENDPOINTS.tipos_producto)
export const getArquitecturas= () => list(ENDPOINTS.arquitecturas)
export const getSockets= () => list(ENDPOINTS.sockets)
export const getChipsets_gpu= () => list(ENDPOINTS.chipsets_gpu)