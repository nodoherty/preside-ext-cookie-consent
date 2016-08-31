module.exports = function( grunt ) {

	grunt.loadNpmTasks( "grunt-contrib-cssmin" );
	grunt.loadNpmTasks( "grunt-contrib-less"   );
	grunt.loadNpmTasks( "grunt-contrib-rename" );
	grunt.loadNpmTasks( "grunt-contrib-watch"  );

	grunt.registerTask( "default", [ "less", "cssmin" ] );

	grunt.initConfig( {

		less: {
			  options  : { }
			, specific : {
				files: [{
					  expand  : true
					, cwd     : "css/"
					, src     : ["specific/**/*.less"]
					, dest    : "css/"
					, ext     : ".css"
				}]
			}
		},

		cssmin: {
			specific: {
				  expand : true
				, cwd    : "css/"
				, src    : [ "specific/**/*.css", "!**/_*.min.css" ]
				, ext    : ".min.css"
				, dest   : "css/"
			}
		},

		watch: {
			scripts: {
				  files : [ "css/**/*.less", "!js/**/*.min.css" ]
				, tasks : [ "default" ]
			}
		}

	} );
};