// Turns  ![alt](image.jpg "Caption")  into <figure><img><figcaption>Caption</figcaption></figure>
// and makes every article image lazy-loaded.
const blank = (n) => n.type === 'text' && !n.value.trim();

function walk(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type !== 'element') return child;
    if (child.tagName === 'img') {
      child.properties.loading = 'lazy';
      child.properties.decoding = 'async';
    }
    if (child.tagName === 'p') {
      const kids = child.children.filter((k) => !blank(k));
      if (kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === 'img') {
        const img = kids[0];
        const caption = img.properties.title;
        delete img.properties.title;
        img.properties.loading = 'lazy';
        img.properties.decoding = 'async';
        const out = { type: 'element', tagName: 'figure', properties: {}, children: [img] };
        if (caption) {
          out.children.push({
            type: 'element', tagName: 'figcaption', properties: {},
            children: [{ type: 'text', value: String(caption) }],
          });
        }
        return out;
      }
    }
    walk(child);
    return child;
  });
}

export default function rehypeFigure() {
  return (tree) => walk(tree);
}
