// Generated on 2014-04-06 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'app',
			dist: 'dist'
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: []
			},
			js: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: true
				}
			},
			jsTest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['newer:jshint:test', 'karma']
			},
			styles: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
                  '<%= yeoman.app %>/{,*/}*.html',
                  '.tmp/styles/{,*/}*.css',
                  '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: [
                      '.tmp',
                      '<%= yeoman.app %>'
					]
				}
			},
			test: {
				options: {
					port: 9001,
					base: [
                      '.tmp',
                      'test',
                      '<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					port: 9696,
					open: true,
					base: '<%= yeoman.dist %>'
				}
			},
			tabletennis: {
				options: {
					open: 'http://localhost:9000/tabletennis.html',
					base: [
                      '.tmp',
                      '<%= yeoman.app %>'
					]
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
              'Gruntfile.js',
              '<%= yeoman.app %>/scripts/{,*/}*.js',
              '!<%= yeoman.app %>/scripts/common/pace.js'
			],
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
                      '.tmp',
                      '<%= yeoman.dist %>/*',
                      '!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
                      '<%= yeoman.dist %>/scripts/{,*/}*.js',
                      '<%= yeoman.dist %>/styles/{,*/}*.css',
                      '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					  '!<%= yeoman.dist %>/images/slider-bg.jpg',
                      '<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: ['<%= yeoman.app %>/index.html', '<%= yeoman.app %>/tabletennis.html'],
			options: {
				dest: '<%= yeoman.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			}
		},

		// The following *-min tasks produce minified files in the dist folder
		cssmin: {
			options: {
				root: '<%= yeoman.app %>',
				noRebase: true
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: ['*.html', 'views/{,*/}*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
                      '*.{ico,png,txt}',
                      '.htaccess',
                      '*.html',
                      'views/{,*/}*.html',
                      'scripts/{,*/}*.tmpl.html',
                      'images/{,*/}*.{webp}',
                      'fonts/{,*/}*',
					  'web.config'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: ['generated/*']
				}, {
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>/bower_components/AdminLTE/fonts',
					dest: '<%= yeoman.dist %>/fonts',
					src: [
                      '{,*/}*'
					]
				}, {
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>/bower_components/bootstrap/fonts',
					dest: '<%= yeoman.dist %>/fonts',
					src: [
                      '{,*/}*'
					]
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		replace: {
			cssFontsPath: {
				options: {
					patterns: [
                        {
                        	match: /url\(\.\.\/fonts\//gi,
                        	replacement: 'url(fonts/',
                        	expression: true
                        },
                        {
                        	match: /@import url\(\/\/fonts\.googleapis\.com\/(.+)\);/gi,
                        	replacement: ' ',
                        	expression: true
                        }
					]
				},
				files: [
                    { expand: true, flatten: true, src: ['<%= yeoman.dist %>\\*.css'], dest: '<%= yeoman.dist %>' }
				]
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
              'copy:styles'
			],
			test: [
              'copy:styles'
			],
			dist: [
              'copy:styles',
              'imagemin',
              'svgmin'
			]
		},

		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css',
		//         '<%= yeoman.app %>/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		// uglify: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/scripts/scripts.js': [
		//         '<%= yeoman.dist %>/scripts/scripts.js'
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },

		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		}
	});


	grunt.registerTask('serve', function (target) {

		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
          'clean:server',
          'concurrent:server',
          'autoprefixer',
          'connect:' + (target || 'livereload'),
          'watch'
		]);
	});

	grunt.registerTask('server', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('test', [
      'clean:server',
      'concurrent:test',
      'autoprefixer',
      'connect:test',
      'karma'
	]);

	grunt.registerTask('build', [
      'clean:dist',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'copy:dist',
      'cssmin',
      'uglify',
      'rev',
      'usemin',
      'htmlmin'
	]);

	grunt.registerTask('default', [
      'newer:jshint',
      'test',
      'build'
	]);
};
