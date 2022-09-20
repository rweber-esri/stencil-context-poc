import { get } from 'lodash';
import store from '../store';

interface IElementByIdOptions {
  id: string | (() => string)
}

export default function ElementByIdFactory (
  options: IElementByIdOptions
): PropertyDecorator {
  return function ElementById (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get () {
        // compute the id
        let id: string;
        if (typeof options.id === 'string') {
          id = get(this, options.id) ?? options.id;
        } else {
          id = options.id.call(this);
        }
        // obtain the element reference
        return store[`element:${id}`];
      }
    });
  };
}