
// const latexQuestions = [
//   '\\int_{0}^{\\infty} e^{-x^2} \\; dx = \\sqrt{\\pi}',
//   '\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}',
//   '\\frac{a}{b}',
//   '\\draw (0,0) circle(2);', // LaTeX for a 2D diagram (circle)
//   '\\draw (0,0) rectangle(4,4);', // LaTeX for a 2D diagram (rectangle)
//   '\\draw (0,0) -- (2,2) -- (4,0);', // LaTeX for a 2D diagram (triangle)
// ];

// const renderLatexToSvg = (latex: any) => {
//   return new Promise((resolve, reject) => {
//     mjAPI.typeset({
//       math: latex,
//       format: 'TeX',
//       svg: true,
//     }, (data: any) => {
//       if (data.errors) {
//         reject('Error rendering LaTeX');
//       } else {
//         resolve(data.svg);
//       }
//     });
//   });
// };

// const renderLatexDiagramToSvg = (latex: any) => {
//   return new Promise((resolve, reject) => {
//     const tmpDir = path.join(__dirname, 'tmp'); // Ensure the directory exists
//     if (!fs.existsSync(tmpDir)) {
//       fs.mkdirSync(tmpDir);
//     }
//     const latexFilePath = path.join(__dirname, 'tmp', 'diagram.tex');  // Temporary file for LaTeX input
//     const svgFilePath = path.join(__dirname, 'tmp', 'diagram.svg');
//     const latexDocument = `
//     \\documentclass{standalone}
//     \\usepackage{tikz}
//     \\begin{document}
//     ${latex}
//     \\end{document}
//     `;
//     fs.writeFileSync(latexFilePath, latexDocument);
//     exec(`pdflatex -output-format=svg -interaction=nonstopmode -shell-escape ${latexFilePath}`, (err: any, stdout: any, stderr: any) => {
//       if (err || stderr) {
//         console.error('LaTeX Compilation Error:', err);
//         console.error('LaTeX Compilation stderr:', stderr);
//         reject('Error rendering LaTeX diagram');
//       } else {
//         console.log('LaTeX Compilation stdout:', stdout);
//         try {
//           const svg = fs.readFileSync(svgFilePath, 'utf-8');
//           resolve(svg);
//         } catch (readError) {
//           console.error('Error reading SVG file:', readError);
//           reject('Error reading generated SVG');
//         }
//       }
//     });
//   });
// };


// app.get('/latex', async (req: any, res: any) => {
//   try {
//     const latexPromises = latexQuestions.map(async (latex: any) => {
//       if (latex.includes('\\draw')) {
//         try {
//           const diagramSvg = await renderLatexDiagramToSvg(latex);
//           return { svg: diagramSvg, type: 'diagram', latex };
//         } catch (err) {
//           return { svg: '', type: 'diagram', error: err };
//         }
//       } else {
//         const mathSvg = await renderLatexToSvg(latex);
//         return { svg: mathSvg, type: 'math', latex };
//       }
//     });
//     const rendered = await Promise.all(latexPromises);
//     res.json({ questions: rendered });
//   } catch (err) {
//     console.error('Error rendering LaTeX:', err);
//     res.status(500).send('Error rendering LaTeX');
//   }
// });