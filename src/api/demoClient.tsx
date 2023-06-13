const baseUrl = 'http://127.0.0.1:5000'
// const baseUrl = 'https://wba-server.vercel.app'

interface DemoResponse {
  status: string;
  content: any;
}

export default async function getDemoObject(): Promise<DemoResponse> {
  try {
    const response = await fetch(`${baseUrl}/demo`);
    const data = await response.json();
    return data as DemoResponse;
  } catch (error: any) {
    console.error(error);
    return {
      status: 'fail',
      content: error.message,
    } as DemoResponse;
  }
}