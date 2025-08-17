import { useEffect, useState } from 'preact/hooks'

export interface UseFetchResult<T> {
  error?: any
  data?: T
  loading: boolean
}

export const useFetch = <T>(url: string | URL, init?: RequestInit): UseFetchResult<T> => {
  const [error, setError] = useState<any>()
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch(url, init)
        if (!res.ok) {
          throw new Error(`[${res.status}]: fetch failed! ${res.statusText}`)
        }
        setData(await res.json())
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [url])
  // return state
  return { error, data, loading }
}
