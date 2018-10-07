import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';

const ITEM_HEIGHT = 48;
const WINDOW_HEIGHT = 400;
const BUFFER = ITEM_HEIGHT;
const ITEMS_IN_WINDOW = Math.ceil(WINDOW_HEIGHT / ITEM_HEIGHT);
// const CONTAINER_HEIGHT = ITEMS_IN_WINDOW * ITEM_HEIGHT + BUFFER;

export class ScrollerRaf extends PureComponent {
  constructor() {
    super();

    this.scrollContainer = React.createRef();
    // this.isInView = this.isInView.bind(this);
    this.rafLoop = this.rafLoop.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.getScrollPosition = this.getScrollPosition.bind(this);

    this.items = new Array(100).fill(true).map((_, i) => `Item ${i}`);

    this.state = {
      scrollTop: undefined,
      firstVisibleIndex: undefined,
      prerenderedItems: [],
      indexesToRender: []
    };
  }

  // isInView(index) {
  //   if (
  //     (index + 1) * ITEM_HEIGHT > this.state.scrollTop - BUFFER &&
  //     (index + 1) * ITEM_HEIGHT < this.state.scrollTop + WINDOW_HEIGHT + BUFFER
  //   ) {
  //     return true;
  //   }
  // }

  getIndexesToRender() {
    const indexesToRender = [];

    for (
      let i = this.state.firstVisibleIndex;
      i <= this.state.firstVisibleIndex + ITEMS_IN_WINDOW;
      i++
    ) {
      indexesToRender.push(i);
    }

    this.setState(() => ({
      indexesToRender
    }));
  }

  getFirstVisibleIndex() {
    const firstVisibleIndex = Math.floor(this.state.scrollTop / ITEM_HEIGHT);

    this.setState(
      () => ({
        firstVisibleIndex
      }),
      this.getIndexesToRender
    );
  }

  getScrollPosition() {
    const scrollTop = this.scrollContainer.current.scrollTop;

    if (scrollTop !== this.state.scrollTop) {
      this.setState(() => ({ scrollTop }), this.getFirstVisibleIndex);
    }
  }

  onButtonClick() {
    this.scrollContainer.current.scrollTo({
      top: ITEM_HEIGHT * this.items.length - 400,
      behavior: 'smooth'
    });
  }

  prerenderItems() {
    const prerenderedItems = this.items.map((item, i) => (
      <ListItem key={i} index={i} />
    ));

    this.setState({
      prerenderedItems
    });
  }

  renderItems() {
    if (this.state.indexesToRender.length === 0) {
      return;
    }

    const renderedItems = this.state.indexesToRender.map(
      index => this.state.prerenderedItems[index]
    );

    // console.log(renderedItems);

    return renderedItems;
  }

  componentDidUpdate() {
    // console.log(this.state);
  }

  rafLoop() {
    this.getScrollPosition();
    return requestAnimationFrame(this.rafLoop);
  }

  componentDidMount() {
    this.prerenderItems();
    this.rafLoop();
  }

  render() {
    return (
      <div>
        <div className="scroll-window" ref={this.scrollContainer}>
          <div
            className="scroll-track"
            style={{ height: ITEM_HEIGHT * this.items.length }}
          >
            {/* <div
              className="visibleItems"
              style={{
                height: CONTAINER_HEIGHT,
                transform: `translateY(${this.state.firstVisibleIndex *
                  ITEM_HEIGHT}px)`
              }}
            > */}
            {/* {this.renderItems()} */}
            {/* </div> */}
          </div>
        </div>
        <a href="https://github.com/ivancuric/react-recycle">
          https://github.com/ivancuric/react-recycle
        </a>
        <div>
          <button onClick={this.onButtonClick}>Scroll</button>
        </div>
        <div>
          {`${this.state.firstVisibleIndex} — ${this.state.firstVisibleIndex +
            ITEMS_IN_WINDOW}`}
        </div>
      </div>
    );
  }
}
