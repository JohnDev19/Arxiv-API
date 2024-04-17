// John Rey 2024

const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const app = express();
const port = 3000;

app.get('/search-arxiv', async (req, res) => {
    const searchQuery = req.query.search;

    if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const arxivApiBaseUrl = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(searchQuery)}&max_results=20`;
        const arxivResponse = await axios.get(arxivApiBaseUrl);
        const arxivXmlData = arxivResponse.data;
        const parser = new xml2js.Parser({ explicitArray: false, trim: true });
        const jsonData = await parser.parseStringPromise(arxivXmlData);
        const feed = jsonData.feed;
        const totalResults = feed['opensearch:totalResults']._;

        if (totalResults === '0') {
            return res.json({ entries: [] });
        }

        const startIndex = feed['opensearch:startIndex']._;
        const itemsPerPage = feed['opensearch:itemsPerPage']._;
        const entries = feed.entry.map(entry => ({
            id: entry.id,
            updated: entry.updated,
            published: entry.published,
            title: entry.title,
            summary: entry.summary,
            authors: entry.author ? (Array.isArray(entry.author) ? entry.author.map(author => author.name) : [entry.author.name]) : [],
            doi: entry['arxiv:doi'],
            comment: entry['arxiv:comment'],
            journalRef: entry['arxiv:journal_ref'],
            pdfLink: entry.link.find(link => link.$.title === 'pdf').$.href,
        }));

        res.json({ totalResults, startIndex, itemsPerPage, entries });
    } catch (error) {
        console.error('Error searching ArXiv API:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
          
