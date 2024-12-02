import { SubmitHandler, useForm } from "react-hook-form";
import ThrashCan from "@/components/icons/ThrashCan";
import { useEffect } from "react";
import { AddItem, MenuItem } from "@/components/Home";
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
                "grid grid-cols-menu-item gap-2 rounded-lg border bg-white p-4"
            }
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <div>
                <label>
                    Nazwa<span className={"text-red-500"}>*</span>
                    <input
                        className={
                            "w-full rounded-lg border p-1 invalid:border-red-500"
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
                            "w-full rounded-lg border p-1 invalid:border-red-500"
                        }
                        {...register("url")}
                        type="url"
                        placeholder="🔍Wklej lub wyszukaj"
                    />
                </label>
            </div>
            <div className={"col-start-1 flex gap-2"}>
                <button
                    className={
                        "rounded-lg border p-2 font-medium hover:bg-zinc-100"
                    }
                    type={"button"}
                    onClick={onCancel}
                >
                    Anuluj
                </button>
                <button
                    className={
                        "rounded-lg border border-droplo-purple p-2 font-medium text-droplo-purple hover:bg-zinc-100"
                    }
                    type="submit"
                >
                    {isEditing ? "Zapisz" : "Dodaj"}
                </button>
            </div>
        </form>
    );
}
