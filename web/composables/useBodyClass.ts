export function useBodyClass(className: string) {
    onMounted(() => document.body.classList.add(className));
    onUnmounted(() => document.body.classList.remove(className));
}
