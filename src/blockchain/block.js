/* eslint-disable linebreak-style */
import { SHA256 } from 'crypto-js';
import adjustDifficulty from './modules/adjustDifficulty';
import getHash from '../modules/hash';

const DIFFICULTY = 3;

class Block {
  constructor(timestamp, previousHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static get genesis() {
    const timestamp = (new Date(2000, 0, 1)).getTime();
    return new this(timestamp, undefined, 'genesis-hash', 'holis', 0, DIFFICULTY);
  }

  static mine(previousBlock, data) {
    // const timestamp = Date.now();
    const { hash: previousHash } = previousBlock;
    // let hash = Block.hash(timestamp, previousHash, data);
    let hash;
    let nonce = 0;
    let timestamp;
    let { difficulty } = previousBlock;
    // let difficulty = DIFFICULTY;

    // proof of work
    do {
      timestamp = Date.now();
      nonce += 1;
      difficulty = adjustDifficulty(previousBlock, timestamp);
      hash = Block.hash(timestamp, previousHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, previousHash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, previousHash, data, nonce, difficulty) {
    return getHash(`${timestamp}${previousHash}${data}${nonce}${difficulty}`).toString();
  }

  toString() {
    const {
      timestamp, previousHash, hash, data, nonce, difficulty,
    } = this;

    return `Block -
            timestamp    : ${timestamp}
            previousHash : ${previousHash}
            hash         : ${hash}
            data         : ${data} 
            nonce        : ${nonce} 
            difficulty   : ${difficulty}
        `;
  }
}

export { DIFFICULTY };

export default Block;
