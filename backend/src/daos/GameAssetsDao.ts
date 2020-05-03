import { getClient } from '../services/DbClient'
import AnswerCard from '../model/AnswerCard'
import ImageCard from '../model/ImageCard'
import logger from '@shared/Logger';

//var db = getClient()

export async function fetchAnswerCards(includeNsfwCards: boolean): Promise<AnswerCard[]> {
    let fetchNsfwCardsQuery = {}
    if (!includeNsfwCards) {
        fetchNsfwCardsQuery = { isNsfw: { $ne: true } }
    }

    let answerCards: AnswerCard[] = []
    try {
        await getClient().collection("AnswerCards").find(fetchNsfwCardsQuery)
            .toArray()
            .then(results => {
                answerCards = results.map(card => new AnswerCard(card._id, card.value))
            })
    } catch (err) {
        logger.error(`Unable to fetch answer cards, error: ${err}`)
    }
    return Promise.resolve(answerCards)
}

export async function fetchImageCards(): Promise<ImageCard[]> {
    let imageCards: ImageCard[] = []

    try {
        await getClient().collection("ImageCards").find({})
        .toArray()
        .then(results => {
            imageCards = results.map(card => new ImageCard(card._id, card.name, card.url))
        })
    } catch (err) {
        logger.error(`Unable to fetch image cards, error: ${err}`)
    }
    return Promise.resolve(imageCards)
}
