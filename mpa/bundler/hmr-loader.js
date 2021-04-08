const tpl = `\n
;if(module.hot){
  module.hot.accept()
}
`;

function hmrLoader(source) {
  return (source += tpl);
}

module.exports = hmrLoader;
