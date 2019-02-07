import React from "react";
import { EditorState, KeyBindingUtil, CompositeDecorator, Editor, RichUtils, getDefaultKeyBinding } from "draft-js";
import { Link, linkStrategy } from "../plugins/LinkPlugin";

class PageContainer extends React.Component {
  constructor() {
    super();
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: linkStrategy,
        component: Link,
      }
    ]);
    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator)
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  KeyBindingFn = (e: SyntheticKeyboardEvent) => {
    if (KeyBindingUtil.hasCommandModifier(e) && e.key === "k") {
      return "add-link";
    }
    return getDefaultKeyBinding(e);
  }

  handleKeyCommand(command, editorState, c, d) {
    console.log(c, d);
    if (command === 'add-link') {
      console.log(command);
      let link = window.prompt('Paste the link -');
      const selection = editorState.getSelection();
      if (!link || selection.isCollapsed()) {
        this.onChange(RichUtils.toggleLink(editorState, selection, null));
        return 'handled';
      }
      const content = editorState.getCurrentContent();
      const contentWithEntity = content.createEntity(
        'LINK',
        'MUTABLE',
        { url: link }
      );
      const newEditorState = EditorState.push(
        editorState,
        contentWithEntity,
        'create-entity'
      );
      const entityKey = contentWithEntity.getLastCreatedEntityKey();
      this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <div className="editorContainer">
        <div className="editors">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            keyBindingFn={this.KeyBindingFn}
          />
        </div>
      </div>
    );
  }
}

export default PageContainer;
