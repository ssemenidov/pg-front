const path = require('path');
const gulp = require('gulp');
const process = require('process');
const fancylog = require("fancy-log");
const rimraf = require("rimraf");
const ftp = require('vinyl-ftp');
const fs = require('fs');
const os = require('os');
const { spawn } = require("child_process");
const dotenv = require('dotenv');

function rmbuild() {
  var cwd = process.cwd();
  let pathBuild = path.join(cwd, 'build');
  if (fs.existsSync(pathBuild)) {
    fancylog(`deleting directory ${pathBuild}  ...`);
    rimraf.sync(pathBuild);
    fancylog(`deleting done`);
  }
}

function build_production(alldone) {
  gulp.series(
    function (cb) {
      rmbuild();
      fancylog('npx react-scripts build');

      let cmd = os.platform() == "win32" ? "npx.cmd" : "npx";
      const npx = spawn(cmd, ["react-scripts", "build"]);

      npx.stdout.on("data", data => {
        fancylog(data.toString());
      });

      npx.stderr.on("data", data => {
        fancylog.error(data.toString());
      });

      npx.on('error', (error) => {
        fancylog.error(error);
      });

      npx.on("close", code => {
        fancylog(`return code: ${code}`);
        cb();
      });
    },
    function(done) { done(); alldone(); }
  )();
};


function deploy_production_ftp() {
  let production = null;
  let productionLocal = null;
  if (fs.existsSync('.env.production')) {
    let b = fs.readFileSync('.env.production');
    production = dotenv.parse(b);
  }
  if (fs.existsSync('.env.production.local')) {
    let b = fs.readFileSync('.env.production.local');
    productionLocal = dotenv.parse(b);
  }
  let getKey = (key, localCfg, commonCfg) => productionLocal[key] || production[key];

  let conn = ftp.create({
    host:      getKey("DEPLOY_URL"),
    user:      getKey("DEPLOY_LOGIN"),
    password:  getKey("DEPLOY_PASWORD"),
    parallel:  10,
    log: (data) => fancylog(data),
  });

  return gulp.src(['build/**'], {buffer: false})
    .pipe(conn.dest(getKey("DEPLOY_FOLDER")));
}

gulp.task('build', function(cb) { return build_production(cb); });
gulp.task('deploy', function() { return deploy_production_ftp(); });
gulp.task('bdeploy', function(cb) {
  return gulp.series("build", "deploy", (done) => { done(); cb(); })();
});
gulp.task('rmbuild', function(cb) { rmbuild(); cb() });
