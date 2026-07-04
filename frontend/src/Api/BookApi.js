const API = "http://localhost:8082/api/books";

export async function getRelatedBooks(id){

    const res = await fetch(`${API}/${id}/related`);

    return await res.json();

}