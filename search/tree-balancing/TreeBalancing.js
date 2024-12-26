class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    // Insert a value into the BST
    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        this._insertNode(this.root, newNode);
    }

    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    // Traverse in ascending order (inorder)
    traverseAscending(callback) {
        this._inorderTraversal(this.root, callback);
    }

    _inorderTraversal(node, callback) {
        if (node) {
            this._inorderTraversal(node.left, callback);
            callback(node.value);
            this._inorderTraversal(node.right, callback);
        }
    }

    // Traverse in descending order (reverse inorder)
    traverseDescending(callback) {
        this._reverseInorderTraversal(this.root, callback);
    }

    _reverseInorderTraversal(node, callback) {
        if (node) {
            this._reverseInorderTraversal(node.right, callback);
            callback(node.value);
            this._reverseInorderTraversal(node.left, callback);
        }
    }

    // Find kth minimum element
    findKthMinimum(k) {
        let count = 0;
        let result = null;
        
        const inorderTraversal = (node) => {
            if (!node || count >= k) return;
            
            inorderTraversal(node.left);
            
            count++;
            if (count === k) {
                result = node.value;
                return;
            }
            
            inorderTraversal(node.right);
        };

        inorderTraversal(this.root);
        return result;
    }

    balance() {
        const nodes = [];
        this.traverseAscending(value => nodes.push(value));
        this.root = this._balanceArray(nodes, 0, nodes.length - 1);
    }

    _balanceArray(nodes, start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(nodes[mid]);

        node.left = this._balanceArray(nodes, start, mid - 1);
        node.right = this._balanceArray(nodes, mid + 1, end);

        return node;
    }
}

const bst = new BST();
const input = [8, 3, 10, 1, 6, 14, 4, 7, 13];

input.forEach(value => bst.insert(value));

console.log("Ascending order:");
bst.traverseAscending(value => console.log(value));

console.log("\nDescending order:");
bst.traverseDescending(value => console.log(value));

console.log("\n3rd minimum element:", bst.findKthMinimum(3));

console.log("\nBalancing tree...");
bst.balance();

console.log("\nAscending order after balancing:");
bst.traverseAscending(value => console.log(value));
console.log("\nVisualizing tree...");

const container = document.createElement('div');
container.style.cssText = `
    display: flex;
    justify-content: center;
    padding: 20px;
`;
document.body.appendChild(container);

function visualizeNode(node, level = 0) {
    if (!node) return null;

    const nodeElement = document.createElement('div');
    nodeElement.style.cssText = `
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 10px;
    `;

    const circle = document.createElement('div');
    circle.textContent = node.value;
    circle.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #fff;
        border: 2px solid #333;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    `;

    nodeElement.appendChild(circle);

    const childrenContainer = document.createElement('div');
    childrenContainer.style.cssText = `
        display: flex;
        justify-content: center;
    `;

    const leftChild = visualizeNode(node.left, level + 1);
    const rightChild = visualizeNode(node.right, level + 1);

    if (leftChild || rightChild) {
        if (leftChild) childrenContainer.appendChild(leftChild);
        if (rightChild) childrenContainer.appendChild(rightChild);
        nodeElement.appendChild(childrenContainer);
    }

    return nodeElement;
}

container.appendChild(visualizeNode(bst.root));
const buttonContainer = document.createElement('div');
buttonContainer.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
`;

const randomizeButton = document.createElement('button');
randomizeButton.textContent = 'Generate Random Tree';
randomizeButton.onclick = () => {
    bst.root = null;
    const randomNumbers = Array.from({length: 10}, () => Math.floor(Math.random() * 100));
    randomNumbers.forEach(num => bst.insert(num));
    container.innerHTML = '';
    container.appendChild(visualizeNode(bst.root));
};

const balanceButton = document.createElement('button');
balanceButton.textContent = 'Balance Tree';
balanceButton.onclick = () => {
    bst.balance();
    container.innerHTML = '';
    container.appendChild(visualizeNode(bst.root));
};

buttonContainer.appendChild(randomizeButton);
buttonContainer.appendChild(balanceButton);
document.body.appendChild(buttonContainer);