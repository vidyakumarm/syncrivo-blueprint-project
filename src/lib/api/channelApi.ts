import { ChannelPayload } from '@/types/channel';

const CF_BASE = 'https://asia-south1-testing-474706.cloudfunctions.net';

export async function createChannel(payload: ChannelPayload) {
    const res = await fetch(`${CF_BASE}/create-channel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Create failed with status ${res.status}`);
    }

    return res.json().catch(() => null);
}

export async function updateChannel(payload: ChannelPayload) {
    const res = await fetch(`${CF_BASE}/update-channel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Update failed with status ${res.status}`);
    }

    return res.json().catch(() => null);
}
