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
  //uses recursion to look thorugh each node for ther given value
  find(value, root = this.root) {
    const node = root;
    if (node.data === null) {
      if (node.data === value) {
        return console.log("Value: " + value + " was found!");
      }
      if (node.data > value) {
        return this.find(value, node.left);
      } else {
        return this.find(value, node.right);
      }
    }
    return console.log("Value: " + value + " was NOT found!");
  }
}
const binaryArray = [1, 2, 3, 4, 5, 6, 7];
const tree = new Tree(binaryArray);
tree.prettyPrint();
tree.find(10);
