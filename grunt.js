module.exports = function(grunt){
	grunt.initConfig({
		pkg: '<json:package.json>',
        meta: {
            banner: '/**\n'+
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
					' * <%= pkg.name %> - v<%= pkg.version %> \n' +
					' * @author <%=pkg.author.name%> <<%=pkg.author.email%>>\n' +
					' * @license <%= _.pluck(pkg.licenses, "url").join(", ")\n'+
                    ' */'
        },
		min : {
			dist : {
				src: 'src/removablearea.js',
				dest: 'jquery.removablearea.min.js'
			}
		},
		concat : {
			dist : {
				src : [ '<banner>', 'jquery.removablearea.min.js'],
				dest: 'jquery.removablearea.min.js'
			}
		},
		qunit : {
			all : ['test/*.html']
		},
		lint : {
			files : ['src/*.js']
		},
		jshint : {
			options: {
				browser : true,
				smarttabs : true
			},
			globals: {
				jQuery : true
			}
		}
	});
    grunt.registerTask('default', 'lint qunit min concat');
};
