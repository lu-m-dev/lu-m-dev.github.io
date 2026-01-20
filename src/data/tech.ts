/**
 * Technology categories configuration.
 */

import type { TechCategory } from '../types'

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Web Development',
    icon: 'LuCode',
    items: [
      { name: 'HTML5', slug: 'html5', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5', desc: 'Semantic markup for the web' },
      { name: 'CSS', slug: 'css', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', desc: 'Styling language for documents' },
      { name: 'JavaScript', slug: 'javascript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', desc: 'Programming language of the web' },
      { name: 'TypeScript', slug: 'typescript', url: 'https://www.typescriptlang.org/', desc: 'Typed superset of JavaScript' },
      { name: 'React', slug: 'react', url: 'https://react.dev/', desc: 'UI library for building interfaces' },
      { name: 'Next.js', slug: 'nextdotjs', url: 'https://nextjs.org/', desc: 'React framework for production', theme: 'dark' },
      { name: 'Node.js', slug: 'nodedotjs', url: 'https://nodejs.org/', desc: 'JavaScript runtime for servers' },
      { name: 'Git', slug: 'git', url: 'https://git-scm.com/', desc: 'Distributed version control' },
      { name: 'GitHub', slug: 'github', url: 'https://github.com/', desc: 'Code hosting and collaboration', theme: 'dark' },
    ],
  },
  {
    title: 'Data Science',
    icon: 'LuBrainCircuit',
    items: [
      { name: 'Python', slug: 'python', url: 'https://www.python.org/', desc: 'General-purpose programming language' },
      { name: 'Pandas', slug: 'pandas', url: 'https://pandas.pydata.org/', desc: 'Data analysis library', theme: 'dark' },
      { name: 'NumPy', slug: 'numpy', url: 'https://numpy.org/', desc: 'Numerical computing library', theme: 'dark' },
      { name: 'scikit-learn', slug: 'scikitlearn', url: 'https://scikit-learn.org/', desc: 'Machine learning tools' },
      { name: 'TensorFlow', slug: 'tensorflow', url: 'https://www.tensorflow.org/', desc: 'End-to-end ML platform' },
      { name: 'PyTorch', slug: 'pytorch', url: 'https://pytorch.org/', desc: 'Deep learning framework' },
      { name: 'SciPy', slug: 'scipy', url: 'https://www.scipy.org/', desc: 'Scientific computing tools' },
      { name: 'OpenCV', slug: 'opencv', url: 'https://opencv.org/', desc: 'Computer vision library' },
      { name: 'Anaconda', slug: 'anaconda', url: 'https://www.anaconda.com/', desc: 'Data science distribution' },
      { name: 'R', slug: 'r', url: 'https://www.r-project.org/', desc: 'Statistical computing language' },
    ],
  },
  {
    title: 'Engineering',
    icon: 'LuCog',
    items: [
      { name: 'AutoCAD', slug: 'autocad', url: 'https://www.autodesk.com/products/autocad/overview', desc: 'CAD drafting software' },
      { name: 'Dassault Systèmes', slug: 'dassaultsystemes', url: 'https://www.3ds.com/', desc: 'Engineering and design software' },
      { name: 'Arduino', slug: 'arduino', url: 'https://www.arduino.cc/', desc: 'Open-source electronics platform' },
      { name: 'COMSOL', slug: 'comsol', url: 'https://www.comsol.com/', desc: 'Multiphysics simulation software', scale: 1.8 },
      { name: 'ROS', slug: 'ros', url: 'https://www.ros.org/', desc: 'Robot Operating System', theme: 'dark' },
      { name: 'Espressif', slug: 'espressif', url: 'https://www.espressif.com/', desc: 'SoCs and microcontrollers' },
      { name: 'ESPHome', slug: 'esphome', url: 'https://esphome.io/', desc: 'ESP device configuration for home automation', theme: 'dark' },
      { name: 'Raspberry Pi', slug: 'raspberrypi', url: 'https://www.raspberrypi.org/', desc: 'SoCs and microcontroller modules' },
      { name: 'MATLAB', slug: 'MATLAB', url: 'https://www.mathworks.com/products/matlab.html', desc: 'Numeric computing environment', theme: 'dark' },
      { name: 'SOLIDWORKS', slug: 'SW', url: 'https://www.solidworks.com/', desc: '3D CAD design software', theme: 'dark' },
    ],
  },
  {
    title: 'Scientific Simulation and Graphics',
    icon: 'LuAtom',
    items: [
      { name: 'GNU', slug: 'gnu', url: 'https://www.gnu.org/', desc: 'Free software operating system' },
      { name: 'Octave', slug: 'octave', url: 'https://www.gnu.org/software/octave/', desc: 'Numerical computation environment' },
      { name: 'OpenGL', slug: 'opengl', url: 'https://www.khronos.org/opengl/', desc: 'Graphics rendering API', scale: 1.5 },
      { name: 'Vulkan', slug: 'vulkan', url: 'https://www.khronos.org/vulkan', desc: 'Low-overhead graphics API', scale: 1.5 },
      { name: 'WebGL', slug: 'webgl', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API', desc: 'Web graphics API', scale: 1.5 },
      { name: 'WebGPU', slug: 'webgpu', url: 'https://www.w3.org/TR/webgpu/', desc: 'Next-gen web graphics API' },
      { name: 'CUDA', slug: 'CUDA', url: 'https://developer.nvidia.com/cuda-zone', desc: 'Parallel computing platform (NVIDIA)', theme: 'dark' },
      { name: 'NVIDIA Nsight', slug: 'nvidia', url: 'https://developer.nvidia.com/nsight-systems', desc: 'GPU performance profiling system' },
    ],
  },
  {
    title: 'Typesetting and Documentation',
    icon: 'LuFileText',
    items: [
      { name: 'Markdown', slug: 'markdown', url: 'https://daringfireball.net/projects/markdown/', desc: 'Lightweight markup language', theme: 'dark' },
      { name: 'LaTeX', slug: 'latex', url: 'https://www.latex-project.org/', desc: 'Typesetting system' },
      { name: 'Overleaf', slug: 'overleaf', url: 'https://www.overleaf.com/', desc: 'Online LaTeX editor' },
      { name: 'Typst', slug: 'typst', url: 'https://typst.org/', desc: 'Modern typesetting system' },
    ],
  },
  {
    title: 'Other',
    icon: 'LuLayers',
    items: [
      { name: 'C', slug: 'c', url: 'https://www.c-language.org/about', desc: 'Systems programming language' },
      { name: 'C++', slug: 'cplusplus', url: 'https://isocpp.org/', desc: 'General-purpose systems language' },
      { name: 'Java', slug: 'Java', url: 'https://www.oracle.com/java/', desc: 'Cross-platform programming language', theme: 'dark' },
      { name: 'OCaml', slug: 'ocaml', url: 'https://ocaml.org/', desc: 'Functional programming language' },
      { name: 'Rust', slug: 'rust', url: 'https://www.rust-lang.org/', desc: 'Safe systems programming language', theme: 'dark' },
      { name: 'Linux', slug: 'linux', url: 'https://www.kernel.org/', desc: 'Open-source operating system kernel' },
      { name: 'Docker', slug: 'docker', url: 'https://www.docker.com/', desc: 'Containerization platform' },
      { name: 'Amazon Web Services', slug: 'AWS', url: 'https://aws.amazon.com/', desc: 'Cloud computing services' },
    ],
  },
]
