import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, createEffect, on, splitProps } from "solid-js";

type Props = ComponentProps<"input">;

export default function ControlledInput(props: Props) {
    const [local, others] = splitProps(props, ["ref", "oninput", "onInput"]);

    let ref: HTMLInputElement | undefined;

    const updateInput = () => {
        if (!ref) return;

        switch (others.type) {
            case "checkbox":
            case "radio": {
                if (others.checked == null) return;
                ref.checked = others.checked;
                break;
            }

            default: {
                if (others.value == null) return;
                ref.value = String(others.value);
            }
        }
    };

    createEffect(
        on(
            [() => others.value, () => others.checked],
            () => {
                if (!ref) return;
                updateInput();
            },
            { defer: true }
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
            return;
        }

        if (typeof local.oninput === "function") {
            local.oninput(e);
            return;
        }
    };

    return (
        <input ref={mergeRefs(local.ref, el => (ref = el))} onInput={onInput} {...others} />
    );
}
