import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';

const ITEM_HEIGHT = 48;
const CONTAINER_HEIGHT = 400;
const BUFFER = ITEM_HEIGHT;
const ITEMS_IN_WINDOW = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

export class ScrollerEvent extends PureComponent {
  constructor() {
    super();
    this.scrollContainer = React.createRef();
    this.isInView = this.isInView.bind(this);
    this.onScroll = this.onScroll.bind(this);
    // this.rafLoop = this.rafLoop.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.setScrollPosition = this.setScrollPosition.bind(this);

    this.items = new Array(10000).fill(true);

    this.state = {
      scrollTop: undefined
    };
  }

  isInView(index) {
    if (
      (index + 1) * ITEM_HEIGHT > this.state.scrollTop - BUFFER &&
      (index + 1) * ITEM_HEIGHT <
        this.state.scrollTop + CONTAINER_HEIGHT + BUFFER
    ) {
      return true;
    }
  }

  componentDidMount() {
    this.setScrollPosition();
    this.prerenderItems();
    // this.rafLoop();
  }

  onScroll() {
    requestAnimationFrame(() => {
      this.setScrollPosition();
    });
  }

  prerenderItems() {
    const renderedItems = this.items.map((_, index) => (
      <ListItem key={index} index={index} height={ITEM_HEIGHT} />
    ));

    this.setState({
      renderedItems
    });
  }

  // rafLoop() {
  //   this.setScrollPosition();
  //   return requestAnimationFrame(this.rafLoop);
  // }

  smartRender() {
    const itemsToRender = [];
    const firstVisibleIndex = Math.floor(this.state.scrollTop / ITEM_HEIGHT);

    if (this.state.scrollTop === undefined) {
      return null;
    }

    for (
      let i = firstVisibleIndex;
      i < firstVisibleIndex + ITEMS_IN_WINDOW;
      i++
    ) {
      itemsToRender.push(this.state.renderedItems[i]);
    }

    return itemsToRender;
  }

  dumbRender() {
    return this.items.map((_, index) => {
      if (this.isInView(index)) {
        return <ListItem key={index} index={index} height={ITEM_HEIGHT} />;
      }
      return null;
    });
  }

  onButtonClick() {
    this.scrollContainer.current.scrollTo({
      top: ITEM_HEIGHT * this.items.length - 400,
      behavior: 'smooth'
    });
  }

  setScrollPosition() {
    const scrollTop = this.scrollContainer.current.scrollTop;

    if (scrollTop !== this.state.scrollTop) {
      this.setState({
        scrollTop
      });
    }
  }

  render() {
    return (
      <div>
        <div
          className="scroll-window"
          ref={this.scrollContainer}
          onScroll={this.onScroll}
        >
          <div
            className="scroll-track"
            style={{ height: ITEM_HEIGHT * this.items.length }}
          >
            {this.smartRender()}
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
