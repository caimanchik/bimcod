import webpack from 'webpack-stream'

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'JS',
                message: 'Error: <%= message.title %>',
            })
        ))
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            entry: {
                app: './src/js/app.js',
                main: './src/js/main.js',
                about: './src/js/about.js',
                projects: './src/js/projects.js'
            },
            output: {
                filename: '[name].min.js'
            },
            module: {
                rules: [
                    {
                        test: /\.(sass|less|css)$/,
                        use: ["style-loader", "css-loader", 'sass-loader'],
                    },
                ],
            },
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream())
}