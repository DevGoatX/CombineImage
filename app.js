
// Main ipfs worker
require('@babel/register');
const {Op} = require('sequelize');
const _ = require('lodash');
const sharp = require('sharp');
const {pinata, getContentUrl} = require('./services/pinata');
const temp = require('temp');

const path = require('path');
const fs = require('fs');


const assetPath = __dirname + '/assets';
const outputPath = __dirname + '/output';

function getRandomIndex() {
    return Math.floor(Math.random() * 3) + 1;
}

async function generate() {    
  for (let i = 0; i < Math.pow(3, 3); i++) {
    await generateFile();
  }

}

async function generateFile() {

  // merge image
  let img = sharp(assetPath + `/background/${getRandomIndex()}.png`);

  const composits = [{input: assetPath + `/face.png`}];
  composits.push({input: assetPath + `/eye and mouth/${getRandomIndex()}.png`});
  composits.push({input: assetPath + `/glasses/${getRandomIndex()}.png`});
  composits.push({input: assetPath + `/hair/${getRandomIndex()}.png`});
  composits.push({input: assetPath + `/clothes/${getRandomIndex()}.png`});
  composits.push({input: assetPath + `/weapon/${getRandomIndex()}.png`});
  img.composite(composits);

  const fileName = fs.readdirSync(outputPath).length.toString() + '.png';
  const output = outputPath +  `/${fileName}`;
  console.log('--------- output: ', output);
  await img.toFile(output);
}


// load temp
temp.track();

// Start generate
generate().then(() => {

}).catch(err => {
  console.log(err);
});
