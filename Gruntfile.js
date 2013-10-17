module.exports = function (grunt) {
	
	grunt.initConfig({

		jshint: {
			src: 'canvasFont.js'
		},

		uglify: {
			'canvasFont.min.js': 'canvasFont.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default',['uglify']);
}