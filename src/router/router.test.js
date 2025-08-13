// __tests__/router.test.js
import { jest } from '@jest/globals';
import { statusCodes } from '../utils/httpStatusCode.js';

// 1️⃣ Mock DownloadController BEFORE importing Router
const mockHandleDownloadRequest = jest.fn();

jest.unstable_mockModule('../controller/download.controller.js', () => ({
  default: jest.fn().mockImplementation(() => ({
    handleDownloadRequest: mockHandleDownloadRequest
  }))
}));

// 2️⃣ Now dynamically import Router (it will use the mocked DownloadController)
const { Router } = await import('./route.js');
const { default: DownloadController } = await import('../controller/download.controller.js');

function createMockReqRes({ url = '/', method = 'GET', body = '' } = {}) {
  const req = {
    url,
    method,
    on: jest.fn((event, callback) => {
      if (event === 'data' && body) {
        callback(Buffer.from(body));
      }
      if (event === 'end') {
        callback();
      }
      return req;
    }),
  };

  const res = {
    writeHead: jest.fn(),
    end: jest.fn(),
  };

  return { req, res };
}

describe('Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return BAD_REQUEST when no body is provided', async () => {
    const { req, res } = createMockReqRes({ url: '/download', method: 'POST', body: '' });

    await Router(req, res);

    expect(res.writeHead).toHaveBeenCalledWith(statusCodes.BAD_REQUEST);
    expect(res.end).toHaveBeenCalledWith('No data provided');
  });

  it('should return METHOD_NOT_ALLOWED when method is not POST for /download', async () => {
    const { req, res } = createMockReqRes({ url: '/download', method: 'GET', body: 'data' });

    await Router(req, res);

    expect(res.writeHead).toHaveBeenCalledWith(statusCodes.METHOD_NOT_ALLOWED);
    expect(res.end).toHaveBeenCalledWith('Method not allowed');
  });

  it('should call handleDownloadRequest on POST /download', async () => {
    const { req, res } = createMockReqRes({ url: '/download', method: 'POST', body: 'videoId=123' });

    await Router(req, res);

    expect(mockHandleDownloadRequest).toHaveBeenCalledWith('videoId=123', res);
  });

  it('should handle errors from handleDownloadRequest', async () => {
    mockHandleDownloadRequest.mockRejectedValueOnce(new Error('fail'));

    const { req, res } = createMockReqRes({ url: '/download', method: 'POST', body: 'videoId=123' });

    await Router(req, res);

    expect(res.writeHead).toHaveBeenCalledWith(statusCodes.INTERNAL_SERVER_ERROR);
    expect(res.end).toHaveBeenCalledWith(
      'Error processing the download request, please contact adminstrator.'
    );
  });

  it('should return NOT_FOUND for unknown routes', async () => {
    const { req, res } = createMockReqRes({ url: '/unknown', method: 'GET', body: 'data' });

    await Router(req, res);

    expect(res.writeHead).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
    expect(res.end).toHaveBeenCalledWith('Route not found');
  });
});
