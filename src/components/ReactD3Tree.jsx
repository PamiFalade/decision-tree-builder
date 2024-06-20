import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import './ReactD3TreeStyles.css';


const DecisionTree = ({ decisionTree, updateSelectedNode, dataKey }) => {


  // State variable for the tree data
  const [treeData, setTreeData] = useState(decisionTree);

  const [updateCount, setUpdateCount] = useState(0);
  const increaseUpdateCount = () => {
    setUpdateCount(updateCount + 1);
  }

  // Node that is clicked becomes the selected node. This means that this will be the node of focus when 
  // adding children nodes, deleting a node, and showing node data in the NodeWindow
  const handleOnNodeClick = (node) => {
    updateSelectedNode(node);
    setUpdateCount(updateCount+1);
    console.log(decisionTree);
  }

    // useEffect hook to update the treeData when the decisionTree in the MainWindow is updated
    useEffect(() => {
      console.log(decisionTree);
      setTreeData({...decisionTree});
    }, [decisionTree, updateCount]);

  return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh',}}>
        <Tree data={treeData}
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