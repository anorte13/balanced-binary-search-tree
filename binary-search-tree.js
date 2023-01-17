class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
class Tree {
  constructor() {
    this.binaryList = [];
    this.root = this.buildTree(this.binaryList);
  }
  buildTree(data) {
    if (data === 1) {
      return data;
    }
    data.sort(function (a, b) {
      return a - b;
    });
    let sortedArray = data.filter(function (item, pos) {
      return data.indexOf(item) == pos;
    });
    console.log(sortedArray);
    let start = 0;
    let end = data.length - 1;
    let midpoint = Math.round(start + end / 2);
    let root = midpoint;
    return root;
  }
}
const tree = new Tree();
const binaryArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(tree.buildTree(binaryArray));
