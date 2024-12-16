const { mockModel, mockQuery } = require('./db.mock');
const { list, get, destroy } = require('../products');

jest.mock('../db', () => ({
  model: jest.fn().mockReturnValue(mockModel),
}));

describe('Product Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should list products', async () => {
      mockModel.find.mockReturnValue(mockQuery);

      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');

      expect(mockQuery.sort).toHaveBeenCalledWith({ _id: 1 });
      expect(mockQuery.skip).toHaveBeenCalled();
      expect(mockQuery.limit).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should get a product by id', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

      const product = await get('product-id');
      expect(product.description).toBe('Product 1');
      expect(mockModel.findById).toHaveBeenCalledWith('product-id');
    });
  });

  describe('delete', () => {
    it('should delete a product by id', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const result = await destroy('product-id');
      expect(result.deletedCount).toEqual(1);
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: 'product-id' });
    });
  });
});