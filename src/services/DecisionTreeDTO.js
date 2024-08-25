import Api from "./Api";

export default {
    async getAllTrees() {
        return Api().get('/decision-trees');
    }
}