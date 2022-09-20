import { Component, Host, h, Fragment, Element, Prop } from '@stencil/core';
import ElementById from '../../decorators/element-by-id';
import ElementContextById from '../../decorators/element-context-by-id';
import { IMapContext } from '../../types';

@Component({
  tag: 'discussions-widget',
  shadow: true,
})
export class DiscussionsWidget {
  @Element() element: HTMLDiscussionsWidgetElement;

  @Prop() mapId?: string;

  // Automatically gets a reference to map-widget[id=<value_of_mapId>]
  @ElementById({
    id () {
      return this.mapId;
    }
  }) mapElement?: HTMLMapWidgetElement;

  // Automatically gets a reference to any shared context from map-widget[id=<value_of_mapId>]
  @ElementContextById({
    id () {
      return this.mapId;
    }
  }) mapContext?: IMapContext;

  constructor () {
    this.handleAddFeature = this.handleAddFeature.bind(this);
  }

  async handleAddFeature (evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    await this.mapElement.addFeature({ id: Date.now().toString() });
  }

  render () {
    const { mapContext } = this;
    return (
      <Host>
        Discussions:
        <br />
        {mapContext
          ? (
            <Fragment>
              Num Map Features: {mapContext.numFeatures}
              <br />
              <button
                type="button"
                onClick={this.handleAddFeature}
              >
                Add feature
              </button>
            </Fragment>
          )
          : (
            <p>No map</p>
          )}
      </Host>
    );
  }

}
