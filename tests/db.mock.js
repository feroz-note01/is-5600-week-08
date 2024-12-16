const mockQuery = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([{ description: 'Product 1' }, { description: 'Product 2' }]),
  };

  const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery),
    findById: jest.fn(),
    save: jest.fn(),
    deleteOne: jest.fn(),
  };

  module.exports = {
    mockModel,
    mockQuery,
  };
