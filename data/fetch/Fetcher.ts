export default class Fetcher {
  static async fetchData<T>(url: string, body?: any): Promise<T> {
    try {
      const data = await fetch(url, {
        method: 'GET',
        body: body ? JSON.stringify(body) : undefined,
      });
      return data.json() as Promise<T>;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}