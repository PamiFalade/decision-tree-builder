import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const pdfGenerator = (decisionTree) => {

    // Generate a report for each node of the decision tree.
    // Traverse the tree depth first, so each initial decision gets examined in depth one after the other
    const generateNodeReport = (doc, node) => {
        if(node.attributes.type === "Terminal") {
            return;
        }

        doc.setFontSize(11).setTextColor('red').text(`\r\n${node.attributes.type}\r\n`, 0.5, 1.0);
        for(let i=0; i<node.children.length; i++) {
            generateTable(doc, node.children[i]);
            doc.addPage();
            console.log(node.children[i]);
            // for(let j=0; j<node.children[j].children.length; j++) {
            //     generateNodeReport(doc, node.children[i].children[j]);
            // }
        }
        
    }

    const generateTable = (doc, node) => {
        autoTable(doc, {
            head: [['Chance Event', 'Probability', 'Present Value Yield', 'Discounted Expected Value']],
            body: node.children.map(childNode => {
                return (
                    [childNode.name, childNode.attributes.probability, "$" + childNode.attributes.yield, "$" + childNode.attributes.expectedValue]
                )    
            }),
            margin: { left: 0.5, top: 3 }
        });
    }

    const generatePDF = (pdfTitle) => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: 'a4'
        });
    
        doc.setFontSize(16).text(pdfTitle, 0.5, 1.0, { align: 'left' });

        for(let i=0; i<decisionTree.children.length; i++) {
            generateNodeReport(doc, decisionTree.children[i]);
        }

    
        doc.save(`testing_export.pdf`);
    }
    
    return { generatePDF };
}

export default pdfGenerator;