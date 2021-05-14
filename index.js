const express = require("express");
const calculate_expense = require("./use-cases/calculate-expense");
const app = express();
app.use(express.json());
const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

app.post("/calculate-expense", async (req, res) => {
	try {
		const { data_json } = req.body;
		if (!data_json) {
			return res.json({ data: { error: "data_json not present." } });
		}
		let acknowledgment = await calculate_expense(data_json);
		return res.json({ data: { message: acknowledgment } });
	} catch (error) {
		return res.json({ data: { error: `Caught Error: ${error}` } });
	}
});
