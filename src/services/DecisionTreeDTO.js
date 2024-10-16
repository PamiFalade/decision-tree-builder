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
        const response = await Api().post(`/decision-trees/`, { ...decisionTree })
            .catch(error => console.log(error));
        return response;
    },

    async deleteTree(treeID) {
        await Api().delete(`/decision-trees/${treeID}`)
            .then(response => console.log(response));
    }
}