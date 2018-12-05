import React, { Component } from 'react';
import './FileZone.css';

class FileZone extends Component {

  constructor(props) {
    super(props);
    this.textRef = React.createRef();
  }

  componentDidMount() {
    const targetNode = this.textRef.current;
    const config = { childList: true, subtree: true };
    const callback = (mutationsList) => {
      for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          this.props.onChange(this.textRef.current.innerHTML);
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  }

  render() {
    return (
      <div id="file-zone">
        <div id="file">
          <p ref={this.textRef} onDoubleClick={this.editSelectedText} dangerouslySetInnerHTML={{ __html: this.props.text}} />
        </div>
      </div>
    );
  }
}

export default FileZone;
