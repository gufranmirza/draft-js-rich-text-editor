import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js';

class RichButtonsEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onClick = (style) => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, style)
    );
  }

  render() {
    return(
      <div className="editorContainer">
        <button onClick={() => { this.onClick("BOLD") }}>
          <b>B</b>
        </button>
        <button onClick={() => { this.onClick("ITALIC") }}>
          <em>I</em>
        </button>
        <button onClick={() => { this.onClick("UNDERLINE") }}>
          U
        </button>
        <button onClick={() => { this.onClick("CODE") }}>
          Code
        </button>
        <div className="editors">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange= { this.onChange }
          />
        </div>
      </div>
    )
  }
}

export default RichButtonsEditor
