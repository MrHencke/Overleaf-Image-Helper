export type KbEvent = KeyboardEvent & {
    currentTarget: HTMLTextAreaElement;
    target: Element;
}