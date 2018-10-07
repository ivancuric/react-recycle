import React, { PureComponent } from 'react';

export class ListItem extends PureComponent {
  render() {
    return (
      <div
        className={this.props.index % 2 ? 'item odd' : 'item even'}
        style={{
          transform: `translateY(${this.props.height * this.props.index}px)`
        }}
        // style={{ top: this.props.height * this.props.index }}
      >
        List Item {this.props.index + 1}
      </div>
    );
  }
}
