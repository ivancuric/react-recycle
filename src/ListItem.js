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
        <span>List</span> <span>Item</span> <span>{this.props.index + 1}</span>
      </div>
    );
  }
}
