import * as dataService from '../services/DataService'
import AnswerCard from '../model/AnswerCard'
import ImageCard from '../model/ImageCard'

export async function getAnswerCards(includeNsfwCards: boolean) {
    let answerCards: AnswerCard[] = []
    await dataService.fetchAnswerCards(includeNsfwCards)
        .then(value => {
            answerCards = value
        })
    return Promise.resolve(answerCards)
}

export async function getImageCards() {
    let imageCards: ImageCard[] = []
    await dataService.fetchImageCards()
        .then(value => {
            imageCards = value
        })
    return Promise.resolve(imageCards)
}
