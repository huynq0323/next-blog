import useSWR from 'swr'
import qs from 'query-string'

type UseGetDataParams = Record<string, any>

type UseGetDataOptions<T> = {
  key?: string
  fetcher: (params?: UseGetDataParams) => Promise<T>
  params?: UseGetDataParams
  enabled?: boolean
  initialData?: T
}

export const useGetData = <T = unknown>({
  key = 'data',
  fetcher,
  params = {},
  enabled = true,
  initialData,
}: UseGetDataOptions<T>) => {
  const query = qs.stringify(params)
  const swrKey = enabled ? [key, query] : null

  const { data, error, isLoading, mutate } = useSWR<T>(swrKey, () => fetcher(params), {
    fallbackData: initialData,
  })

  return {
    data,
    isLoading,
    error,
    mutate,
    refetch: mutate,
  }
}
