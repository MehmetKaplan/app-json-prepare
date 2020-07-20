const fs = require("fs");

const appJsonPrepare = () => {

	// increment build number
	let c_buildNumber;
	try{
		c_buildNumber = Number(fs.readFileSync('./build-counter.txt').toString().split('\n')[0]) + 1;
	} catch (err){
		c_buildNumber = 1;
	}
	if (!c_buildNumber) c_buildNumber = 1;
	fs.writeFileSync('./build-counter.txt', `${c_buildNumber}`);

	// read existing app.json as the base
	const l_retval = JSON.parse(fs.readFileSync('./app.json').toString());

	// modify new values
	l_retval.expo.ios.buildNumber = `${c_buildNumber}`;
	if (!(l_retval.expo.android)) l_retval.expo.android = {};
	l_retval.expo.android.versionCode = c_buildNumber;

	// write as the new configuration
	fs.writeFileSync('./app.json', `${JSON.stringify(l_retval, null, '\t')}`);

	// log data
	console.log(`\x1b[41m\x1b[34mFinal app.json configuration:\x1b[0m`);
	console.log(JSON.stringify(l_retval, null, '\t'));
};

appJsonPrepare();

