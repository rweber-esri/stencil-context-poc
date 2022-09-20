import { get } from 'lodash';
import store from '../store';

interface IElementContextByIdOptions {
  id: string | (() => string)
}

export default function ElementContextByIdFactory (
  options: IElementContextByIdOptions
): PropertyDecorator {
  return function ElementContextById (target: any, propertyKey: string) {
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
        return store[`context:${id}`];
      }
    });
  };
}