import React from 'react';
import Tree from 'react-d3-tree';
import './ReactD3TreeStyles.css';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.

const DecisionTree = ({ decisionTree }) => {

    return (
        // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        <div id="treeWrapper" style={{ width: '100vw', height: '100vh',}}>
          <Tree data={decisionTree} 
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"/>
        </div>
      );
}

export default DecisionTree;