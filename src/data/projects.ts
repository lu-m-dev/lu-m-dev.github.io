/**
 * Project configuration.
 */

import type { ProjectCategory, ProjectConfig } from '../types'

export const PROJECT_CATEGORIES: ProjectCategory[] = ['Graphics', 'Research', 'Teaching']
export const DEFAULT_CATEGORY: ProjectCategory = 'Teaching'

export const PROJECT_CONFIG: Record<string, ProjectConfig> = {
  'Skyfall-Viewer': { preview: 'images/training.gif', category: 'Graphics' },
  'run-synthmorph': { preview: 'images/demo.gif', category: 'Research' },
  'news-source-classifier': { preview: 'data/data_analysis.png', category: 'Research' },
  'WebGPU-gaussian-splatting': { preview: 'images/preview.gif', category: 'Graphics' },
  'WebGPU-forward-and-clustered-deferred-shading': { preview: 'img/clustered_5000.gif', category: 'Graphics' },
  'biostatistics-eda': { preview: 'assets/figures/preview.gif', category: 'Research' },
  'Vulkan-Grass-Rendering': { preview: 'img/grass2.gif', category: 'Graphics' },
  'CUDA-path-tracer': { preview: 'img/demo.gif', category: 'Graphics' },
  'CUDA-stream-compaction': { preview: 'img/demo.gif', category: 'Graphics' },
  'CUDA-boids-flocking': { preview: 'images/boids_1000.gif', category: 'Graphics' },
  'access-engineering': { preview: 'electrical-engineering/include/demo.gif', category: 'Teaching' },
  'CUDA-matrix-operations': { preview: 'images/demo.gif', category: 'Graphics' },
  'world-of-drawings': { preview: 'demo.gif', category: 'Graphics' },
  'artistic-rendering': { preview: 'demo.gif', category: 'Graphics' },
  'ants-can-dance': { preview: 'demo.gif', category: 'Graphics' },
  'earthquake-viewer': { preview: 'demo.gif', category: 'Graphics' },
  'hole-in-the-ground': { preview: 'demo.gif', category: 'Graphics' },
  'space-minesweeper': { preview: 'demo.gif', category: 'Graphics' },
  'torchsurv': { preview: 'docs/_static/logo_firecamp.png', category: 'Research' },
  'python-games': { preview: 'results/preview.png', category: 'Teaching' },
  'halving-game': { preview: 'demo.gif', category: 'Teaching' },
}

export const PROJECT_CONFIG_ORDER = Object.keys(PROJECT_CONFIG)
