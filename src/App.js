import React, {Component} from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import { fetchText, fetchSynonyms, setText, toggleModal } from './store/actions';
import { RadioGroup, Radio } from 'react-radio-group';

Modal.setAppElement('#root');

class App extends Component {

  componentDidMount() {
    if (!this.props.text) {
      this.props.fetchText();
    }
  }

  editSelectedText = (tag, replacement) => {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const textNode = document.createTextNode(replacement || selection.toString());
      const element = document.createElement(tag);
      element.appendChild(textNode);
      range.deleteContents();
      range.insertNode(element);
    }
  };

  handleGetSynonyms = () => {
    const selection = window.getSelection();
    const selectionText = selection.toString();
    if (!selectionText) {
      return;
    }
    this.props.toggleModal();
    this.props.fetchSynonyms(selection.toString());
  };

  render() {
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel
            editSelectedText={this.editSelectedText}
            handleGetSynonyms={this.handleGetSynonyms}
          />
          <FileZone
            text={this.props.text}
            onChange={this.props.setText}
          />
        </main>
        <Modal
          isOpen={this.props.isModalOpen}
          contentLabel="Example Modal"
          onRequestClose={this.props.toggleModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(108, 122, 137, 1)',
              opacity: '0.8'
            },
            content: {
              color: 'black',
              width: '300px',
              height: '300px',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        >
          <RadioGroup
            name="synonyms"
            selectedValue={null}
            onChange={selected => {
              this.props.toggleModal();
              this.editSelectedText('span', selected)
            }}
          >
            {
              this.props.synonyms.map(syn =>
                <div key={syn.word}><Radio value={syn.word} />{syn.word}</div>)
            }
          </RadioGroup>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  text: state.text,
  isModalOpen: state.isModalOpen,
  selectedText: state.selectedText,
  synonyms: state.synonymsMap[state.selectedText] || []
});

const mapDispatchToProps = dispatch => ({
  fetchText: () => dispatch(fetchText()),
  fetchSynonyms: (selection) => dispatch(fetchSynonyms(selection)),
  setText: (text) => dispatch(setText(text)),
  toggleModal: () => dispatch(toggleModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
