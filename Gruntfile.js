/* eslint import/no-extraneous-dependencies: 0 */

module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-zip');

  grunt.initConfig({

    clean: {
      build: ['dist/*'],
      tmp: ['custom-worldmap'],
      release: ['custom-worldmap.zip']
    },

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*.css', '**/*.html', '**/*.json', '!**/*.js', '!**/*.scss'],
        dest: 'dist'
      },
      pluginDef: {
        expand: true,
        src: [ 'README.md', 'CHANGELOG.md' ],
        dest: 'dist',
      },
      img_to_dist: {
        cwd: 'src/images',
        expand: true,
        flatten: true,
        src: ['*.*'],
        dest: 'dist/images/'
      },
      dist_to_tmp: {
        cwd: 'dist/',
        expand: true,
        src: ['**/*'],
        dest: 'custom-worldmap'
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of'],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      },
    },

    zip: {
      'custom-worldmap.zip': ['custom-worldmap/**/*']
    }

  });

  grunt.registerTask('default', ['clean:build', 'copy:src_to_dist', 'copy:pluginDef', 'copy:img_to_dist', 'babel', 'clean:release', 'clean:tmp', 'copy:dist_to_tmp', 'zip', 'clean:tmp']);
};
