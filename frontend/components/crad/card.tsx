"use client"

import "./style.css"
import {ICard} from "@/type/card.interface";
import { getStrapiMedia } from "@/utils/api-helpers";
import md from 'markdown-it';
import {Modal} from "@/components/modal";

export const Card = ({attributes: {
    preview,
    description,
    title,
    icon,
    gallery,
    images
}, id}: ICard) => {
    const urlImage = getStrapiMedia(preview.data.attributes.url)
    const urlIcon = getStrapiMedia(icon.data.attributes.url)
    const modalId = `modal-${id}`
    const onShowModal = () => {
        const modal: HTMLDialogElement | null = document.getElementById(modalId) as HTMLDialogElement;
        if (modal) {
            modal.showModal()
        }
    }
    return (
        <>
            <div className="card w-full bg-white rounded-[8px] p-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.10)]">
                <figure className="w-full rounded-[2px]">
                    <img
                        src={urlImage ?? ""}
                        alt={preview.data.attributes.alternativeText}
                        className="object-cover w-full cursor-pointer"
                        onClick={onShowModal}
                        tabIndex={-1}
                    />
                </figure>
                <div className="card-body flex flex-wrap flex-row px-0 pt-6 pb-0">
                    <div className="flex-1">
                        <div
                            dangerouslySetInnerHTML={{__html: md().render(title)}}
                            className="card__title"
                        />
                        <div
                            dangerouslySetInnerHTML={{__html: md().render(description)}}
                            className="card__description"
                        />
                    </div>
                    <div className="w-24">
                        <figure>
                            <img src={urlIcon ?? ""} alt="Icon" width={icon.data.attributes.width} height={icon.data.attributes.height} />
                        </figure>
                    </div>
                </div>
            </div>
            <Modal id={modalId} title={gallery.title} content={gallery.content} images={images}  />
        </>
    )
}