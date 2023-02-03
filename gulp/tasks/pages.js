import fileinclude from "gulp-file-include";
import versionNumber from "gulp-version-number";

export const pages = () => {
  return app.gulp
    .src(app.path.src.pages)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(app.plugins.replace(/@public\//g, "../"))
    .pipe(app.plugins.replace(/css\//g, "../css/"))
    .pipe(app.plugins.replace(/js\//g, "../js/"))
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: `${app.path.buildFolder}/version.json`,
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.pages))
    .pipe(app.plugins.browsersync.stream());
};
