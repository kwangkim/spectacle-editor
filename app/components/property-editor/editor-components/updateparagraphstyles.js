import React, { Component } from "react";
import styles from "./updateparagraphstyles.css";
import { pick } from "lodash";

export default class UpdateParagraphStyles extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  static propTypes = {
    currentElement: React.PropTypes.object,
    handleParagraphStyle: React.PropTypes.func
  }

  handleClick = () => {
    const { currentElement } = this.context.store;

    this.context.store.updateParagraphStyles(
      this.props.currentElement.props.paragraphStyle,
      currentElement.props.style
    );
  }

  render() {
    const { currentElement } = this.props;
    const { paragraphStyles, currentElement: storeElement } = this.context.store;

    if (!currentElement || !storeElement) {
      return null;
    }

    const filteredStyles = pick(
      storeElement.props.style,
      Object.keys(paragraphStyles[currentElement.props.paragraphStyle])
    );

    const stylesLength = Object.keys(filteredStyles).length;

    return (
      <div
        onClick={stylesLength && this.handleClick}
        className={
          `${styles.updateHeading}
           ${(stylesLength ? styles.active : "")}`
        }
      >
        Update {currentElement.props.paragraphStyle} Style
      </div>
    );
  }
}
