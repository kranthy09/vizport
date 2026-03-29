import { FileType } from '@/types';

const SUPPORTED_EXTENSIONS = {
  image: ['.png', '.svg', '.jpg', '.jpeg', '.gif', '.webp'],
  mermaid: ['.mmd'],
  markdown: ['.md'],
  excalidraw: ['.excalidraw'],
};

export function getFileType(path: string): FileType {
  const ext = path.toLowerCase().slice(path.lastIndexOf('.'));

  if (SUPPORTED_EXTENSIONS.image.includes(ext)) {
    return 'image';
  }
  if (SUPPORTED_EXTENSIONS.mermaid.includes(ext)) {
    return 'mermaid';
  }
  if (SUPPORTED_EXTENSIONS.markdown.includes(ext)) {
    return 'markdown';
  }
  if (SUPPORTED_EXTENSIONS.excalidraw.includes(ext)) {
    return 'excalidraw';
  }

  return 'unknown';
}

export function isSupportedFile(path: string): boolean {
  return getFileType(path) !== 'unknown';
}

export function getFileIcon(fileType: FileType): string {
  switch (fileType) {
    case 'image':
      return '🖼️';
    case 'mermaid':
      return '📊';
    case 'markdown':
      return '📝';
    case 'excalidraw':
      return '✏️';
    default:
      return '📄';
  }
}
