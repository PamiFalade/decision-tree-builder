import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import './ReactD3TreeStyles.css';


// DecisionTree component, which acts as a wrapper for the react-d3-tree package that was imported via npm
// Normally, this component would be the top-most component in the DOM. This is because a lot of state changes happen here,
// and you want the state, and notifications of any changes, to be "lifted up".
// However, because of the circumstances (this must be a Vue project; it is not allowed to be a React project. And there is no 
// Vue.js 3 package for d3-tree), I was forced towards having this component be a child component.
const DecisionTree = ({ decisionTree, updateSelectedNode, hideNodePopup }) => {


  // State variable for the tree data
  const [treeData, setTreeData] = useState(decisionTree);

  // Node that is clicked becomes the selected node. This means that this will be the node of focus when 
  // adding children nodes, deleting a node, and showing node data in the NodeWindow
  const handleOnNodeClick = (node) => {
    updateSelectedNode(node);
    console.log(decisionTree);
  }
  
  const handleOnScreenClick = (e) => {
    console.log(e);
    if(e.target.nodeName != 'circle'){
      console.log("yass");
      hideNodePopup();
    }
  }

    // useEffect hook to update the treeData when the decisionTree in the MainWindow is updated
    useEffect(() => {
      setTreeData({...decisionTree});
    }, [JSON.stringify(decisionTree)]);

  return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh',}} onClick={handleOnScreenClick} >
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