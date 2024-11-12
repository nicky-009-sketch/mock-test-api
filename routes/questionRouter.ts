import express, { Request, Response } from 'express';
import { ValidationHelper } from '../helpers/validationHelper';
import { questionModel } from '../models/questionModel';
import { renderLatexDiagramToSvg, renderLatexToSvg } from '../services/latexToSvg';
const questionRouter = express.Router();
const vh = ValidationHelper.singleton;
const qesModel = new questionModel();

questionRouter.post('/test-questions', async (req: Request, res: Response) => {
  try {
    const validationResult = vh.testQuestionsPostRequest(req.body, 'body')
    if (validationResult.invalid) {
      const reason = validationResult.reason[0];
      return res.status(417).json({ status: "Validationfailedure", message: reason });
    }
    const { testId } = validationResult?.data
    const questionRes = await qesModel.list(testId)
    res.status(200).json({ status: "success", data: questionRes });
  } catch (error) {
    console.log(error)
    console.log('error', error)
    return res.status(500).json({ status: "failed", "message": "something went wrong" });
  }
})

const latexQuestions = [
  '\\begin{array}{|c|c|c|} \\hline \\text{id} & \\text{marks} & \\text{duration} \\\\ \\hline 1 & 100 & 60 \\\\ 2 & 100 & 60 \\\\ 3 & 100 & 60 \\\\ 4 & 100 & 60 \\\\ 5 & 100 & 60 \\\\ 6 & 100 & 60 \\\\ 7 & 100 & 60 \\\\ 8 & 100 & 60 \\\\ 9 & 100 & 60 \\\\ 10 & 100 & 60 \\\\ 11 & 100 & 60 \\\\ \\hline \\end{array}',
  '\\int_{0}^{\\infty} e^{-x^2} \\; dx = \\sqrt{\\pi}',
  '\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}',
  '\\frac{a}{b}',
  'E = mc^2',
  'x^2 + y^2 = r^2',
  '\\sqrt{a^2 + b^2}',
  '\\alpha + \\beta = \\gamma',
  '\\sin(\\theta) = \\frac{opposite}{hypotenuse}',
  'x + y = 10',
  '\\log_b(x) = \\frac{\\ln(x)}{\\ln(b)}',
  '\\frac{d}{dx} (e^{x^2}) = 2x e^{x^2}',
];


questionRouter.get('/latex', async (req: any, res: any) => {
  try {
    const latexPromises = latexQuestions.map(async (latex: any) => {
      if (latex.includes('\\draw')) {
        try {
          const diagramSvg = await renderLatexDiagramToSvg(latex);
          return { svg: diagramSvg, type: 'diagram', latex };
        } catch (err) {
          return { svg: '', type: 'diagram', error: err };
        }
      } else {
        const mathSvg = await renderLatexToSvg(latex);
        return { svg: mathSvg, type: 'math', latex };
      }
    });
    const rendered = await Promise.all(latexPromises);
    res.json({ questions: rendered });
  } catch (err) {
    console.error('Error rendering LaTeX:', err);
    res.status(500).send('Error rendering LaTeX');
  }
});



















const latex = `
\\This is some inline text: E = mc^2. 
Now a table: 
\\begin{array}{|c|c|c|}
\\hline
A & B & C \\\\
\\hline
1 & 2 & 3 \\\\
4 & 5 & 6 \\\\
\\hline
\\end{array}
And here is another formula: \\frac{a}{b} = c.
`;

const mathjax = require("mathjax-node");
mathjax.config({
  MathJax: {
    jax: ['input/TeX', 'output/SVG'],
    extensions: ['tex2jax.js', 'AMSmath.js', 'AMSsymbols.js'],
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
    }
  }
});
mathjax.start();
function convertLatexToSvg(latexString: any) {
  return new Promise((resolve, reject) => {
    mathjax.typeset({
      math: latexString,
      format: 'TeX',
      svg: true
    }, function (data: any) {
      if (data.errors) {
        reject(data.errors);
        // console.log('error', data.errors)
      } else {
        resolve(data);
        // console.log('data', data)
      }
    });
  });
}

