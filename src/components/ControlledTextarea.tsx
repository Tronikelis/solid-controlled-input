import { createEventListener } from "@solid-primitives/event-listener";
import { mergeRefs } from "@solid-primitives/refs";
import { ComponentProps, createEffect, on, splitProps } from "solid-js";

type Props = ComponentProps<"textarea">;

export default function ControlledTextarea(props: Props) {
    const [local, others] = splitProps(props, ["ref"]);

    let ref: HTMLTextAreaElement | undefined;

    const updateInput = () => {
        if (!ref) return;
        ref.value = (others.value || "").toString();
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

    createEventListener(
        () => ref,
        "input",
        () => {
            void Promise.resolve().then(updateInput);
        }
    );

    return <textarea ref={mergeRefs(local.ref, el => (ref = el))} {...others} />;
}
