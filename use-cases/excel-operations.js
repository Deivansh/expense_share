const ExcelJS = require("exceljs");
module.exports = {
	writeData: async function (data_arr) {
		try {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet("Account Sheet");
			worksheet.columns = [
				{ header: "Person", key: "person" },
				{ header: "Status", key: "status" },
				{ header: "Person", key: "person2" },
				{ header: "Amount", key: "amount" },
			];
			worksheet.addRows(data_arr);
			// save under account-export.xlsx
			await workbook.xlsx.writeFile("account-export.xlsx");
			return true;
		} catch (error) {
			throw new Error(`ExcelJs Error: ${error}`);
		}
	},
};
