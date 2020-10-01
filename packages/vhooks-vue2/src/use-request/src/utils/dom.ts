import { Ref, isRef, ref, watchEffect } from "vue";

export type BasicTarget<T = HTMLElement | Element> = (() => T) | T | null | undefined | Ref<T | null | undefined>;

export type TargetElement = HTMLElement | Element | Document | Window | null;

export type Target = BasicTarget<TargetElement>;

export function getTargetElement(
    target: BasicTarget<TargetElement>,
    defaultElement?: TargetElement
): Ref<TargetElement | undefined> {
    const targetElement = ref(defaultElement);

    if (typeof target === "function") {
        targetElement.value = target();
    } else if (isRef(target)) {
        watchEffect(
            () => {
                targetElement.value = target.value;
            },
            { flush: "sync" }
        );
    } else {
        targetElement.value = target || void 0;
    }

    return targetElement;
}

export const getAttr = (el: Element, attr: string) => el.getAttribute(attr);
export const setAttr = (el: Element, attr: string, value: string) => el.setAttribute(attr, value);
