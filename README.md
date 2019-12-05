# scene-tv-pack
packing scene bluray tv release.

## To install

install node.js

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

`nvm install stable`

`git clone https://github.com/lushdog/scene-tv-pack.git`

`cd scene-tv-pack && npm link`

### copy config.example.js to config.js. edit config.js, workDir is sigle episode path

## To use

`tvpack -s=The.Handmaids.Tale.S03.720p.BluRay.x264-MAYHEM -n=13 --mkt`

### Params

`s: season name`,
`n: episodes number`,
`mkt: make torrent file`
