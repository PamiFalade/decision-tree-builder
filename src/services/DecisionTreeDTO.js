import Api from "./Api";

export default {
    getAllTrees() {
        return Api.get('decision-trees');
    }
}