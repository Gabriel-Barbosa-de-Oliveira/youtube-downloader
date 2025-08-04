# YouTube Downloader

A simple Node.js application to download YouTube videos.

## Prerequisites
- Node.js 18 or higher
- npm (Node package manager)
- **youtube-dl** installed on your local machine (required for video downloads)

### Installing youtube-dl

You must have `youtube-dl` installed and available in your system's PATH. To install it:

**On macOS (using Homebrew):**
```bash
brew install youtube-dl
```

**On Linux:**
```bash
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
```

**On Windows:**
- Download the latest `youtube-dl.exe` from [youtube-dl.org](https://youtube-dl.org/) and add it to your PATH.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd youtube-downloader
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the server with:
```bash
npm start
```

The application will run at `http://localhost:3000`.

## Project Structure
- `src/index.js`: Application entry point
- `src/service/download.service.js`: Download service logic
- `src/utils/httpStatusCode.js`: HTTP status codes

## Testing
To run tests:
```bash
npm test
```

## Notes
- Make sure `youtube-dl` is installed and accessible from the command line before running the application.
- If you encounter issues related to the `File` object in Node.js, a polyfill is already included in the project.
