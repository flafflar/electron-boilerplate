const appPackage = require('./app/package.json');

module.exports = {
	appId: `com.electron.${appPackage.name}`,
	productName: appPackage.fullname,
	copyright: `Copyright © 2020 ${appPackage.author}`,
	directories: {
		buildResources: 'build',
		output: 'dist',
		app: 'app'
	},
	files: [
		'**/*',
		'!**/._*',
		'!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
		'!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
		'!**/node_modules/*.d.ts',
		'!**/node_modules/.bin',
		'!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}',
		'!.editorconfig',
		'!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}',
		'!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}',
		'!**/{appveyor.yml,.travis.yml,circle.yml}',
		'!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}',
		'!**/*.js.map'
	],
	win: {
		target: 'nsis',
		icon: 'build/icons/icon.ico',
		extraResources: [
			{
				from: 'build/VisualElements',
				to: 'VisualElements'
			}
		],
		extraFiles: [
			{
				from: 'build/VisualElementsManifest.xml',
				to: `${appPackage.name}.VisualElementsManifest.xml`
			}
		]
	},
	nsis: {
		oneClick: false,
		perMachine: false,
		allowElevation: true,
		allowToChangeInstallationDirectory: true,
		installerIcon: 'build/icons/icon-installer.ico',
		uninstallerIcon: 'build/icons/icon.ico',
		license: 'LICENSE'
	},
	compression: 'normal',
	extraResources: [],
	extraFiles: [],
	asar: true,
	publish: {
		provider: 'github',
		release: 'draft'
	}
}
