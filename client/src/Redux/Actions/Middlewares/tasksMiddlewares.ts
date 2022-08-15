export const fetchTasks: any = async (url: string) => {
  const token: string = process.env.REACT_APP_TOKEN as string
  const response = await fetch(`${url}`, {
    method: 'get',
    headers: {
      Authorization: `Token ${token}`
    }
  })
  const res = await response.json()
  const { next, results } = res
  return { next, results }
}
