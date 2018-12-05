import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {
  render() {
    return (
      <div id="control-panel">
        <div id="format-actions">
            <button className="format-action" type="button" onClick={() => this.props.editSelectedText('strong')}><b>B</b></button>
            <button className="format-action" type="button" onClick={() => this.props.editSelectedText('i')}><i>I</i></button>
            <button className="format-action" type="button" onClick={() => this.props.editSelectedText('u')}><u>U</u></button>
            <button className="format-action" type="button" onClick={() => this.props.handleGetSynonyms()}><span>Synonym</span></button>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
