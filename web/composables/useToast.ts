import type { ToastOptions } from 'vue3-toastify';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function toasts(message: string, options?: ToastOptions) {
    toast(message, {
        theme: options?.theme || 'auto',
        position: options?.position || 'top-right',
        autoClose: options?.autoClose !== undefined ? options.autoClose : 2000,
        type: options?.type,
        hideProgressBar: true,
        transition: options?.transition || 'zoom',
        limit: 3,
        newestOnTop: true,
        clearOnUrlChange: true,
        // multiple: false,
        ...options,
    });
}
