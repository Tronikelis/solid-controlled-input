import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, createEffect, on, splitProps } from "solid-js";

type Props = ComponentProps<"textarea">;

export default function ControlledTextarea(props: Props) {
    const [local, others] = splitProps(props, ["ref", "onInput", "oninput"]);

    let ref: HTMLTextAreaElement | undefined;

    const updateInput = () => {
        if (!ref) return;
        if (others.value == null) return;
        ref.value = String(others.value);
    };

    createEffect(
        on(
            () => others.value,
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
            return;
        }

        if (typeof local.oninput === "function") {
            local.oninput(e);
            return;
        }
    };

    return (
        <textarea ref={mergeRefs(local.ref, el => (ref = el))} onInput={onInput} {...others} />
    );
}
