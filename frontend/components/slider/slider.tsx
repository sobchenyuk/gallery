"use client"

import { getStrapiMedia } from "@/utils/api-helpers";
import {ISlider} from "@/type/slider.interface";
import {ICardImage} from "@/type/card.interface";
import {useState, useMemo} from "react";

export const Slider = ({ images: {data} }: ISlider<ICardImage[]>) => {
    const [active, setActive] = useState(data[0].id ?? 0)
    const onClick = (id: number) => {
        setActive(id);
    }

    const urlImage = useMemo(() => {
        const getCurrent = data.find((item) => item.id === +active);
        if (getCurrent) {
            return getStrapiMedia(getCurrent.attributes.url)
        }
       return getStrapiMedia(data[0].attributes.url)
    }, [active, data])

    return (
        <div className="flex flex-col gap-y-5">
            <figure className="w-full rounded-none">
                <img
                    src={urlImage ?? ""}
                    alt={data[0].attributes.alternativeText}
                    className="object-cover w-full h-[472px]"
                />
            </figure>
            <ul className="flex flex-row justify-between gap-x-3">
                {data.map(({id, attributes}: ICardImage) => (
                    <li key={id}>
                        <button
                            type="button"
                            onClick={() => id && onClick(id)}
                            className="relative rounded-[8px] overflow-hidden"
                        >
                            <span
                                className={`absolute left-0 top-0 w-full h-full rounded-[8px] ${id === +active ? "border-[3px] border-solid border-[color:#F86D2E]" : ""}`}
                            />
                            <img src={getStrapiMedia(attributes.url) ?? ""} alt="" className="w-[228px] object-cover h-[150px]" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}