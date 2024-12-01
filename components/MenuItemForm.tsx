"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import ThrashCan from "@/components/icons/ThrashCan";
import { useEffect } from "react";

export type FormData = {
    label: string;
    url: string;
};

let id = 0;

function getId() {
    return id++;
}

export default function MenuItemForm({ onCancel, onSubmit, isEditing, item = {} }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();
    const onFormSubmit: SubmitHandler<FormData> = (data) =>
        isEditing ? onSubmit({ ...data, id: item.id }) : onSubmit(data, getId());

    useEffect(() => {
        if (isEditing) {
            setValue("label", item.label);
            setValue("url", item.url);
        }
    }, [isEditing, item.label, item.url, setValue]);

    return (
        <form
            className={"grid grid-cols-menu-item gap-2 p-4"}
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <div>
                <label htmlFor={"label"}>Nazwa</label>
                {errors.label && <span>Nazwa jest wymagana</span>}
                <input
                    className={"border rounded w-full p-1"}
                    type="text"
                    placeholder="np. Promocje"
                    {...register("label", { required: true })}
                />
            </div>
            <div>
                <ThrashCan onClick={onCancel} />
            </div>
            <div className="col-end-2">
                <label htmlFor={"url"}>Link</label>
                <input
                    className={"border rounded w-full p-1"}
                    {...register("url")}
                    type="url"
                />
            </div>
            <div className={"flex gap-2 col-start-1"}>
                <button
                    className={"border rounded p-2"}
                    type={"button"}
                    onClick={onCancel}
                >
                    Anuluj
                </button>
                <button className={"border rounded p-2"} type="submit">
                    {isEditing ? 'Zapisz' : 'Dodaj'}
                </button>
            </div>
        </form>
    );
}
