export const api ="http://localhost:4200/api";

export async function fetchData(url){
     try {
         const response = await fetch(url);
         if (!response.ok) {
             throw new Error("error http");
         }
         return await response.json();
     } catch (error) {
         console.error("error", error);
     }
}
