const Node = require("./binary-search-tree.js");
const Tree = require("./binary-search-tree.js");

const list = [5, 10, 39, 1];
const binaryTree = new Tree(list);
binaryTree.prettyPrint();
console.log(binaryTree.isBalanced()); //returns true
console.log(binaryTree.levelOrder()); //returns [10,5,39,1]
console.log(binaryTree.preorder()); //returns [10,5,1,39]
console.log(binaryTree.postorder()); //returns [1,5,39,10]
console.log(binaryTree.inorder()); // returns // [1,5,10,39]
binaryTree.insert(8);
binaryTree.insert(11);
binaryTree.insert(21);
binaryTree.insert(25);
binaryTree.insert(26);
binaryTree.prettyPrint();
console.log(binaryTree.isBalanced()); // returns false
binaryTree.rebalance();
binaryTree.prettyPrint();
console.log(binaryTree.isBalanced()); // returns true
