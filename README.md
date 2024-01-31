# ArXiv API Search

This project provides a simple Express.js server to search the ArXiv API.

- URL: https://ill-rose-rhinoceros-suit.cyclic.app/
- Endpoint: /search-arxiv
- Example: https://ill-rose-rhinoceros-suit.cyclic.app/search-arxiv?search=Science

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/JohnDev19/Arxiv-API.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

Start the server:

```bash
npm start
```

The server will run at `http://localhost:3000` by default.

Make a search request by visiting:

```
https://ill-rose-rhinoceros-suit.cyclic.app/search-arxiv?search=your_query
```

Replace `your_query` with the term you want to search.

## API Response

The API responds with a JSON object containing information about the ArXiv search results.

### Example

```json
{
  "totalResults": "5",
  "startIndex": "0",
  "itemsPerPage": "5",
  "entries": [
    {
      "id": "https://arxiv.org/abs/1234.5678",
      "updated": "2024-01-30T10:00:00Z",
      "published": "2024-01-01T12:00:00Z",
      "title": "Sample ArXiv Paper",
      "summary": "This is a summary of the paper.",
      "authors": ["Author 1", "Author 2"],
      "doi": "10.1234/arxiv.12345678",
      "comment": "This is a comment.",
      "journalRef": "Journal of ArXiv",
      "pdfLink": "https://arxiv.org/pdf/1234.5678"
    },
    // ... additional entries ...
  ]
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
