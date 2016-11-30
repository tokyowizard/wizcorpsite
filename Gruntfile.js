module.exports = function(grunt) {

	// Project configuration.

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			css: ['css/dw-page-modern/css/main.*']
		},
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			js: {
				// the files to concatenate
				src: [
					'js/src/jquery/jquery.js',
					'js/src/**/*.js',
					'!js/src/initialize.js'
				],
				// the location of the resulting JS file
				dest: 'js/build/scripts.js'
			},
			css: {
				// the files to concatenate
				src: [
					'css/magnific-popup/*.css',
					'css/dw-page-modern/css/template.css',
					'css/**/*.css',
					'!css/dw-page-modern/style.css'
				],
				// the location of the resulting CSS file
				dest: 'css/dw-page-modern/css/main.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: ['js/build/scripts.js'],
				dest: 'js/build/scripts.min.js'
			},
			init: {
				src: ['js/src/initialize.js'],
				dest: 'js/build/initialize.min.js'
			}
		},
		cssmin: {
			target: {
				files: [{
					src: ['css/dw-page-modern/css/main.css'],
					dest: 'css/dw-page-modern/css/main.min.css'
				}]
			},
			'options': {
				'processImport': false
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'concat', 'uglify', 'cssmin']);
};
