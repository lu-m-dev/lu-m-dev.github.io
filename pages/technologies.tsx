import { useState } from 'react'

type Tech = { name: string; slug: string }
type Category = { title: string; className?: string; items: Tech[] }

const categories: Category[] = [
  {
    title: 'Web Dev',
    className: 'field-web',
    items: [
      { name: 'HTML5', slug: 'html5' },
      { name: 'CSS', slug: 'css' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
    ],
  },
  {
    title: 'Data Science',
    className: 'field-ml',
    items: [
      { name: 'Python', slug: 'python' },
      { name: 'Pandas', slug: 'pandas' },
      { name: 'NumPy', slug: 'numpy' },
      { name: 'scikit-learn', slug: 'scikitlearn' },
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'PyTorch', slug: 'pytorch' },
      { name: 'SciPy', slug: 'scipy' },
      { name: 'R', slug: 'r' },
    ],
  },
  {
    title: 'Engineering',
    className: 'field-engineering',
    items: [
      { name: 'MATLAB', slug: 'MATLAB' },
      { name: 'SOLIDWORKS', slug: 'SW' },
      { name: 'AutoCAD', slug: 'autocad' },
      { name: 'Dassault Systèmes', slug: 'dassaultsystemes' },
      { name: 'Arduino', slug: 'arduino' },
      { name: 'COMSOL', slug: 'comsol' },
      { name: 'ROS', slug: 'ros' },
      { name: 'Espressif', slug: 'espressif' },
      { name: 'ESPHome', slug: 'esphome' },
      { name: 'Raspberry Pi', slug: 'raspberrypi' },
    ]
  },
  {
    title: 'Scientific Simulation and Graphics',
    className: 'field-graphics',
    items: [
      { name: 'GNU', slug: 'gnu' },
      { name: 'Octave', slug: 'octave' },
      { name: 'CUDA', slug: 'CUDA' },
      { name: 'OpenGL', slug: 'opengl' },
      { name: 'Vulkan', slug: 'vulkan' },
      { name: 'WebGL', slug: 'webgl' },
      { name: 'WebGPU', slug: 'webgpu' },
    ]
  },
  {
    title: 'Other',
    className: 'field-general',
    items: [
      { name: 'C', slug: 'c' },
      { name: 'C++', slug: 'cplusplus' },
      { name: 'Java', slug: 'Java' },
      { name: 'OCaml', slug: 'ocaml' },
      { name: 'Rust', slug: 'rust' },
    ]
  }
]

export default function Skills() {
  return (
    <div style={{ minHeight: '100vh', padding: 36 }}>
      <div className="content-wrap">
        {categories.map((cat) => (
          <div key={cat.title}>
            <section>
              <h3 style={{ marginTop: 18 }}>{cat.title}</h3>
              <div className={`logo-grid ${cat.className ?? ''}`} style={{ marginTop: 12 }}>
                {cat.items.map((t) => (
                  <TechItem key={t.slug} tech={t} />
                ))}
              </div>
            </section>
            <div className="category-break" />
          </div>
        ))}
      </div>
    </div>
  )
}

function TechItem({ tech }: { tech: Tech }) {
  const [showImage, setShowImage] = useState<boolean>(Boolean(tech.slug))

  const logoUrl = tech.slug ? `https://cdn.simpleicons.org/${tech.slug}` : ''

  return (
    <div className="tech-item" tabIndex={0}>
      <div className="logo">
        {showImage && logoUrl ? (
          <img
            src={logoUrl}
            alt={`${tech.name} logo`}
            onError={() => setShowImage(false)}
            style={{ width: '56px', height: '56px', objectFit: 'contain' }}
          />
        ) : (
          <div className="logo-fallback" aria-hidden={false}>
            {tech.slug}
          </div>
        )}
      </div>
      <div className="tech-label">{tech.name}</div>
    </div>
  )
}
