// Gre skozi vse podmape in vzame ven vse pdf-je in jih obdela s štempljem ZAUPNO,
// ki mora biti v obliki pdf na namizju s transparentnim ozadnjem.
// pdftk server aplikacija CLI jih pa potem obdela in vrže v mapo z enakim imenom z določenim prefiksom.

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let dirIn = 'ZOZ' //---------------------------------->>>>>>> tle vpiši mapo
let prefix = 'ZAUPNO-'
// let postfix = '-ZAUPNO'
let dirOut;
let pdf;

let seznam = spawn('find', [ dirIn, '-type', 'd']);
let sezArr;

seznam.stdout.on('data', (data) => {
	// console.log(data.toString());
	sezArr = data.toString().split('\n')
	console.log(sezArr)

	for (let i = 0; i < sezArr.length; i++) {
		if (sezArr[i].trim() != '') {
			preberi(sezArr[i] + '/');
			console.log(sezArr[i])
		}
	}

	// sezArr.forEach((dir) => {
	// 	preberi(dir + '/');
	// })
})

let preberi = (dir) => {
	fs.readdir(dir, (err, files) => {
		dirOut = prefix + dir;

		if ( !fs.existsSync(dirOut) ) {

			fs.mkdirSync(dirOut, { recursive: true });
		}

		files.forEach((file, index) => {
			if (file.indexOf('.pdf') > 0) {
			console.log(dir + file);
			pdf = spawn('pdftk', [ dir + file, 'multistamp', '/Users/kookaburra/Desktop/ZAUPNO.pdf', 'output', dirOut + file ]);

			pdf.stdout.on('data', (data) => {
				console.log(data.toString());
			});

			pdf.stderr.on('data', (data) => {
				console.log(data.toString());
			});

		}

		})
	})


} 