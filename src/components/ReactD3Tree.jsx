import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import './ReactD3TreeStyles.css';


// DecisionTree component, which acts as a wrapper for the react-d3-tree package that was imported via npm
// Normally, this component would be the top-most component in the DOM. This is because a lot of state changes happen here,
// and you want the state, and notifications of any changes, to be "lifted up".
// However, because of the circumstances (this must be a Vue project; it is not allowed to be a React project. And there is no 
// Vue.js 3 package for d3-tree), I was forced towards having this component be a child component.
const DecisionTree = ({ decisionTree, updateSelectedNode, hideNodePopup, updatePopupCoordinates }) => {


  // State variable for the tree data
  const [treeData, setTreeData] = useState(decisionTree);

  // Node that is clicked becomes the selected node. This means that this will be the node of focus when 
  // adding children nodes, deleting a node, and showing node data in the NodeWindow
  const handleOnNodeClick = (node) => {
    updateSelectedNode(node);
  }
  // Update the click coordinates on every click for when the Node Popup is shown.
  // When anywhere other than a node is clicked, the Node Popup disappears. 
  const handleOnScreenClick = (e) => {
    updatePopupCoordinates(e.clientX, e.clientY);
    if(e.target.nodeName != 'circle' && e.target.nodeName != 'rect' && e.target.nodeName != 'polygon'){
      hideNodePopup();
    }
  }
  // Returns the appropriate svg element for the node type
  // The root node is a maroon-colored square, a decision node is a red square, 
  // a chance node is a yellow circle, and a terminal node is a green triangle.
  const returnNodeShape = (nodeType, nodeInfo) => {
    let nodeShape;
    let xCoord = nodeInfo.y - (130*nodeInfo.depth + 10*(nodeInfo.depth)); // Depth = 1: -130, Depth = 2: -270, Depth = 3: -410, Depth = 4: -550...
    let yCoord = nodeInfo.x / 400;

    // Styling based on if the nodes are on the most profitable branch
    let width = nodeInfo.data.attributes.onBestPath ? "25" :"20";
    let height = nodeInfo.data.attributes.onBestPath ? "25" :"20";
    let r = nodeInfo.data.attributes.onBestPath ? "20" :"15";

    let fill = nodeInfo.data.attributes.onBestPath ? "green" : 
                      nodeType === "Root" ? "maroon" : 
                      nodeType === "Decision" ? "red" : 
                      nodeType === "Chance" ? "yellow" : 
                      nodeType === "Terminal" ? "#4CBB17" : "none";
    
    if(nodeType === 'Root') { 
      nodeShape = <rect width={width} height={height} x="-20" y="-8" fill={fill}  />
    }

    else if(nodeType === 'Decision') {
      nodeShape = <rect width={width} height={height} x="-10" y="-8" fill={fill} />
    }
    
    else if(nodeType === 'Chance') {
      nodeShape = <circle r="15" x="-10" fill={fill} />
    }
      
    else if(nodeType === 'Terminal') {
      let trianglePoints = `${xCoord},${yCoord}, ${xCoord+15},${yCoord-10}, ${xCoord+15},${yCoord+10}`;
      nodeShape = <polygon points={trianglePoints} fill={fill} />
    }

    return nodeShape;
  }


  // Function used to render each of the nodes, based on their type
  const renderSvgNode = ({ hierarchyPointNode, nodeDatum }) => (
    <g onClick={() => { handleOnNodeClick(hierarchyPointNode) }} >
      { returnNodeShape(nodeDatum.attributes?.type, hierarchyPointNode) }
      <text fontSize="14" fill="black" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes?.yield && (
        <text fontSize="12" fill="black" x="-50" dy="20" strokeWidth="0.5">
          {nodeDatum.attributes.yield}
        </text>
      )}
      {nodeDatum.attributes?.probability && !nodeDatum.attributes?.expectedValue && (
        <text fontSize="12" fill="black" x="-50" dy="20" strokeWidth="0.5">
          {nodeDatum.attributes.yield}
        </text>
      )}
      {nodeDatum.attributes?.expectedValue && (
        <text fontSize="14" fill="black" x="20" dy="20" strokeWidth="1">
          EV: {nodeDatum.attributes.expectedValue}
        </text>
      )}
    </g>
  );

    const slantedPathFunc = (linkDatum, orientation) => {
      const { source, target } = linkDatum;

      return orientation === 'horizontal'
        ? `M${source.y},${source.x}L${source.y+20},${source.x}L${target.y-40},${target.x}L${target.y},${target.x}`
        : `M${source.x},${source.y}L${target.x},${target.y}`;
    };

  const getDynamicPathClass = ({ source, target }, orientation) => {

    // If the node is on the best path, style the link between the source and target nodes
    if (target.data.attributes.onBestPath === true) {
      return 'link_best_path';
    }

    return 'normal_link';
  };

  // useEffect hook to update the treeData when the decisionTree in the MainWindow is updated
  useEffect(() => {
    setTreeData({...decisionTree});
  }, [JSON.stringify(decisionTree)]);

  return (
      // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh',}} onClick={handleOnScreenClick} >
        <Tree data={treeData}
          pathFunc={slantedPathFunc}
          pathClassFunc={getDynamicPathClass}
          translate={{ x:75, y:300 }}
          collapsible={false}
          renderCustomNodeElement={renderSvgNode}

          />
      </div>
  );
}

export default DecisionTree;