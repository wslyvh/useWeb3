/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { Job } from 'types/job'
import { SEO } from 'components/SEO'
import { TopnavLayout } from 'components/layouts/topnav'
import { HackathonPanel } from 'components/panel'
import axios from 'axios'

interface Props {
    categories: Array<Category>
}

interface HackathonProps {
    Event: string;
    startDate: string;
    endDate: string;
    Geo: string;
    Link: string;
    Twitter: string;
    Chat: string;
    className?: string
}

export default function Index(props: Props) {
    const [data, setData] = useState([]); // Initialize as an array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/sheets');
                setData(res.data.data || []); // Ensure data is an array
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <NavigationProvider categories={props.categories}>
            <SEO
                title="Web3 Hackathons"
                description="Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3 ecosystem."
            />
            <TopnavLayout title="Hackathons around you !" hideNewsletter>
                <div
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', margin: '24px 0px' }}
                >
                    {data.map((item: HackathonProps, index) => (
                        <HackathonPanel
                            key={index}
                            Event={item.Event}
                            Link={item.Link}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            Geo={item.Geo}
                            Twitter={`https://twitter.com/${item.Twitter}`}
                            Chat={`https://t.me/${item.Chat}`}
                            className='hackathon'
                        />
                    ))}
                </div>
            </TopnavLayout>
        </NavigationProvider>
    );
}
