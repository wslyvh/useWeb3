/* eslint-disable prettier/prettier */
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

export async function fetchHackathonData(): Promise<EventData[]> {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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

        const sheetName = '2024';
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: '1pI5XDGGQ0ffR4rumTBxmWgm25_lbQXjggEIIVHfD_Ug',
            range: `${sheetName}!B:H`,
        });

        const values = response.data.values;

        if (!values || values.length === 0) {
            throw new Error('No data found');
        }

        const jsonData: EventData[] = values
            .slice(5, 8)
            .filter((row) =>
                row[0] !== 'Last update:' &&
                row[0] !== '*not ethereum-specific events' &&
                row.some((field) => field.trim() !== '')
            )
            .map((row) => ({
                Event: row[0] || '',
                startDate: row[1] || '',
                endDate: row[2] || '',
                Geo: row[3] || '',
                Link: row[4] || '',
                Twitter: row[5] || '',
                Chat: row[6] || '',
            }));

        return jsonData;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Internal Server Error');
    }
}
