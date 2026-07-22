export default class Fetcher {
  fetch(url: string, options?: any) {
    return fetch(url, options);
  }

  async fetchAndReturnArrayBuffer(url: string) {
    const downloadResponse = await this.fetch(url);
    const buffer = await downloadResponse.arrayBuffer();
    return {
      downloadResponse,
      buffer,
      contentType: downloadResponse?.headers?.get('Content-Type') || ''
    };
  }

  async fetchAndReturnJson<T = unknown>(
    url: string,
    options?: any
  ): Promise<T> {
    const response = await this.fetch(url, options);
    return response.json();
  }

  async fetchAndReturnText(url: string) {
    const response = await this.fetch(url);
    return response.text();
  }
}
