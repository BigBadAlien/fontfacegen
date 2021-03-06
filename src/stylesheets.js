const fs = require('fs');
const path = require('path');
const encodeFont = require('./encode.js');
const { has } = require('./helpers.js');

function css(stylesheet, name, filename, weight, style, woff2, woff, ttf, svg, embedSvg) {
  const resultLines = [
    '@font-face {',
    `    font-family: "${name}";`,
    `    src: url("${filename}.eot");`,
    `    src: url("${filename}.eot?#iefix") format("embedded-opentype"),`,
    `         url(${woff2}) format("woff2"),`,
    `         url(${woff}) format("woff"),`,
    `         url(${ttf}) format("ttf"),`,
  ];

  if (embedSvg) {
    resultLines.push(`         url(${svg}) format("svg");`);
  } else {
    resultLines.push(`         url("${filename}.svg#${name}") format("svg");`);
  }

  resultLines.push(
    `    font-style: ${style};`,
    `    font-weight: ${weight};`,
    '}'
  );

  const result = resultLines.join('\n');

  fs.writeFileSync(stylesheet, result);
  return result;
}

function less(stylesheet, name, filename, weight, style, woff2, woff, ttf, svg, embedSvg) {
  const resultLines = [
    '@font-face {',
    `    font-family: "${name}";`,
    `    src: url("${filename}.eot");`,
    `    src: url("${filename}.eot?#iefix") format("embedded-opentype"),`,
    `         url(${woff2}) format("woff2"),`,
    `         url(${woff}) format("woff"),`,
    `         url(${ttf}) format("ttf"),`,
  ];

  if (embedSvg) {
    resultLines.push(`         url(${svg}) format("svg");`);
  } else {
    resultLines.push(`         url("${filename}.svg#${name}") format("svg");`);
  }

  resultLines.push(
    `    font-weight: ${weight};`,
    `    font-style: ${style};`,
    '}'
  );

  const result = resultLines.join('\n');

  fs.writeFileSync(stylesheet, result);
  return result;
}

function scss(stylesheet, name, filename, weight, style, woff2, woff, ttf, svg, embedSvg) {
  const resultLines = [
    '@font-face {',
    `    font-family: "${name}";`,
    `    src: url("${filename}.eot");`,
    `    src: url("${filename}.eot?#iefix") format("embedded-opentype"),`,
    `         url(${woff2}) format("woff2"),`,
    `         url(${woff}) format("woff"),`,
    `         url(${ttf}) format("ttf"),`,
  ];

  if (embedSvg) {
    resultLines.push(`         url(${svg}) format("svg");`);
  } else {
    resultLines.push(`         url("${filename}.svg#${name}") format("svg");`);
  }

  resultLines.push(
    `         url("${filename}.svg#${name}") format("svg");`,
    `    font-weight: ${weight};`,
    `    font-style: ${style};`,
    '}'
  );

  const result = resultLines.join('\n');

  fs.writeFileSync(stylesheet, result);
  return result;
}

module.exports = config => {
  let woff;
  let woff2;
  let ttf;
  let svg;
  let embedSvg;

  const name = config.name;
  const filename = (config.collate)
    ? path.join(config.css_fontpath, config.basename, config.basename)
    : path.join(config.css_fontpath, config.basename);
  const weight = config.weight;
  const style = config.style;

  woff2 = `"${filename}.woff2"`;
  woff = `"${filename}.woff"`;
  ttf = `"${filename}.ttf"`;

  if (has(config.embed, 'woff2')) {
    woff2 = encodeFont(config.woff2);
  }
  if (has(config.embed, 'woff')) {
    woff = encodeFont(config.woff);
  }
  if (has(config.embed, 'ttf')) {
    ttf = encodeFont(config.ttf);
  }
  if (has(config.embed, 'svg')) {
    svg = encodeFont.svg(config.svg);
    embedSvg = true;
  } else {
    embedSvg = false;
  }
  if (config.css) {
    css(config.css, name, filename, weight, style, woff2, woff, ttf, svg, embedSvg);
  }
  if (config.less) {
    less(config.less, name, filename, weight, style, woff2, woff, ttf, svg, embedSvg);
  }
  if (config.scss) {
    scss(config.scss, name, filename, weight, style, woff2, woff, ttf, svg, embedSvg);
  }
};
