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
    return result
  } catch(e) {
    console.error(e)
  }
}

export async function login(email:string, password:string) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const result = await response.json()
    return result
  } catch(e) {
    console.error(e)
  }
}

export async function signUp(email:string, password:string) {
  try {
    const response = await fetch(`${baseUrl}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    const result = await response.json()
    return result
  } catch(e) {
    console.error(e)
  }
}