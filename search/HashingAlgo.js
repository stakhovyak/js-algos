class HashTable {
    constructor(size) {
        this.size = size;
        this.table = new Array(size);
        this.collisionCount = 0;
        this.maxChainLength = 0;
        this.probeCount = 0;
        
        // Initialize table based on collision resolution method
        this.clear();
    }

    clear() {
        for (let i = 0; i < this.size; i++) {
            this.table[i] = [];
        }
        this.collisionCount = 0;
        this.maxChainLength = 0;
        this.probeCount = 0;
    }

    hash(key, constant) {
        const A = constant || (Math.sqrt(5) - 1) / 2;
        return Math.floor(this.size * ((key * A) % 1));
    }

    // Second hash function for double hashing
    hash2(key) {
        return 1 + (key % (this.size - 1));
    }

    // Chaining method
    insertChaining(key, value, constant) {
        const index = this.hash(key, constant);
        this.table[index].push({ key, value });
        
        // Update statistics
        if (this.table[index].length > 1) {
            this.collisionCount++;
        }
        this.maxChainLength = Math.max(this.maxChainLength, this.table[index].length);
    }

    // Linear probing method
    insertLinearProbing(key, value, constant) {
        let index = this.hash(key, constant);
        let probeCount = 0;

        while (this.table[index].length > 0) {
            index = (index + 1) % this.size;
            probeCount++;
            if (probeCount >= this.size) throw new Error("Hash table is full");
        }

        this.table[index].push({ key, value });
        if (probeCount > 0) this.collisionCount++;
        this.probeCount = Math.max(this.probeCount, probeCount);
    }

    // Double hashing method
    insertDoubleHashing(key, value, constant) {
        let index = this.hash(key, constant);
        let probeCount = 0;
        const step = this.hash2(key);

        while (this.table[index].length > 0) {
            index = (index + step) % this.size;
            probeCount++;
            if (probeCount >= this.size) throw new Error("Hash table is full");
        }

        this.table[index].push({ key, value });
        if (probeCount > 0) this.collisionCount++;
        this.probeCount = Math.max(this.probeCount, probeCount);
    }
}

// Experiment function
function runExperiment(size = 100, dataSize = 50, startConstant = 0.618034, step = 0.001, iterations = 20) {
    const results = [];
    const data = Array.from({ length: dataSize }, (_, i) => i + 1);
    
    for (let i = 0; i < iterations; i++) {
        const constant = startConstant + (step * i);
        const hashTable = new HashTable(size);
        
        // Test chaining
        data.forEach(key => hashTable.insertChaining(key, `value${key}`, constant));
        
        results.push({
            constant,
            collisions: hashTable.collisionCount,
            maxChainLength: hashTable.maxChainLength
        });
        
        hashTable.clear();
    }
    
    return results;
}

// Run and display results
const experimentResults = runExperiment();
console.log("Experiment Results:");
experimentResults.forEach(result => {
    console.log(`Constant: ${result.constant.toFixed(6)}, ` +
                `Collisions: ${result.collisions}, ` +
                `Max Chain Length: ${result.maxChainLength}`);
});