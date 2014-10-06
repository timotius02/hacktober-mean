//Gruntfile.js

module.exports = function(grunt){

	grunt.initConfig({

		//JS Tasks =======================================================
		//run jshint
		jshint: {
			all: ['public/src/js/**/*.js']
		},

		//minify and concatinate all files into app.min.js
		uglify: {
			build: {
				files: {
					'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
				}
			}
		},

		//CSS Tasks ======================================================
		//process the less files to style.css
		less: {
			build: {
				files: {
					'public/dist/css/style.css': 'public/src/css/style.less'
				}
			}
		},

		// take the processed css and minify it
		cssmin: {
			build: {
				files: {
					'public/dist/css/style.min.css': 'public/dist/css/style.css'
				}
			}
		},

		//Cool Tasks
		watch: {
			css: {
				files: ['public/src/css/**/*.less'],
				tasks: ['less', 'cssmin']
			},
			js: {
				files: ['public/src/js/**/*.js'],
				tasks: ['jshint', 'uglify']
			}
		},

		//configure nodemon
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		//run watch and nodemon at the same time
		concurrent: {
			options: {
				logConcurrentOuput: true
			},
			tasks: ['nodemon', 'watch']
		}
	});


grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-concurrent');


	//register the nodemon task when we run grunt
	grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);
}