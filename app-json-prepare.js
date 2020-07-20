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
	const l_retval = JSON.parse(fs.readFileSync('./app.json').toString());

	// modify new values
	l_retval.expo.ios.buildNumber = `${buildNumber}`;
	if (!(l_retval.expo.android)) l_retval.expo.android = {};
	l_retval.expo.android.versionCode = buildNumber;

	// write as the new configuration
	fs.writeFileSync('./app.json', `${JSON.stringify(l_retval, null, '\t')}`);

	// log data
	console.log(`\x1b[41m\x1b[33mFinal app.json configuration:\x1b[0m`);
	console.log(JSON.stringify(l_retval, null, '\t'));
};

appJsonPrepare();

