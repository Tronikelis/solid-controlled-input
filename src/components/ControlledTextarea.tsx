import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, createEffect, on, splitProps } from "solid-js";

type Props = ComponentProps<"textarea">;

export default function ControlledTextarea(props: Props) {
    const [local, others] = splitProps(props, ["value", "ref", "oninput", "onInput"]);

    let ref: HTMLTextAreaElement | undefined;

    const updateInput = () => {
        if (!ref) return;
        ref.value = (local.value || "").toString();
    };

    createEffect(
        on(
            () => local.value,
            () => {
                if (!ref) return;
                updateInput();
            }
        )
    );

    const onInput = (
        e: InputEvent & {
            target: HTMLTextAreaElement;
            currentTarget: HTMLTextAreaElement;
        }
    ) => {
        void Promise.resolve().then(updateInput);

        if (typeof local.onInput === "function") {
            local.onInput(e);
        }
        if (typeof local.oninput === "function") {
            local.oninput(e);
        }
    };

    return (
        <textarea
            ref={mergeRefs(local.ref, el => (ref = el))}
            onInput={onInput}
            value={local.value}
            {...others}
        />
    );
}
