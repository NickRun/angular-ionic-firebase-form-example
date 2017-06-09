export interface IRequest {
  receiverEmail?: string
  receiverName?: string
  sentDate?: string
  children?: Array<string>
  exchangeType: string
  pickup?: {
    date: string
    time: string
    location: string
  }
  dropoff?: {
    date: string
    time: string
    location: string
  }
  occurance?: string
  status?: string
}