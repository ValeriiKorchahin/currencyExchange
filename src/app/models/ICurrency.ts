export interface ICurrency {
  query: {
    from: string,
    to: string,
  },
  info: {
    rate: number
  }
}
