import './styles.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Scroller extends Component {
  static get ITEM_HEIGHT() {
    return 48;
  }

  static get CONTAINER_HEIGHT() {
    return 400;
  }

  static get BUFFER() {
    return Scroller.ITEM_HEIGHT * 2;
  }

  constructor() {
    super();
    this.scrollContainer = React.createRef();
    this.isInView = this.isInView.bind(this);
    this.rafLoop = this.rafLoop.bind(this);
    this.setScrollPosition = this.setScrollPosition.bind(this);

    this.items = new Array(10000).fill(1);

    this.state = {
      lastScroll: 0
    };
  }

  isInView(index) {
    if (
      (index + 1) * Scroller.ITEM_HEIGHT >
        this.state.lastScroll - Scroller.BUFFER &&
      (index + 1) * Scroller.ITEM_HEIGHT <
        this.state.lastScroll + Scroller.CONTAINER_HEIGHT + Scroller.BUFFER
    ) {
      return true;
    }
  }

  setScrollPosition() {
    const scrollTop = this.scrollContainer.current.scrollTop;

    if (scrollTop !== this.state.lastScroll) {
      this.setState(() => ({
        lastScroll: scrollTop
      }));
    }
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
            style={{ height: Scroller.ITEM_HEIGHT * this.items.length }}
          >
            {this.items.map((item, index) => {
              if (this.isInView(index)) {
                return (
                  <div
                    className={index % 2 ? 'item odd' : 'item even'}
                    key={index}
                    style={{ top: Scroller.ITEM_HEIGHT * index }}
                  >
                    List Item {index + 1}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <a href="https://github.com/ivancuric/react-recycle">
          https://github.com/ivancuric/react-recycle
        </a>
      </div>
    );
  }
}

ReactDOM.render(<Scroller />, document.getElementById('root'));
