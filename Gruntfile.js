module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({

    /* LESS compiling */
    less: {
      development: {
        files: [
          /* Compile components' less stylesheets */
          {
            expand: true, // Enable dynamic expansion.
            cwd: './public/css', // Src matches are relative to this path.
            src: ['**/style.less'], // Actual pattern(s) to match.
            dest: './public/css', // Destination path prefix.
            ext: '.css' // Dest filepaths will have this extension.
          }
        ]
      }
    },

    /* CSS minify */
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './public/css/style.min.css': ['./public/css/style.css']
        }
      }
    },

    /*JS Concat*/
    concat: {
      all: {
        src: ['./public/jsapp/lib/**.js', './public/jsapp/plugins/**.js', './public/jsapp/layout/**.js', './public/jsapp/pages/**.js', './public/jsapp/**.js'],
        dest: "./public/js/script.js"
      }
    },

    /* JS minify */
    uglify: {
      my_target: {
        files: {
          './public/js/script.min.js': ['./public/js/script.js']
        }
      }
    },

    svg_sprite: {
      basic: {
        expand              : true,
        cwd                 : 'public/images',
        src                 : ['svg/**.svg'],
        dest                : '',
        options             : {
          mode            : {
            css         : {
              render  : {
                less : true
              }
            }
          }
        }
      }
    },

    sprite:{
      all: {
        src: 'public/images/sprites/*.png',
        dest: 'public/images/iconset.png',
        destCss: 'public/css/_iconset.less'
      }
    },

    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        },
        dist: {
            src: 'public/css/style.css'
        }
    },

    /* Watching for changes in project directory */
    watch: {
      /* Watching for .less files changes */
      less: {
        files: [
          './public/css/**/**.less'
        ],
        tasks: ['less:development', 'cssmin'],
        options: {
          reload: true
        }
      },
      js: {
        files: [
          './public/jsapp/**/**.js'
        ],
        tasks: ['concat', 'uglify'],
        options: {
          reload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['less', 'postcss:dist', 'cssmin', 'concat', 'uglify', 'watch']);
  grunt.registerTask('build', ['less', 'postcss:dist', 'cssmin', 'concat', 'uglify']);
  grunt.registerTask('svg', ['svg_sprite']);

};
