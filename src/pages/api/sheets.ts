/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";
import { google } from 'googleapis';

interface EventData {
  Event: string;
  startDate: string;
  endDate: string;
  Geo: string;
  Link: string;
  Twitter: string;
  Chat: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });

    const sheetName = '2024'; // Replace with the actual sheet name
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1pI5XDGGQ0ffR4rumTBxmWgm25_lbQXjggEIIVHfD_Ug',
      range: `${sheetName}!B:H`, // Adjust the sheet name and range based on your actual data location
    });

    const values = response.data.values;

    if (!values || values.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    const jsonData: EventData[] = values
      .slice(5) // Exclude first 5 rows
      .filter((row) =>
        row[0] !== 'Last update:' &&
        row[0] !== '*not ethereum-specific events' &&
        row.some((field) => field.trim() !== '') // Check if any field in the row is non-empty after trimming whitespace
      )
      .map((row) => {
        return {
          Event: row[0] || '',
          startDate: row[1] || '',
          endDate: row[2] || '',
          Geo: row[3] || '',
          Link: row[4] || '',
          Twitter: row[5] || '',
          Chat: row[6] || '',
        };
      });

    return res.status(200).json({ data: jsonData });
  } catch (e: any) {
    console.error('Error:', e);
    return res.status(500).json({ error: 'Internal Server Error', message: e.message });
  }
}
