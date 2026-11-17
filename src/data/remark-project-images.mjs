// Lets images inserted in a project's write-up (as /projects/...) be optimised by Astro.
export default function remarkProjectImages() {
  const walk = (node) => {
    if (node.type === 'image' && node.url?.startsWith('/projects/')) node.url = `../../assets${node.url}`;
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}
