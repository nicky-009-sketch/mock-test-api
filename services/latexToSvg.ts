const mjAPI = require("mathjax-node");

mjAPI.config({
 MathJax: {
  tex: {
   inlineMath: [['$', '$'], ['\\(', '\\)']],
   displayMath: [['$$', '$$'], ['\\[', '\\]']],
   processEscapes: true
  }
 }
});
mjAPI.start();


const renderLatexToSvg = (latex: any) => {
 return new Promise((resolve, reject) => {
  mjAPI.typeset({
   math: latex,
   format: 'TeX',
   svg: true,
  }, (data: any) => {
   if (data.errors) {
    reject('Error rendering LaTeX');
   } else {
    resolve(data.svg);
   }
  });
 });
};

const renderLatexDiagramToSvg = (latex:any) => {
 console.log('pending')
}


export { renderLatexToSvg, renderLatexDiagramToSvg }
