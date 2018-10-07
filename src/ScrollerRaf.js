import React, { PureComponent } from 'react';
// import { ListItem } from './ListItem';

const ITEM_HEIGHT = 48;
const WINDOW_HEIGHT = 400;
const BUFFER = ITEM_HEIGHT;
// const ITEMS_IN_WINDOW = Math.ceil(WINDOW_HEIGHT / ITEM_HEIGHT);
// const CONTAINER_HEIGHT = ITEMS_IN_WINDOW * ITEM_HEIGHT + BUFFER;

export class ScrollerRaf extends PureComponent {
  constructor() {
    super();

    this.scrollContainer = React.createRef();
    this.isInView = this.isInView.bind(this);
    this.rafLoop = this.rafLoop.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.setScrollPosition = this.setScrollPosition.bind(this);

    this.items = new Array(100).fill(true).map((_, i) => `Item ${i}`);

    this.state = {
      scrollTop: undefined,
      firstVisibleIndex: 0,
      indexesToRender: []
    };
  }

  isInView(index) {
    if (
      (index + 1) * ITEM_HEIGHT > this.state.scrollTop - BUFFER &&
      (index + 1) * ITEM_HEIGHT < this.state.scrollTop + WINDOW_HEIGHT + BUFFER
    ) {
      return true;
    }
  }

  getFirstVisibleIndex() {
    return Math.ceil(this.state.scrollTop / ITEM_HEIGHT);
  }

  prerenderCalc(scrollTop) {
    // const indexesToRender = [];

    // for (let i = this.state.firstVisibleIndex; i < ITEMS_IN_WINDOW; i++) {
    //   if (this.isInView(i)) {
    //     indexesToRender.push(i);
    //   }
    // }

    this.setState(() => ({
      firstVisibleIndex: this.getFirstVisibleIndex(),
      // indexesToRender,
      scrollTop
    }));
  }

  setScrollPosition() {
    const scrollTop = this.scrollContainer.current.scrollTop;

    if (scrollTop !== this.state.scrollTop) {
      this.prerenderCalc(scrollTop);
    }
  }

  onButtonClick() {
    this.scrollContainer.current.scrollTo({
      top: ITEM_HEIGHT * this.items.length - 400,
      behavior: 'smooth'
    });
  }

  renderItems() {
    const array = [];

    for (
      let i = this.state.firstVisibleIndex;
      i <= this.state.indexesToRender.length;
      i++
    ) {
      array.push(this.items[i]);
    }

    // console.log(array)

    // console.log(
    //   this.state.firstVisibleIndex,
    //   this.state.indexesToRender.length
    // this.items[this.state.firstVisibleIndex]
    // );
  }

  rafLoop() {
    this.setScrollPosition();
    return requestAnimationFrame(this.rafLoop);
  }

  componentDidMount() {
    this.rafLoop();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.firstVisibleIndex !== prevState.firstVisibleIndex) {
      // console.log(this.state.firstVisibleIndex);
    }
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
            {this.renderItems()}
            {/* </div> */}
          </div>
        </div>
        <a href="https://github.com/ivancuric/react-recycle">
          https://github.com/ivancuric/react-recycle
        </a>
        <div>
          <button onClick={this.onButtonClick}>Scroll</button>
        </div>
        <div>{this.state.firstVisibleIndex}</div>
      </div>
    );
  }
}
