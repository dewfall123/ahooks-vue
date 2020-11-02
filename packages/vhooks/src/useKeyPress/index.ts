import { onMounted, onUnmounted } from 'vue-demi';
import { getTargetElement } from '../utils/dom';
import {
  EventHandler,
  genKeyFormater,
  keyEvent,
  KeyFilter,
  KeyPredicate,
  noop,
  Target,
} from './constants';

export type EventOption = {
  events?: Array<keyEvent>;
  target?: Target;
};

const defaultEvents: Array<keyEvent> = ['keydown'];

export function useKeyPress(
  keyFilter: KeyFilter,
  eventHandler: EventHandler = noop,
  option: EventOption = {},
) {
  const { events = defaultEvents, target } = option;

  const isKeyEvent: KeyPredicate = genKeyFormater(keyFilter);

  onMounted(() => {
    const handlers = [] as ((event: KeyboardEvent) => any)[];
    const el = getTargetElement(target, window)!;
    for (const eventName of events) {
      const handler = (event: KeyboardEvent) => {
        if (isKeyEvent(event)) {
          return eventHandler(event);
        }
      };
      el.addEventListener(eventName, handler);
    }

    onUnmounted(() => {
      for (const eventName of events) {
        const handler = handlers.shift()!;
        el.removeEventListener(eventName, handler);
      }
    });
  });
}

export default useKeyPress;
