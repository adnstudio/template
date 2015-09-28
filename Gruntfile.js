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
            cwd: './css', // Src matches are relative to this path.
            src: ['**/style.less'], // Actual pattern(s) to match.
            dest: './css', // Destination path prefix.
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
          './css/style.min.css': ['./css/style.css']
        }
      }
    },

    /*JS Concat*/
    concat: {
      all: {
        src: ['./jsapp/**/**.js'],
        dest: "./js/bundle.js"
      }
    },

    /* JS minify */
    uglify: {
      my_target: {
        files: {
          './js/bundle.min.js': ['./js/bundle.js']
        }
      }
    },

    svg_sprite: {
      basic: {
        expand              : true,
        cwd                 : 'images',
        src                 : ['svg/**.svg'],
        dest                : '',
        options             : {
          mode            : {
            css         : {     // Activate the «css» mode
              render  : {
                less : true  // Activate CSS output (with default options)
              }
            }
          }
        }
      }
    },

    /* Watching for changes in project directory */
    watch: {
      /* Watching for .less files changes */
      less: {
        files: [
          './css/**/**.less'
        ],
        tasks: ['less:development', 'cssmin'],
        options: {
          reload: true
        }
      },
      js: {
        files: [
          './jsapp/**/**.js'
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

  grunt.registerTask('default', ['less', 'cssmin', 'concat', 'uglify', 'watch']);
  grunt.registerTask('build', ['less', 'watch']);
  grunt.registerTask('sprite', ['svg_sprite']);

};
