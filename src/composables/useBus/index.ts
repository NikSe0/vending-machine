import mitt from 'mitt'
import type { EventBusTypes, UseBusInterface } from '@/composables/useBus/useBus'

const emitter = mitt<EventBusTypes>()
export function useBus(): UseBusInterface {
  return {
    emit: emitter.emit,
    on: emitter.on
  }
}

export * from './useBus';
export default  useBus;


