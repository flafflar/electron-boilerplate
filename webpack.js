const webpack = require('webpack');
const path = require('path');

let mode = process.argv.includes('--dev') ? 'development' : 'production';

const compiler = webpack({
	mode: mode,
	/*target: 'electron-main',
	node: {
		__dirname: false,
		__filename: false,
		Buffer: false,
		process: false
	},*/
	entry: './src/main/main.js',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'main.js'
	},
	// devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			}
		]
	}
});


if (process.argv.includes('--watch')){
	console.log('Starting webpack watching...\nPress Ctrl+C to stop\n');

	const watching = compiler.watch({
		aggregateTimeout: 300,
		ignored: /node_modules/
	}, (err, stats) => {
		if (err){
			console.error( err );
		} else {
			console.log(stats.toString({
				stats: 'verbose',
				chunks: false,
				colors: true
			}));
		};

	});

	process.on('SIGINT', function(){
		watching.close(() => {
			console.log('Watching ended');
			process.exit();
		});
	});
} else {
	compiler.run((err, stats) => {
		if (err){
			console.error(err);
		} else {
			console.log(stats.toString({
				stats: 'verbose',
				chunks: false,
				colors: true
			}));
		};
	})
};
