import fs from 'fs'
import fonterFix from 'gulp-fonter-fix'
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
    return app.gulp.src(app.path.srcFolder + '/fonts/*.otf', {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= message.title %>',
            })
        ))
        .pipe(fonterFix({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
        .pipe(app.plugins.browserSync.stream())
}

export const ttfToWoff = () => {
    return app.gulp.src(app.path.srcFolder + '/fonts/*.ttf', {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= message.title %>',
            })
        ))
        .pipe(fonterFix({
            formats: ['woff']
        }))
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.gulp.src(app.path.srcFolder + '/fonts/*.ttf', {}))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.plugins.browserSync.stream())
}

export const fontsStyle = () => {
    let fontsFile = app.path.srcFolder + '/scss/fonts.scss'
    fs.readdir(app.path.build.fonts, function (err, fontsFiles){
        if (fontsFiles){
            if(!fs.exists(fontsFile, cb)){
                fs.writeFile(fontsFile, '', cb)
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++){
                    let fontFileName = fontsFiles[i].split('.')[0]
                    if (newFileOnly !== fontFileName){
                        let split = fontFileName.split('-')
                        let fontName = split[0] ? split[0] : fontFileName;
                        let fontWeight = split[1] ? split[1] : fontFileName;

                        let lowerCased = fontWeight.toLowerCase()
                        fontWeight = lowerCased === 'thin' ? 100
                            : lowerCased === 'extralight' ? 200
                                : lowerCased === 'light' ? 300
                                    : lowerCased === 'medium' ? 500
                                        : lowerCased === 'semibold' ? 600
                                            : lowerCased === 'bold' ? 700
                                                : lowerCased === 'extrabold' || lowerCased === 'heavy' ? 800
                                                    : lowerCased === 'black' ? 900
                                                        : 400;

                        fs.appendFile(fontsFile,
                            `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
                            cb)
                    } else
                        console.log('file "fonts.scss" is existing')
                }
            }
        }
    })

    return app.gulp.src(`${app.path.srcFolder}`)

    function cb () {}
}