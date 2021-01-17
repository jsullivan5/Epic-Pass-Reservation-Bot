module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	globals: {
		$x: true,
	},
	extends: [
		'standard'
	],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'comma-dangle': ['error', {
			arrays: 'only-multiline',
			objects: 'only-multiline',
			exports: 'only-multiline',
			functions: 'only-multiline',
		}],
		semi: [
			'error',
			'always'
		]
	},
};
