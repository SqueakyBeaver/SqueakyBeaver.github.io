class Node {
    constructor() {
        this.value = null;
        this.step = null; // Horizontal distance between children.
        this.max_y = null; // Distance of the descendent of this node that is farthest from root.
        this.children = new Array();
        this.has_children = false;
        this.first = null;
        this.last = null;
        this.parent = null;
        this.next = null;
        this.previous = null;
        this.x = null; // Where the node will eventually be drawn.
        this.y = null;
        this.head_chain = null;
        this.tail_chain = null;
    }

    setSiblings(parent) {
        this.children.forEach(i => i.setSiblings(this))

        this.hasChildren = this.children.length > 0
        this.parent = parent;

        if (this.hasChildren) {

        }
    }
}

function parse(str) {
    if (str[0] !== "[")
        throw new SyntaxError("Make sure to use square brackets ([]) around items");

    let node = new Node();

    let i = 1;
    while ((str[i] !== ' ') && (str[i] !== "[") && str[i] !== "]") i++;
    node.value = str.substr(1, i - 1);

    while (str[i] === ' ') i++;

    if (str[i] !== ']') {
        let level = 1, start = i;
        for (; i < str.length; i++) {
            const temp = level;

            if (str[i] === '[') level++;
            if (str[i] === ']') level--;

            if ((temp === 1 && level === 2) || (temp === 1 && level === 0)) {
                // If there's anything but whitespace
                if (str.substring(start, i).search(/[^\s]/) > -1)
                    node.children.push(parse(str.substr(start, i)));
                start = i
            }

            if (temp === 2 && level === 1) {
                node.children.push(parse(str.substring(start, i + 1)));
                start = i + 1;
            }
        }
    }
    return node;
}

const input = "[expr [term [factor [id [B]] ] ] [+] [term [factor [id [C]] ] ] ]";
const n = parse(input);

console.log(n)