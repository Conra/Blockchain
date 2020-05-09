/* eslint-disable linebreak-style */
import Block, { DIFFICULTY } from './block';

describe('Block', () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;
  let nonce;

  beforeEach(() => {
    timestamp = new Date(2010, 0, 1);
    previousBlock = Block.genesis;
    data = 'test-data';
    hash = 'hash';
    nonce = 128;
  });

  it('create an instance with parameters', () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data, nonce);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
    expect(block.nonce).toEqual(nonce);
  });

  it('use static mine()', () => {
    const block = Block.mine(previousBlock, data);
    const { difficulty } = block;

    expect(block.hash.length).toEqual(64);
    expect(block.hash.substring(0, difficulty)).toEqual('0'.repeat(difficulty));
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(data).toEqual(data);
    expect(block.nonce).not.toEqual(0);
  });

  it('use static hash()', () => {
    hash = Block.hash(timestamp, previousBlock.hash, data, nonce);
    const hasOutput = '9f21d9bb91e05c0bf4bff5468890e812e8f3663f9953141d825e7299bbccc7b3';

    expect(hash).toEqual(hasOutput);
  });

  it('use toString()', () => {
    const block = Block.mine(previousBlock, data);

    console.log(block.toString());

    expect(typeof block.toString()).toEqual('string');
  });
});
