// 包装函数
module.exports = function(grunt){
	// 任务配置，所有插件的配置信息
	grunt.initConfig({
		// 获取package的信息
		pkg: grunt.file.readJSON('package.json'),
		// uglify 代码压缩插件的配置
		uglify: {
			options:{
				stripBanners:true,
				banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
			},
			build:{
				src:'./util/util.js',
				dest:'./build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			}
		},
		// js代码语法检查插件
		jshint: {
			build: ['orther_js_dir','./util/*.js'],
			options:{
				// 已何种方式检查
				jshintrc:'.jshintrc'
			}
		},
		// css代码语法检查插件
		csslint: {
			build: ['orther_css_dir','./public/stylesheets/*.css'],
			options:{
				// 已何种方式检查
				jshintrc:'.csslintrc'
			}
		},
		// watch 自动化监听
		watch: {
			js: {
				files:['dao/*.js','routes/*.js','util/*.js','./gruntfile.js'],//检查目录的文件变化
				tasks:['jshint','uglify'],
				options:{
					livereload:true
				}
			},
			jade:{
				files:['views/**'],
				options:{
					livereload:true
				}
			},
			options:{
				// 
				spawn:false
			}
		},
		// 程序的启动入口文件配置
		nodemon: {
		  dev: {
		    script: './bin/www',
		    options: {
		      args: ['dev'],
		      env: {
		        PORT: '2017'
		      },
		      cwd: __dirname,
		      ignore: ['node_modules/**','README.md'],
  	          watchedExtensions: ['js'],
		      watchedFolders: ['./bin','./config','./dao','./routes','./util'],
		      delay: 100,
		      legacyWatch: true,
		      debug:false
		    }
		  }
		},
		// 自动化测试插件的配置 grunt-mocha-test
		mochaTest:{
			options:{
				reporter:'spec',
				// clearRequireCache:true
			},
			src:['test/**/*.js']
		},
		// 配置：同时执行多个缓慢任务
		concurrent:{
			target:{
				tasks:['nodemon','watch'],
				options:{
					logConcurrentOutput:true
				}
			}

		}



	});
	// 告诉grunt加载何种插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');
	// 注册任务，grunt是按任务先后顺序来跑的
	grunt.registerTask('default',['concurrent:target']);
	grunt.registerTask('test',['mochaTest']);
};

// 小插曲｛grunt支持的控件｝
/*
Contrib-jshint——javascript语法错误检查;
Contrib-csslint——css语法错误检查;
Contrib-watch——实时监控文件变化、调用相应的任务重新执行；
Contrib-clean——清空文件、文件夹；
Contrib-uglify——压缩javascript代码
Contrib-cssmin——压缩css代码
Contrib-copy——复制文件、文件夹
Contrib-concat——合并多个文件的代码到一个文件中
karma——前端自动化测试工具
*/