import Api from "./Api";

export default {
    async getAllTrees() {
        return await Api().get('/decision-trees');
    },

    async getTree(treeID) {
        return await Api().get(`/decision-trees/${treeID}`);
    },

    async saveTree(decisionTree) {
        console.log(decisionTree);
        await Api().post(`/decision-trees/`, { ...decisionTree })
            .then(response => {
                console.log(response);
            });
        return;
    }
}