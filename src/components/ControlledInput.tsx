import { createEventListener } from "@solid-primitives/event-listener";
import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, createEffect, on, splitProps } from "solid-js";

type Props = ComponentProps<"input">;

export default function ControlledInput(props: Props) {
    const [local, others] = splitProps(props, ["ref"]);

    let ref: HTMLInputElement | undefined;

    const updateInput = () => {
        if (!ref) return;

        switch (others.type) {
            case "checkbox":
            case "radio": {
                ref.checked = others.checked ?? false;
                break;
            }

            default: {
                ref.value = (others.value || "").toString();
            }
        }
    };

    createEffect(
        on([() => others.value, () => others.checked], () => {
            if (!ref) return;
            updateInput();
        })
    );

    createEventListener(
        () => ref,
        "input",
        () => {
            void Promise.resolve().then(updateInput);
        }
    );

    return <input ref={mergeRefs(local.ref, el => (ref = el))} {...others} />;
}
