const fs = require("fs");

const appJsonPrepare = () => {

	// increment build number
	let buildNumber;
	try{
		buildNumber = Number(fs.readFileSync('./build-counter.txt').toString().split('\n')[0]) + 1;
	} catch (err){
		buildNumber = 1;
	}
	if (!buildNumber) buildNumber = 1;
	fs.writeFileSync('./build-counter.txt', `${buildNumber}`);

	// read existing app.json as the base
	const appJson = JSON.parse(fs.readFileSync('./app.json').toString());

	// modify new values
	appJson.expo.ios.buildNumber = `${buildNumber}`;
	if (!(appJson.expo.android)) appJson.expo.android = {};
	appJson.expo.android.versionCode = buildNumber;

	// write as the new configuration
	fs.writeFileSync('./app.json', `${JSON.stringify(appJson, null, '\t')}`);

	// log data
	console.log(`\x1b[41m\x1b[33mFinal app.json configuration:\x1b[0m`);
	console.log(JSON.stringify(appJson, null, '\t'));
};

appJsonPrepare();

