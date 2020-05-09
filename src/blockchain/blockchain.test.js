/* eslint-disable linebreak-style */
import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
  let blockchain;
  let blockchain2;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it('every blockchain has a genesis blockchain', () => {
    const [genesisBlock] = blockchain.blocks;

    expect(genesisBlock).toEqual(Block.genesis);
    expect(blockchain.blocks.length).toEqual(1);
  });

  it('use addBlock()', () => {
    const data = 'data';
    blockchain.addBlock(data);

    const [, lastBlock] = blockchain.blocks;
    expect(lastBlock.data).toEqual(data);
    expect(blockchain.blocks.length).toEqual(2);
  });

  it('replaces the chain with a valid chain', () => {
    blockchain2.addBlock('block-1');
    blockchain.replace(blockchain2.blocks);

    expect(blockchain.blocks).toEqual(blockchain2.blocks);
  });

  it('doesnt not replace the chain with one less blocks', () => {
    blockchain.addBlock('block-1');

    expect(() => {
      blockchain.replace(blockchain2.blocks);
    }).toThrowError('Received chain is not longer than current chain.');
  });

  it('not replace the chain with one is not valid', () => {
    blockchain2.addBlock('block-1');
    blockchain2.blocks[1].data = 'block-hack';

    expect(() => {
      blockchain.replace(blockchain2.blocks);
    }).toThrowError('Received chain is invalid');
  });
});
