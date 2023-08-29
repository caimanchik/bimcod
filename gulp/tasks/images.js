import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'

export const images = () => {
    return app.gulp.src(app.path.src.images, { sourcemaps: true })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'IMAGES',
                message: 'Error: <%= message.title %>',
            })
        ))
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webp()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images))
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images))
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images))
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: true}],
                    interplaced: true,
                    optimizationLevel: 3,
                }))
        )
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.gulp.src(app.path.src.svgIcons))
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browserSync.stream())
}