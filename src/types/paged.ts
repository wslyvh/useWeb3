export interface PagedResult<T> {
  total: number
  currentPage: number
  items: Array<T>
}
