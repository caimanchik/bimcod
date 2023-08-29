import svgSprite from 'gulp-svg-sprite'

export const svg = () => {
    return app.gulp.src(app.path.src.svgIcons, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SPRITES',
                message: 'Error: <%= message.title %>',
            })
        ))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../icons/icons.svg',
                    example: true,
                }
            }
        }))

        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browserSync.stream())
}