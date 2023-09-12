import "./style.css"
import {IGallery, ICardImage} from "@/type/card.interface";
import {ISlider} from "@/type/slider.interface";
import md from 'markdown-it';
import {Slider} from "@/components/slider";

interface IModal extends IGallery, ISlider<ICardImage[]> {
    id: string
}

export const Modal = ({id, content, title, images}: IModal) => {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box rounded-[5px] p-10 pb-16 flex max-w-max">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        <img src="/close.svg" alt="close"/>
                    </button>
                </form>
                <div className="w-[712px] h-full">
                    <Slider images={images} />
                </div>
                <div className="flex-1 ml-10 min-w-[508px]">
                    <div dangerouslySetInnerHTML={{__html: md().render(title)}} className="modal__title" />
                    <div dangerouslySetInnerHTML={{__html: md().render(content)}} className="modal__list" />
                </div>
            </div>
            <form method="dialog" className="modal-backdrop bg-black/70">
                <button>close</button>
            </form>
        </dialog>
    )
}