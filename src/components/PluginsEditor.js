import React from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil
} from 'draft-js';


class RichUtilsEditor extends React.Component {
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

  KeyBindingFn = (e: SyntheticKeyboardEvent) => {
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "h") {
  		return "highlight";
  	}
    return getDefaultKeyBinding(e);
  }

  handleKeyCommand = (command) => {
    console.log(command);
    if (command === "highlight") {
      const newState = RichUtils.toggleInlineStyle(
        this.state.editorState,
        "HIGHLIGHT"
      )
      if (newState) {
        this.onChange(newState);
        return 'handled';
      }
    }
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
    const styleMap = {
      HIGHLIGHT: {
        background: "#fffe0d"
      }
    };

    return (
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
        <button onClick={() => { this.onClick("STRIKETHROUGH")}}>
          <span style={{textDecoration: 'line-through',}}>abc</span>
        </button>
        <button onClick={() => { this.onClick("HIGHLIGHT")}}>
          <span >Heighlight</span>
        </button>
        <div className="editors">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            keyBindingFn={this.KeyBindingFn}
            customStyleMap={styleMap}
          />
        </div>
      </div>
    )
  }
}

export default RichUtilsEditor
