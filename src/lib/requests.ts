import api from "./api";

export async function getAssets() {
    try {
        const response = await api.get('/assets');

        return response.data.data;
    } catch (error) {
        ;
    }
    return [];
}