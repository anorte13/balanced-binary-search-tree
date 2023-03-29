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
  //builds tree with given array, sorts it, removes duplicates and returns the root node
  buildTree(array) {
    let sorted = this.#sortAndRemoveDuplicates(array);
    if (sorted.length === 0) return null;

    const mid = parseInt(sorted.length / 2);
    const root = new Node(
      sorted[mid],
      this.buildTree(sorted.slice(0, mid)),
      this.buildTree(sorted.slice(mid + 1))
    );
    return root;
  }
  //prints out the values in an easy to read format to console
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
  //inserts value into new "leaf" without changing the current tree
  insert(value, root = this.root) {
    if (root === null) {
      root = new Node(value);
      return root;
    }
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }
  //checks the tree and finds the corresponding value and removes it without affecting the parent nodes
  delete(value, root = this.root) {
    if (root === null) return root;
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left === null) return root.right;
      else if (root.right == null) return root.left;
      root.data = this.#minValue(root.right);
      root.right = this.delete(value, root.right);
    }
    return root;
  }
  #minValue(root) {
    let minv = root.data;
    while (root.left) {
      minv = root.left.key;
      root = root.left;
    }
    return minv;
  }
  //uses recursion to look thorugh each node for ther given value
  find(value, root = this.root) {
    const node = root;
    if (node === null) return null;
    if (node.data === value) {
      return console.log("Value: " + value + " was found!");
    }
    if (node.data > value) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }
  //check for height of the given tree
  height(node = this.root) {
    if (node === null) {
      return 0;
    } else {
      const left = this.height(node.left);
      const right = this.height(node.right);
      if (left > right) return left + 1;
      else return right + 1;
    }
  }
  levelOrder(arr = [], queue = [], root = this.root) {
    if (root === null) return;
    arr.push(root.data);
    queue.push(root.left);
    queue.push(root.right);

    while (queue.length) {
      const level = queue[0];
      queue.shift();
      this.levelOrder(arr, queue, level);
    }
    return arr;
  }
  //vists the tree and begins at the root of left subtree and returns values going up the tree
  inorder(arr = [], root = this.root) {
    if (root === null) return;

    this.inorder(arr, root.left);
    arr.push(root.data);
    this.inorder(arr, root.right);
    return arr;
  }
  preorder(arr = [], root = this.root) {
    if (root === null) return;

    arr.push(root.data);
    this.preorder(arr, root.left);
    this.preorder(arr, root.right);
    return arr;
  }
  postorder(arr = [], root = this.root) {
    if (root === null) return;

    this.postorder(arr, root.left);
    this.postorder(arr, root.right);
    arr.push(root.data);

    return arr;
  }
  depth(node, root = this.root, depth = 1) {
    if (root === null) return 0;

    if (root.data === node) {
      return depth;
    }
    if (root.data > node) {
      return this.depth(node, root.left, depth + 1);
    } else {
      return this.depth(node, root.right, depth + 1);
    }
  }
  isBalanced(root = this.root) {
    if (root === null) return null;

    const left = this.height(root.left);
    const right = this.height(root.right);
    const diff = Math.abs(left - right);
    if (diff < 2) return true;
    else return false;
  }
  rebalance(root = this.root) {
    let newTree = [];
    if (root === null) return null;

    this.inorder(newTree, root.left);
    newTree.push(root.data);
    this.inorder(newTree, root.right);

    return (this.root = this.buildTree(newTree));
  }
}
module.exports = Node;
module.exports = Tree;
