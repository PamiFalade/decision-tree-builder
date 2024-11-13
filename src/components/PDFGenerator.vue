<template>
</template>

<script>
import { jsPDF } from "jspdf";

export default {
    name: 'PDFGenerator',
    props: {
        treeName: String,
        treeNodes: Array
    },
    setup(props) {

        const generatePDF = () => {
            const heading = "Testing Sample PDF Generator for " + props.treeName;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter'
            });

            doc.setFontSize(16).text(heading, 0.5, 1.0);

            doc.save(`${props.treeName}.pdf`);
        }


        // // Used to find nodes by traversing through the tree breadth-first
        // bfs(idToFind){
        //     if(idToFind === this.decisionTree.id){
        //         return this.decisionTree;
        //     }

        //     let nodeToFind = null;
        //     let queue = [];
        //     for(let i=0; i<this.decisionTree.children.length; i++){
        //         queue.push(this.decisionTree.children[i]);
        //     }
        //     let traversal = [];

        //     for(let i=0; i<queue.length; i++){
        //         if(queue[i].id === idToFind){
        //             nodeToFind = queue[i];
        //             break;
        //         }
        //         traversal.push(queue[i].name);
        //         queue[i].children?.forEach(child => {
        //             queue.push(child);
        //         });
        //     }

        //     return nodeToFind;
        // };

        return { generatePDF }
    }
}
</script>