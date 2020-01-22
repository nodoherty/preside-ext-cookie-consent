module.exports = function( grunt ) {

	grunt.loadNpmTasks( "grunt-contrib-cssmin" );
	grunt.loadNpmTasks( "grunt-contrib-less"   );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch"  );

	grunt.registerTask( "default", [ "uglify", "less", "cssmin" ] );

	grunt.initConfig( {

		uglify: {
			options:{
				  sourceMap : true
			},
			specific:{
				files: [{
					expand  : true,
					cwd     : "js/specific/cookie-consent/",
					src     : ["*.js", "!*.min.js" ],
					dest    : "js/specific/cookie-consent/",
					ext     : ".min.js"
				}]
			}
		},

		less: {
			  options  : { }
			, specific : {
				files: [{
					  expand  : true
					, cwd     : "css/specific/cookie-consent/"
					, src     : [ "*.less" ]
					, dest    : "css/specific/cookie-consent/"
					, ext     : ".css"
				}]
			}
		},

		cssmin: {
			specific: {
				  expand : true
				, cwd    : "css/specific/cookie-consent/"
				, src    : [ "*.css", "!*.min.css" ]
				, ext    : ".min.css"
				, dest   : "css/specific/cookie-consent/"
			}
		},

		watch: {
			scripts: {
				  files : [ "css/**/*.less", "js/**/*.js", "!css/**/*.min.css", "!js/**/*.min.js" ]
				, tasks : [ "default" ]
			}
		}

	} );
};