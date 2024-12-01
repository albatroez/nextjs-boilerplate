type Props = {
    onClickAdd: () => void;
    onClickDelete: () => void;
    onClickEdit: () => void;
};

export default function Actions({
    onClickAdd,
    onClickDelete,
    onClickEdit,
}: Props) {
    return (
        <section className="ml-auto border rounded-lg">
            <button
                className={"border-r px-2 py-1 hover:bg-zinc-100"}
                onClick={onClickDelete}
            >
                Usuń
            </button>
            <button
                className={"border-r px-2 py-1 hover:bg-zinc-100"}
                onClick={onClickEdit}
            >
                Edytuj
            </button>
            <button
                className={"px-2 py-1 hover:bg-zinc-100"}
                type={"button"}
                onClick={onClickAdd}
            >
                Dodaj pozycję menu
            </button>
        </section>
    );
}
