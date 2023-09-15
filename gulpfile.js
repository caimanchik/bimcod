import gulp from "gulp";

import { path } from "./gulp/config/path.js"
import { plugins } from "./gulp/config/plugins.js"

global.app = {
    path,
    gulp,
    plugins,
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
}

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import {svg} from "./gulp/tasks/svgSprite.js";
import {zip} from "./gulp/tasks/zip.js";
import {ftp} from "./gulp/tasks/ftp.js";

function watcher(cb) {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
    cb()
}

function waitAfterReset(done) {
    setTimeout(() => {
        done()
    }, 300);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images))
const build = gulp.series(reset, mainTasks)
const deployZIP = gulp.series(reset, waitAfterReset, mainTasks, zip)
const deployFTP = gulp.series(reset, waitAfterReset, mainTasks, ftp)
const dev = gulp.series(
    reset,
    mainTasks, watcher, server
);

gulp.task("default", dev)
gulp.task("svg", svg)
gulp.task("build", build)
gulp.task("zip", deployZIP)
gulp.task("ftp", deployFTP)
