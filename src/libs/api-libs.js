export const getHitungData = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL);
    const data = await response.json();
    return data;
}

export const getNamaPaslon = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_NAMA_PASLON);
    const data = await response.json();
    return data;
}

export const getHasilWilayah = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_DATA_WILAYAH);
    const data = await response.json();
    return data;
}