import {ISlider} from "@/type/slider.interface";

export interface ICardImage {
    attributes: {
        alternativeText: string
        caption: string
        height: number
        name: string
        size: number
        url: string
        width: number
    }
    id?: number
}

export interface IImage {
    data: ICardImage
}

export interface IGallery {
    content: string
    title: string
}

export interface ICard {
    id: number
    attributes: ISlider<ICardImage[]> & {
        description: string
        gallery: IGallery
        icon: IImage
        preview: IImage
        title: string
    }
}