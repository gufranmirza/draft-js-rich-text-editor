import React from "react";
import { EditorState, CompositeDecorator, Editor } from "draft-js";
import { styles, handleStrategy, hashtagStrategy } from "../plugins/decoratorsPlugin";

const HandleSpan = props => {
  return (
    <span style={styles.handle} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};

const HashtagSpan = props => {
  return (
    <span style={styles.hashtag} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};

class PageContainer extends React.Component {
  constructor() {
    super();
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: handleStrategy,
        component: HandleSpan
      },
      {
        strategy: hashtagStrategy,
        component: HashtagSpan
      }
    ]);
    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator)
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  render() {
    return (
      <div className="editorContainer">
        <div className="editors">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default PageContainer;
