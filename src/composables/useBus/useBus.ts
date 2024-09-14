
export interface UseBusInterface {
  on(type: string, payload: (event: SnackbarEvent) => void): void,
  emit<T extends keyof EventBusTypes>(type: T, event: EventBusTypes[T]): void
}

export declare type SnackbarEvent = {
  body: string,
  status?: number,
  icon?: string
}

export declare type EventBusTypes = {
  'snackbar:open': SnackbarEvent,
  'reset': {},
}