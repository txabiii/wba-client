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
    if (result.wba_access_token) {
      console.log('setting the token')
      localStorage.setItem('wba_access_token', result.wba_access_token)
    }
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
    if (result.wba_access_token) {
      localStorage.setItem('wba_access_token', result.wba_access_token)
    }
    return result
  } catch(e) {
    console.error(e)
  }
}

export async function checkVerification() {
  try {
    const token = localStorage.getItem('wba_access_token');
    const response = await fetch(`${baseUrl}/verify/check`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json()
    return result
  } catch(e) {
    console.error(e)
  }
}

export async function sendEmail() {
  try {
    const token = localStorage.getItem('wba_access_token');
    const response = await fetch(`${baseUrl}/verify/send`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json()
    return result
  } catch(e) {
    console.error(e)
  }
}

export async function verifyCode(code: number) {
  try {
    const token = localStorage.getItem('wba_access_token');
    const response = await fetch(`${baseUrl}/verify/token`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }, 
      body: JSON.stringify({
        input_token: code.toString()
      })
    })
    const result = await response.json()
    return result
  } catch(e) {
    console.error(e)
  }
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('wba_access_token')
  return !!token
}

export function logOut() {
  localStorage.removeItem('wba_access_token')
}