import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, createEffect, on, splitProps } from "solid-js";

type Props = ComponentProps<"input">;

export default function ControlledInput(props: Props) {
    const [local, others] = splitProps(props, ["value", "ref", "oninput", "onInput"]);

    let ref: HTMLInputElement | undefined;

    const updateInput = () => {
        if (!ref || !local.value) return;
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
            target: HTMLInputElement;
            currentTarget: HTMLInputElement;
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
        <input
            ref={mergeRefs(local.ref, el => (ref = el))}
            onInput={onInput}
            value={local.value}
            {...others}
        />
    );
}
