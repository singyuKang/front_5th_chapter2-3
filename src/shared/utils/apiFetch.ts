const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api"

export const apiFetch = async (endpoint: string, options = {}) => {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  const response = await fetch(url, options)

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error")
    throw new Error(`API error (${response.status}): ${errorText}`)
  }

  return response.json()
}
