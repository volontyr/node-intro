export async function myFetch(url: string): Promise<any> {
    let res = await fetch(url);
    return res.json()
}