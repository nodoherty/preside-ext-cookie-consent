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
				, files: [{
					  expand  : true
					, cwd     : "css/"
					, src     : ["specific/**/*.less"]
					, dest    : "css/"
					, ext     : ".css"
					, rename  : function( dest, src ){
						var pathSplit = src.split( "/" );
						pathSplit[ pathSplit.length-1 ] = pathSplit[ pathSplit.length-1 ];
						return dest + pathSplit.join( "/" );
					}
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
				, rename : function( dest, src ){
					var pathSplit = src.split( '/' );
					pathSplit[ pathSplit.length-1 ] = "_" + pathSplit[ pathSplit.length-2 ] + ".min.css";
					return dest + pathSplit.join( "/" );
				}
			}
		},

		rename: {
			assets: {
				  expand : true
				, cwd    : ""
				, src    : '**/*._*.min.css'
				, dest   : ""
				, rename : function( dest, src ){
					var pathSplit = src.split( '/' );
					pathSplit[ pathSplit.length-1 ] = "_" + pathSplit[ pathSplit.length-1 ].replace( /\._/, "." );
					return dest + pathSplit.join( "/" );
				}
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