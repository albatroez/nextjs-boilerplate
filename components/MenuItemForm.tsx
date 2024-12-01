import { SubmitHandler, useForm } from "react-hook-form";
import ThrashCan from "@/components/icons/ThrashCan";
import { useEffect } from "react";
import { AddItem, MenuItem } from "@/app/page";
import getId from "@/hooks/useIncrementalId";

export type FormData = {
    label: string;
    url: string;
};

type VoidFun = () => void;
type Props = {
    onCancel: VoidFun;
    onDelete: VoidFun;
    onSubmit: AddItem;
} & (
    | {
          isEditing: true;
          item: MenuItem;
      }
    | {
          isEditing: false;
          item?: never;
      }
);

export default function MenuItemForm({
    onCancel,
    onSubmit,
    onDelete,
    isEditing,
    item,
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>();
    const onFormSubmit: SubmitHandler<FormData> = (data) => {
        const id = isEditing ? item.id : getId();
        onSubmit({ ...data, id });
    };
    useEffect(() => {
        if (isEditing) {
            setValue("label", item.label);
            setValue("url", item.url);
        }
    }, [isEditing, item?.label, item?.url, setValue]);

    return (
        <form
            className={
                "grid grid-cols-menu-item gap-2 p-4 border rounded-lg bg-white"
            }
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <div>
                <label>
                    Nazwa<span className={"text-red-500"}>*</span>
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
                </label>
                {errors.label && (
                    <span className={"text-sm text-red-500"}>
                        {errors.label.message}
                    </span>
                )}
            </div>
            <div>
                <ThrashCan
                    onClick={
                        typeof onDelete === "function" ? onDelete : onCancel
                    }
                />
            </div>
            <div className="col-end-2">
                <label>
                    Link
                    <input
                        className={
                            "border rounded-lg w-full p-1 invalid:border-red-500"
                        }
                        {...register("url")}
                        type="url"
                        placeholder="🔍Wklej lub wyszukaj"
                    />
                </label>
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
