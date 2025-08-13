import DownloadService from './download.service.js';
import youtubedl from 'youtube-dl-exec';
import { exec } from 'child_process';
import fs from 'fs/promises';
import { jest } from '@jest/globals';

// Use inline mocks with factory functions for ES module compatibility
jest.mock('youtube-dl-exec', () => jest.fn(() => Promise.resolve())); 
jest.mock('child_process', () => ({
  exec: jest.fn((command, callback) => {
    callback(null, 'stdout', 'stderr');
  }),
}));
jest.mock('fs/promises', () => ({
  unlink: jest.fn(() => Promise.resolve()),
}));
jest.mock('ffmpeg-static', () => '/usr/bin/ffmpeg');
jest.mock('../utils/encoder.js', () => ({
  encodeToUTF8: (str) => str, // Mocking the encoder to return the string as is for testing
}));

describe('DownloadService', () => {
  const ytVideoUrl = 'https://www.youtube.com/watch?v=test';
  const fileName = 'test-video-file';
  const filePath = '/tmp';
  let downloadService;

  beforeEach(() => {
    // Reset mocks before each test to ensure a clean state
    jest.clearAllMocks();
    downloadService = new DownloadService(ytVideoUrl, fileName, filePath);
  });

  describe('constructor', () => {
    it('should correctly initialize with UTF-8 encoded file name and path', () => {
      expect(downloadService.ytVideoUrl).toBe(ytVideoUrl);
      expect(downloadService.fileName).toBe(fileName);
      expect(downloadService.filePath).toBe(filePath);
    });
  });

  describe('_getFormattedFileNameWithBasePath', () => {
    it('should return a correctly formatted file path with the default mp3 extension', () => {
      const formattedPath = downloadService._getFormattedFileNameWithBasePath();
      expect(formattedPath).toBe('/tmp/test-video-file.mp3');
    });

    it('should return a correctly formatted file path with a specified extension', () => {
      const formattedPath = downloadService._getFormattedFileNameWithBasePath('webm');
      expect(formattedPath).toBe('/tmp/test-video-file.webm');
    });
  });

  describe('downloadAudioFile', () => {
    // it('should call youtubedl, exec, and fs.unlink with correct arguments on success', async () => {
    //   await downloadService.downloadAudioFile();

    //   // Verify youtubedl was called with the correct arguments
    //   expect(youtubedl).toHaveBeenCalledWith(ytVideoUrl, {
    //     output: '/tmp/test-video-file.webm',
    //     format: 'bestaudio/best',
    //   });

    //   // Verify exec was called to convert the file
    //   expect(exec).toHaveBeenCalledWith(
    //     '/usr/bin/ffmpeg -i /tmp/test-video-file.webm -vn -ab 320k -ar 48000 -y /tmp/test-video-file.mp3',
    //     expect.any(Function)
    //   );

    //   // Verify the temporary file was unlinked
    //   expect(fs.unlink).toHaveBeenCalledWith('/tmp/test-video-file.webm');
    // });

    // it('should not throw an error if one of the steps fails, but log it', async () => {
    //   // Mock youtubedl to throw an error
    //   youtubedl.mockRejectedValue(new Error('Download failed'));
    //   const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    //   await downloadService.downloadAudioFile();

    //   // Verify the error was logged
    //   expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Error:', expect.any(Error));

    //   // Verify that subsequent steps were not called
    //   expect(exec).not.toHaveBeenCalled();
    //   expect(fs.unlink).not.toHaveBeenCalled();

    //   consoleErrorSpy.mockRestore();
    // });

    // it('should handle an error during the conversion step', async () => {
    //   const conversionError = new Error('Conversion failed');
    //   // Mock the exec callback to return an error
    //   exec.mockImplementationOnce((command, callback) => {
    //     callback(conversionError, null, null);
    //   });

    //   const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    //   await downloadService.downloadAudioFile();

    //   // Verify the error was logged
    //   expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Error:', conversionError);

    //   // Verify that the unlink step was not called
    //   expect(fs.unlink).not.toHaveBeenCalled();

    //   consoleErrorSpy.mockRestore();
    // });
  });
});