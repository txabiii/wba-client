interface DemoResponse {
  status: string;
  content: any;
}

export default async function getDemoObject(): Promise<DemoResponse> {
  try {
    const response = await fetch('http://127.0.0.1:5000/demo');
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