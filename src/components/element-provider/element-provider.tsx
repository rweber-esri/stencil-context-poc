import { Component, Prop, Watch } from '@stencil/core';
import store from '../../store';

@Component({
  tag: 'element-provider',
})
export class ElementProvider {
  @Prop() element?: HTMLElement;

  @Watch('element')
  handleElementUpdated (element?: HTMLElement) {
    this.updateStore(this.scope, element, this.context);
  }

  @Prop() scope: string;

  @Watch('scope')
  handleScopeUpdated (scope?: string, prevScope?: string) {
    this.updateStore(prevScope);
    this.updateStore(scope, this.element, this.context)
  }

  @Prop() context?: any;

  @Watch('context')
  handleContextUpdated (context?: any) {
    this.updateStore(this.scope, this.element, context)
  }

  connectedCallback () {
    this.updateStore(this.scope, this.element, this.context);
  }

  componentWillLoad () {
    this.updateStore(this.scope, this.element, this.context);
  }

  disconnectedCallback () {
    this.updateStore(this.scope);
  }

  updateStore (scope: string, element?: HTMLElement, context?: any) {
    const getKey = prefix => [prefix, scope].join(':');
    store[getKey('element')] = element;
    store[getKey('context')] = context;
  }

}
