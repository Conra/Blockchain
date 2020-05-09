/* eslint-disable linebreak-style */
import Package from './package.json';
import Block from './src/blockchain/block';

const { name, version } = Package;
console.log(`${name} ${version}`);

// 2.3
const { genesis } = Block;
console.log(genesis.toString());

// 2.2
const block = new Block(Date.now(), genesis.hash, 'hash', 'data');
console.log(block.toString());

// 2.4
const block1 = Block.mine(genesis, 'data-1');
console.log(block1.toString());
