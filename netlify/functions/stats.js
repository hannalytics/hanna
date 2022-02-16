const {schedule} = require('@netlify/functions');
const fs = require('fs');

const data = fs.readFileSync('src/lib/data/user.json');

const handler = async function(event, context) {
	console.log("Received event:", event)
	console.log(data);

	return {
		statusCode: 200,
	};
};

module.exports.handler = schedule("@hourly", handler);
