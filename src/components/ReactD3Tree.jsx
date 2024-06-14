import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import './ReactD3TreeStyles.css';


const DecisionTree = ({ decisionTree, updateSelectedNode }) => {

  const handleOnNodeClick = (node) => {
    console.log(node);
    updateSelectedNode(node);
  }

  return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh',}}>
        <Tree data={decisionTree} 
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          pathFunc={"straight"}
          translate={{ x:75, y:300 }}
          collapsible={false}
          onNodeClick={(datum) => handleOnNodeClick(datum)}/>
      </div>
    );
}

export default DecisionTree;