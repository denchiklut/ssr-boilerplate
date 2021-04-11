import { Props } from './types'

export const cutTags = (text = '') => text.replace(/<\/?.+?>/gi, '')

export const prepareData = ({ title, description, image }: Props) => {
    return {
        title: cutTags(title),
        description: cutTags(description).substr(0, 250),
        image
    }
}
