/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSpotifyToken } from "@/lib/spotify";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

function shuffle(array: any[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

async function getSpotifyLinks(url: string) {
    try {
        const response = await axios.get(url);

        const html = response.data;

        const $ = cheerio.load(html);

        const scdnLinks = new Set();

        $("*").each((i, element) => {
            //@ts-expect-error attribs exists
            const attrs = element.attribs;

            Object.values(attrs).forEach((value) => {
                //@ts-expect-error attribs exists
                if (value && value.includes("p.scdn.co")) {
                    scdnLinks.add(value);
                }
            });
        });

        return Array.from(scdnLinks);
    } catch (error) {
        //@ts-expect-error attribs exists
        throw new Error(`Failed to fetch preview URLs: ${error?.message}`);
    }
}

export async function GET() {
    const token = await getSpotifyToken();

    const playlistId = "20l3OgFG1YyWC2AxYmIkYQ";

    const randomOffset = Math.floor(Math.random() * 800);
    const playlistRes = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50&offset=${randomOffset}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    const data = await playlistRes.json();
    shuffle(data.items);

    const tracks = (
        await Promise.all(
            data.items.slice(0, 80).map(async (i: any) => ({
                id: i.track.id,
                name: i.track.name,
                artist: i.track.artists[0].name,
                release_date: i.track.album.release_date,
                preview_url: (await getSpotifyLinks(i.track.external_urls.spotify))[0],
            })),
        )
    ).filter((i: any) => i.preview_url !== undefined);

    return NextResponse.json(tracks);
}
