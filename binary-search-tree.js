//creates a Node class with data as the node value and pointers to left and right values
class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
//creates the Tree class which holds methods for creating Tree
class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
  #sortAndRemoveDuplicates(arr) {
    const sorted = [...new Set(arr)].sort((a, b) => a - b);
    return sorted;
  }
  buildTree(array) {
    let sorted = this.#sortAndRemoveDuplicates(array);
    if (sorted.length === 0) {
      return null;
    }
    const start = 0;
    const end = sorted.length - 1;
    const mid = parseInt(start + end / 2);
    let root = new Node(
      sorted[mid],
      this.buildTree(sorted.slice(0, mid)),
      this.buildTree(sorted.slice(mid + 1))
    );
    return root;
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "|   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "|   "}`, true);
    }
  }
}
const binaryArray = [1, 2, 3, 4, 5, 6, 7];
const tree = new Tree(binaryArray);
tree.prettyPrint();
