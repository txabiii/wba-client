const baseUrl = 'http://127.0.0.1:5000'

export async function enterEmail(email:string) {
  try {
    const response = await fetch(`${baseUrl}/enter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    const result = await response.json()
    console.log(result)
    return result
  } catch(e) {
    console.error(e)
  }
}