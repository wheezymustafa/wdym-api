"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dataService = tslib_1.__importStar(require("../daos/GameAssetsDao"));
function getAnswerCards(includeNsfwCards) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let answerCards = [];
        yield dataService.fetchAnswerCards(includeNsfwCards)
            .then(value => {
            answerCards = value;
        });
        return Promise.resolve(answerCards);
    });
}
exports.getAnswerCards = getAnswerCards;
function getImageCards() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let imageCards = [];
        yield dataService.fetchImageCards()
            .then(value => {
            imageCards = value;
        });
        return Promise.resolve(imageCards);
    });
}
exports.getImageCards = getImageCards;
//# sourceMappingURL=GameAssetsService.js.map