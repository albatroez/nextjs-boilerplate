"use client";
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

export default function MenuItemForm({
    onCancel,
    onSubmit,
    onDelete,
    isEditing,
    item = {},
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();
    const onFormSubmit: SubmitHandler<FormData> = (data) =>
        isEditing ?
            onSubmit({ ...data, id: item.id })
        :   onSubmit(data, getId());

    useEffect(() => {
        if (isEditing) {
            setValue("label", item.label);
            setValue("url", item.url);
        }
    }, [isEditing, item.label, item.url, setValue]);

    return (
        <form
            className={
                "grid grid-cols-menu-item gap-2 p-4 border rounded-lg bg-white"
            }
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <div>
                <label htmlFor={"label"}>
                    Nazwa<span className={"text-red-500"}>*</span>
                </label>
                {errors.label && (
                    <span className={"text-sm text-red-500"}>
                        {errors.label.message}
                    </span>
                )}
                <input
                    className={
                        "border rounded-lg w-full p-1 invalid:border-red-500"
                    }
                    type="text"
                    required={true}
                    autoFocus
                    aria-invalid={errors.label ? "true" : "false"}
                    placeholder="np. Promocje"
                    {...register("label", {
                        required: {
                            value: true,
                            message: "Podanie nazwy jest wymagane",
                        },
                    })}
                />
            </div>
            <div>
                <ThrashCan
                    onClick={
                        typeof onDelete === "function" ? onDelete : onCancel
                    }
                />
            </div>
            <div className="col-end-2">
                <label htmlFor={"url"}>Link</label>
                <input
                    className={
                        "border rounded-lg w-full p-1 invalid:border-red-500"
                    }
                    {...register("url")}
                    type="url"
                    placeholder="🔍Wklej lub wyszukaj"
                />
            </div>
            <div className={"flex gap-2 col-start-1"}>
                <button
                    className={
                        "border rounded-lg p-2 hover:bg-zinc-100 font-medium"
                    }
                    type={"button"}
                    onClick={onCancel}
                >
                    Anuluj
                </button>
                <button
                    className={
                        "border rounded-lg p-2 hover:bg-zinc-100 font-medium border-droplo-purple text-droplo-purple"
                    }
                    type="submit"
                >
                    {isEditing ? "Zapisz" : "Dodaj"}
                </button>
            </div>
        </form>
    );
}
