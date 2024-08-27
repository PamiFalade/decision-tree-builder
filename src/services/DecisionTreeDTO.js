import Api from "./Api";

export default {
    async getAllTrees() {
        return await Api().get('/decision-trees');
    },

    async getTree(treeID) {
        const test = await Api().get(`/decision-trees/${treeID}`);
        console.log(test);
        return test;
    }
}