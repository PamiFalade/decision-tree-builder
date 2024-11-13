import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const pdfGenerator = (treeTitle, decisionTree) => {

    const generatePDF = () => {
        const heading = treeTitle;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: 'a4'
        });
    
        doc.setFontSize(16).text(heading, 0.5, 1.0, { align: 'left' });

        decisionTree.children.forEach(node => {
            doc.setFontSize(11).setTextColor('red').text(`\r\n${node.attributes.type}\r\n`, 0.5, 1.0);
        });
        
        autoTable(doc, {
            head: [['Chance Event', 'Probability', 'Present Value Yield', 'Discounted Expected Value']],
            body: decisionTree.children[0].children.map(childNode => {
                return (
                    [childNode.name, childNode.attributes.probability, "$" + childNode.attributes.yield, "$" + childNode.attributes.expectedValue]
                )    
            }),
            margin: { left: 0.5, top: 3 }
        });


    
        doc.save(`testing_export.pdf`);
    }
    
    return { generatePDF };
}

export default pdfGenerator;