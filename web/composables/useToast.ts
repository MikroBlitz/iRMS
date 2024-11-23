import type { ToastOptions } from 'vue3-toastify';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function toasts(message: string, options?: ToastOptions) {
	toast(message, {
		autoClose: options?.autoClose !== undefined ? options.autoClose : 2000,
		clearOnUrlChange: true,
		hideProgressBar: true,
		limit: 3,
		newestOnTop: true,
		position: options?.position || 'top-right',
		theme: options?.theme || 'auto',
		transition: options?.transition || 'zoom',
		type: options?.type,
		// multiple: false,
		...options,
	});
}
