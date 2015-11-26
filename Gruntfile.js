// 包装函数
module.exports = function(grunt) {
 
  // 任务配置,所有插件的配置信息
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // uglify插件的配置信息
    uglify: {
        options: {
          banner: '/*! This is uglify test - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */',
          beautify: true,//是否压缩
          mangle: false, //不混淆变量名
          compress:true,//打开或关闭使用默认选项源压缩。 
          preserveComments: 'all', //不删除注释
        },
        app_task: {
          files: {
            'build/app.min.js': ['lib/index.js', 'lib/test.js']
          }
        },
        buildb:{//任务二：压缩b.js，输出压缩信息
            options: {
                report: "min"//输出压缩率，可选的值有 false(不输出信息)，gzip
            },
            files: {
                'output/js/b.min.js': ['js/main/b.js']
            }
        },
        buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
            files: [{
                expand:true,
                cwd:'js',//js目录下
                src:'**/*.js',//所有js文件
                dest: 'output/js'//输出到此目录下
            }]
        },
        release: {//任务四：合并压缩a.js和b.js
            files: {
                'output/js/index.min.js': ['js/a.js', 'js/main/b.js']
            }
        }
    },
	
	// watch插件的配置信息
	watch: {
		another: {
			files: ['lib/*.js'],
			tasks: ['uglify'],
			options: {
				// Start another live reload server on port 1337
				livereload: 1337
			}
		}
	},
	
	//stylus
	stylus:{
		build: {
			options: {
				linenos: false,
				compress: false,
				banner: '\/** \n * <%= pkg.name %> - <%= pkg.description %>\n * version <%= pkg.version %> \n * author <%= pkg.author %> \n * date <%= grunt.template.today() %> \n**/\n'
			},
			files: [{
				'css/historyDetail.css': 'styl/historyDetail.styl'
			}]
		}
	}
  });
 
  // 告诉grunt我们将使用插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
 
  // 告诉grunt当我们在终端中输入grunt时需要做些什么
  grunt.registerTask('default', ['uglify','watch']);
 
};