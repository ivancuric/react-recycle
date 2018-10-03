import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';

export class ScrollerRaf extends PureComponent {
  static get ITEM_HEIGHT() {
    return 48;
  }

  static get CONTAINER_HEIGHT() {
    return 400;
  }

  static get BUFFER() {
    return ScrollerRaf.ITEM_HEIGHT;
  }

  constructor() {
    super();
    this.scrollContainer = React.createRef();
    this.isInView = this.isInView.bind(this);
    this.rafLoop = this.rafLoop.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.setScrollPosition = this.setScrollPosition.bind(this);

    this.items = new Array(10000).fill(true);

    this.state = {
      scrollTop: 0
    };
  }

  isInView(index) {
    if (
      (index + 1) * ScrollerRaf.ITEM_HEIGHT >
        this.state.scrollTop - ScrollerRaf.BUFFER &&
      (index + 1) * ScrollerRaf.ITEM_HEIGHT <
        this.state.scrollTop + ScrollerRaf.CONTAINER_HEIGHT + ScrollerRaf.BUFFER
    ) {
      return true;
    }
  }

  setScrollPosition() {
    const scrollTop = this.scrollContainer.current.scrollTop;

    if (scrollTop !== this.state.scrollTop) {
      this.setState(() => ({
        scrollTop: scrollTop
      }));
    }
  }

  onButtonClick() {
    this.scrollContainer.current.scrollTo({
      top: ScrollerRaf.ITEM_HEIGHT * this.items.length - 400,
      behavior: 'smooth'
    });
  }

  rafLoop() {
    this.setScrollPosition();
    return requestAnimationFrame(this.rafLoop);
  }

  componentDidMount() {
    this.rafLoop();
  }

  render() {
    return (
      <div>
        <div className="container" ref={this.scrollContainer}>
          <div
            className="itemWrapper"
            style={{ height: ScrollerRaf.ITEM_HEIGHT * this.items.length }}
          >
            {this.items.map((_, index) => {
              if (this.isInView(index)) {
                return (
                  <ListItem
                    key={index}
                    index={index}
                    height={ScrollerRaf.ITEM_HEIGHT}
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
