"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DbClient_1 = require("../services/DbClient");
const AnswerCard_1 = tslib_1.__importDefault(require("../model/AnswerCard"));
const ImageCard_1 = tslib_1.__importDefault(require("../model/ImageCard"));
const Logger_1 = tslib_1.__importDefault(require("@shared/Logger"));
function fetchAnswerCards(includeNsfwCards) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let fetchNsfwCardsQuery = {};
        if (!includeNsfwCards) {
            fetchNsfwCardsQuery = { isNsfw: { $ne: true } };
        }
        let answerCards = [];
        try {
            yield DbClient_1.getClient().collection("AnswerCards").find(fetchNsfwCardsQuery)
                .toArray()
                .then(results => {
                answerCards = results.map(card => new AnswerCard_1.default(card._id, card.value));
            });
        }
        catch (err) {
            Logger_1.default.error(`Unable to fetch answer cards, error: ${err}`);
        }
        return Promise.resolve(answerCards);
    });
}
exports.fetchAnswerCards = fetchAnswerCards;
function fetchImageCards() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let imageCards = [];
        try {
            yield DbClient_1.getClient().collection("ImageCards").find({})
                .toArray()
                .then(results => {
                imageCards = results.map(card => new ImageCard_1.default(card._id, card.name, card.url));
            });
        }
        catch (err) {
            Logger_1.default.error(`Unable to fetch image cards, error: ${err}`);
        }
        return Promise.resolve(imageCards);
    });
}
exports.fetchImageCards = fetchImageCards;
//# sourceMappingURL=GameAssetsDao.js.map