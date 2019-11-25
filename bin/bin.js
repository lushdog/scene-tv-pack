#! /usr/bin/env node

const fs = require('fs')
const argv = require('yargs').argv
const chalk = require('chalk')
const shelljs = require('shelljs')
const config = require('../config')

const log = console.log
const { workDir, torrentDir } = require('../config')
const { s: season, n: epCount, mkt } = argv

if (typeof epCount !== 'number' || !season) {
  log(chalk.red.bold('Season name or episode number missing!'))
  process.exit(0)
}

const reg = new RegExp(/(\.S[0-9]{2}\.)/)
const [prefix, postfix] = reg.test(season) && season.split(RegExp['$1'])
const seasonNumber = RegExp['$1'].replace(/\./g, '')

const dirSeasonPath = `${workDir}/${season}`
const dirEx = fs.existsSync(dirSeasonPath)

!dirEx && fs.mkdirSync(dirSeasonPath)

log('prefix', prefix)
log('postfix', postfix)

for (let index = 1; index <= epCount; index++) {
  const epname = `${prefix}.${seasonNumber}E${String(index).padStart(2, '0')}.${postfix}`
  const epDirFilePath = `${workDir}/${epname}/${epname.toLowerCase()}`
  // const epDirPath = `${workDir}/${epname}/`
  shelljs.exec(`unrar x ${epDirFilePath}.rar ${dirSeasonPath}`)
}

const files = fs.readdirSync(dirSeasonPath)
const videoFile = files.filter(item => /\.mkv$/.test(item))

if (videoFile.length === epCount) {
  const mediainfo = shelljs.exec(`mediainfo ${dirSeasonPath}/${videoFile[0]}`, { silent: true }).stdout
  fs.writeFileSync(`${config.workDir}/${videoFile[0]}-mediainfo.txt`, mediainfo)
} else {
  log(chalk.red.bold('Episode number wrong!'))
  process.exit(0)
}

mkt && shelljs.exec(`mktorrent -v -p -l 24 -a http://announce.net -o ${torrentDir}/${season}.torrent ${dirSeasonPath}`)

mkt && log(chalk.blue(`.torrent file moved to ${torrentDir}`))

chalk.blue('---completed!')