questionRouter.get('/render-latex', async (req: any, res: any) => {
  try {
    if (!latex) {
      return res.status(400).send('LaTeX input is required');
    }
    const svg = await convertLatexToSvg(latex);
    console.log(svg);
    // res.setHeader('Content-Type', 'image/svg+xml');
    res.json({ questions: svg })
  } catch (error) {
    console.error('Error rendering LaTeX to SVG:', error);
    res.status(500).send('Error rendering LaTeX.');
  }
});







export { questionRouter }


































// questionRouter.get('/render-latex', async (req, res) => {
//   // const latex = '\\begin{array}{|c|c|c|} \\hline \\text{id} & \\text{marks} & \\text{duration} \\\\ \\hline 1 & 100 & 60 \\\\ 2 & 100 & 60 \\\\ 3 & 100 & 60 \\\\ 4 & 100 & 60 \\\\ 5 & 100 & 60 \\\\ \\hline \\end{array}';
//   // const latex = `\\text{Solve the quadratic equation } \\ x^2 - 5x + 6 = 0 \\ .`;
//   const latex = `\\documentclass{article} \\usepackage[table,xcdraw]{xcolor} \\begin{document} \\begin{array}{|>{\\columncolor{gray!20}}c|c|c|} \\hline \\rowcolor{gray!50} \\textbf{id} & \\textbf{marks} & \\textbf{duration} \\\\  \\hline 1 & 100 & 60 \\\\ 2 & 100 & 60 \\\\ 3 & 100 & 60 \\\\ 4 & 100 & 60 \\\\ 5 & 100 & 60 \\\\ \\hlin \\end{array} \\end{document}`;
//   try {
//     const svg = await convertLatexToSVG(latex);
//     // const svg = await renderLatexToSvg(latex);
//     res.set('Content-Type', 'image/svg+xml');
//     res.send(svg);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error rendering LaTeX.");
//   }
// });

// questionRouter.get('/latex', async (req: any, res: any) => {
//  try {
//   const latexPromises = latexQuestions.map((latex) => mjAPI.typeset({
//    math: latex,
//    format: 'TeX',
//    svg: true,
//   }));
//   const rendered: any = await Promise.all(latexPromises);
//   const result = rendered.map((data: any, index: number) => ({
//    speakText: latexQuestions[index],
//    svg: data.svg,
//    width: data.width,
//    height: data.height,
//    style: data.style,
//   }));
//   res.json({ questions: result });
//  } catch (err) {
//   console.error('Error rendering LaTeX:', err);
//   res.status(500).send('Error rendering LaTeX');
//  }
// });









// const generateHtml = (questionsHtml: any) => {
//   return `
//   <html>
//       <head>
//         <style>
//           body {
//             margin: 0;
//             padding: 0;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100%;
//             background-color: #f0f0f0;
//             font-size: 20px;  /* Apply font size for all content */
//             font-family: Arial, sans-serif;
//           }
//           .katex {
//             font-size: 20px !important;  /* Override KaTeX font size */
//           }
//         </style>
//         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/katex/0.13.11/katex.min.css" />
//         <script src="https://cdnjs.cloudflare.com/ajax/libs/katex/0.13.11/katex.min.js"></script>
//       </head>
//       <body style="padding: 20px;">
//         <div>${questionsHtml}</div>
//       </body>
//     </html>
//   `;
// };
// const katex = require('katex');
// questionRouter.get('/katex', async (req: any, res: any) => {
//   try {
//     // const latexPromises = latexQuestions.map(async (latex: any) => {
//     //   const renderedHtml = katex.renderToString(latex, { throwOnError: false });
//     //   const fullHtml = generateHtml(renderedHtml)
//     //   return { htmlContent: fullHtml };
//     // });
//     // const rendered = await Promise.all(latexPromises);
//     // res.setHeader('Content-Type', 'application/json');
//     // res.json({ questions: rendered });

//     const latexPromises = latexQuestions.map(latex => {
//       // Render LaTeX to HTML with KaTeX
//       const renderedHtml = katex.renderToString(latex, { throwOnError: false });
//       const fullHtml = generateHtml(renderedHtml);  // Wrap rendered content in HTML template
//       return { htmlContent: fullHtml };
//     });
//     const rendered = await Promise.all(latexPromises);
//     res.setHeader('Content-Type', 'application/json');
//     res.json({ questions: rendered });
//   } catch (err) {
//     console.error('Error rendering LaTeX:', err);
//     res.status(500).send('Error rendering LaTeX');
//   }
// })