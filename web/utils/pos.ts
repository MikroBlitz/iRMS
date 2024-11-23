export const currencyFormat = (value: any) => {
	return new Intl.NumberFormat('en-PH', {
		currency: 'PHP',
		style: 'currency',
	}).format(value);
};

export const qtyFormat = (number: any) => number.toLocaleString(undefined);

export const printReceipt = (customerName: string) => {
	const receipt = document.getElementById('receipt');
	if (receipt) {
		const printWindow = window.open('', '_blank', 'width=600,height=800');
		if (printWindow) {
			const today = new Date();
			const formattedDate = today.toISOString().split('T')[0];
			const sanitizedCustomerName = customerName.replace(/\s+/g, '-');
			const fileName = `${formattedDate}-${sanitizedCustomerName}`;

			printWindow.document.open();
			printWindow.document.write(`
                <html>
                  <head>
                      <title>Receipt: ${fileName}</title>
                    <style>
                      ${Array.from(document.styleSheets)
							.map((styleSheet) => {
								try {
									return Array.from(styleSheet.cssRules)
										.map(rule => rule.cssText)
										.join('');
								}
								catch (e) {
									return '';
								}
							})
							.join('')}
                    </style>
                  </head>
                  <body onload="window.print(); window.close();">
                    <div>${receipt.innerHTML}</div>
                  </body>
                </html>
              `);
			printWindow.document.close();
		}
	}
};
