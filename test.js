// @ts-nocheck

// 局部模式
const shell = require('shelljs');


// 不能在一股脑全部添加了
const options = {
    host: '47.99.78.253',
    port: '21',
    user: 'dev_jingjin_sit',
    password: 'NCERzbAsZ6xez7Xt',
    // proxy:{
    //   host: '',
    //   port: '',
    // }
}


let FtpDeploy = require('ftp-deploy');

let ftpDeploy = new FtpDeploy();

let config = {
    ...options,
    localRoot: __dirname + '/unpackage/dist/build/h5',
    remoteRoot: '/member/fre/',
    include: ['*', '**/*'], // this would upload everything except dot files
    // include: ["*.php", "dist/*", ".*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    // exclude: ["dist/**/*.map", "node_modules/**", "node_modules/**/.*", ".git/**"],
    // exclude: ['static/kindeditor/**'],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: true,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: false,
};

// use with promises
// ftpDeploy
//   .deploy(config)
//   .then(res => console.log('finished:', res))
//   .catch(err => {
//     let { message, name } = err;
//     console.log({
//       name,
//       message
//     });
//   });

// use with callback
ftpDeploy.deploy(config, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('finished:', res);
        process.exit();
    }
});

ftpDeploy.on('uploading', function(data) {
    // console.log(data.totalFilesCount); // total file count being transferred
    // console.log(data.transferredFileCount); // number of files transferred
    // console.log(`start up ${data.filename} ，fileSize ${data.totalFilesCount}`); // partial path with filename being uploaded
});
ftpDeploy.on('uploaded', function(data) {
    console.log('\033[33m '+data.filename+' upload done \033[39m'); // same data as uploading event
});
ftpDeploy.on('log', function(data) {
    // console.log(data); // same data as uploading event
});
ftpDeploy.on('upload-error', function(data) {
    console.log(data.err); // data will also include filename, relativePath, and other goodies
});
