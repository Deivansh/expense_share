const { writeData } = require("./excel-operations");
module.exports = async function (data) {
	if (!data.members) throw new Error("Members array not present.");
	if (data.members.length <= 0) throw new Error("No member present.");
	if (!data.account) throw new Error("Account list array not present");
	if (data.account.length <= 0)
		throw new Error("No entry present in account list.");

	const members = data.members;
	const accountList = data.account;

	var accountMap = new Map();

	members.forEach((value) => accountMap.set(value, new Map()));

	for (let account of accountList) {
		if (!account.person || !members.includes(account.person))
			throw new Error("Invalid person.");
		if (
			!account.expense ||
			account.expense < 0 ||
			typeof account.expense != "number"
		)
			throw new Error("Invalid expense.");
		if (account.expense == 0) continue;
		if (!account.split || account.split.length <= 0)
			throw new Error("Invalid split array.");
		let dividedSum = account.expense / account.split.length;
		let innerAccountMap = accountMap.get(account.person);
		account.split.forEach((value) => {
			if (value !== account.person) {
				let valueAccountMap = accountMap.get(value);
				let valuePrevRec = valueAccountMap.get(account.person);
				let innerPrevRec = innerAccountMap.get(value);
				if (innerPrevRec) {
					if (innerPrevRec <= dividedSum) {
						if (innerPrevRec >= 0) {
							valueAccountMap.set(
								account.person,
								valuePrevRec ? valuePrevRec + dividedSum : dividedSum
							);
						} else {
							valueAccountMap.set(
								account.person,
								valuePrevRec ? valuePrevRec + dividedSum : dividedSum
							);
						}

						innerAccountMap.set(value, innerPrevRec - dividedSum);
					} else {
						innerAccountMap.set(value, innerPrevRec - dividedSum);
						valueAccountMap.set(account.person, dividedSum - innerPrevRec);
					}
				} else {
					valueAccountMap.set(
						account.person,
						valuePrevRec ? valuePrevRec + dividedSum : dividedSum
					);
					innerAccountMap.set(value, -dividedSum);
				}
			}
		});
	}

	// console.log(accountMap);

	let data_arr = [];

	for (let [key, value] of accountMap) {
		for (let [innerKey, innerValue] of value) {
			if (innerValue < 0)
				data_arr.push([key, "will receive from", innerKey, -innerValue]);
			else data_arr.push([key, "owes to", innerKey, innerValue]);
		}
	}

	await writeData(data_arr);

	return "Success";
};
