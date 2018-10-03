import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';

export class ScrollerEvent extends PureComponent {
  static get ITEM_HEIGHT() {
    return 48;
  }

  static get CONTAINER_HEIGHT() {
    return 400;
  }

  static get BUFFER() {
    return ScrollerEvent.ITEM_HEIGHT;
  }

  constructor() {
    super();
    this.scrollContainer = React.createRef();
    this.isInView = this.isInView.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.setScrollPosition = this.setScrollPosition.bind(this);

    this.items = new Array(10000).fill(true);

    this.state = {
      scrollTop: 0
    };
  }

  isInView(index) {
    if (
      (index + 1) * ScrollerEvent.ITEM_HEIGHT >
        this.state.scrollTop - ScrollerEvent.BUFFER &&
      (index + 1) * ScrollerEvent.ITEM_HEIGHT <
        this.state.scrollTop +
          ScrollerEvent.CONTAINER_HEIGHT +
          ScrollerEvent.BUFFER
    ) {
      return true;
    }
  }

  onScroll(event) {
    requestAnimationFrame(() => {
      this.setScrollPosition();
    });
  }

  onButtonClick() {
    this.scrollContainer.current.scrollTo({
      top: ScrollerEvent.ITEM_HEIGHT * this.items.length - 400,
      behavior: 'smooth'
    });
  }

  setScrollPosition() {
    const scrollTop = this.scrollContainer.current.scrollTop;

    if (scrollTop !== this.state.scrollTop) {
      this.setState(() => ({
        scrollTop: scrollTop
      }));
    }
  }

  render() {
    return (
      <div>
        <div
          className="container"
          ref={this.scrollContainer}
          onScroll={this.onScroll}
        >
          <div
            className="itemWrapper"
            style={{ height: ScrollerEvent.ITEM_HEIGHT * this.items.length }}
          >
            {this.items.map((_, index) => {
              if (this.isInView(index)) {
                return (
                  <ListItem
                    key={index}
                    index={index}
                    height={ScrollerEvent.ITEM_HEIGHT}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
        <a href="https://github.com/ivancuric/react-recycle">
          https://github.com/ivancuric/react-recycle
        </a>
        <div>
          <button onClick={this.onButtonClick}>Scroll</button>
        </div>
      </div>
    );
  }
}
