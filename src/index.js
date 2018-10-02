import './styles.css';

import React, { PureComponent, Component } from 'react';
import ReactDOM from 'react-dom';

class ListItem extends PureComponent {
  render() {
    return (
      <div
        className={this.props.index % 2 ? 'item odd' : 'item even'}
        // style={{ transform: `translateY(${Scroller.ITEM_HEIGHT * this.props.index}px)` }}
        style={{ top: Scroller.ITEM_HEIGHT * this.props.index }}
      >
        List Item {this.props.index + 1}
      </div>
    );
  }
}

class Scroller extends Component {
  static get ITEM_HEIGHT() {
    return 48;
  }

  static get CONTAINER_HEIGHT() {
    return 400;
  }

  static get BUFFER() {
    return Scroller.ITEM_HEIGHT;
  }

  constructor() {
    super();
    this.scrollContainer = React.createRef();
    this.isInView = this.isInView.bind(this);
    this.rafLoop = this.rafLoop.bind(this);
    this.setScrollPosition = this.setScrollPosition.bind(this);

    this.items = new Array(1000).fill(true);

    this.state = {
      scrollTop: 0
    };
  }

  isInView(index) {
    if (
      (index + 1) * Scroller.ITEM_HEIGHT >
        this.state.scrollTop - Scroller.BUFFER &&
      (index + 1) * Scroller.ITEM_HEIGHT <
        this.state.scrollTop + Scroller.CONTAINER_HEIGHT + Scroller.BUFFER
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
            {this.items.map((_, index) => {
              if (this.isInView(index)) {
                return <ListItem key={index} index={index} />;
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
