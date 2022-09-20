import { Component, Host, h, Element, Method, State } from '@stencil/core';
import { IFeature, IMapContext } from '../../types';

@Component({
  tag: 'map-widget',
  shadow: true,
})
export class MapWidget {
  @Element() element: HTMLMapWidgetElement;

  @State() features: IFeature[] = [];

  constructor () {
    this.handleRemoveFeature = this.handleRemoveFeature.bind(this);
  }

  @Method()
  async addFeature (feature: IFeature) {
    this.features = [feature, ...this.features];
  }

  handleRemoveFeature (evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    const { id } = (evt.target as HTMLElement).dataset;
    this.features = this.features.filter(feature => feature.id !== id);
  }

  get context (): IMapContext {
    const { features } = this;
    const numFeatures = features.length;
    return { numFeatures };
  }

  render() {
    const { features, handleRemoveFeature } = this;
    return (
      <Host>
        <element-provider
          scope={this.element.getAttribute('id')}
          element={this.element}
          context={this.context}
        />
        Map:
        <br />
        Features:
        <ul>
          {features.map(({ id }) => (
            <li key={id}>
              {id}
              <a
                href="#"
                onClick={handleRemoveFeature}
                data-id={id}
              >
                Remove
              </a>
            </li>
          ))}
        </ul>
        <slot></slot>
      </Host>
    );
  }

}
