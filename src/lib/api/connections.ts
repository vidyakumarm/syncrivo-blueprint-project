import { Connection, ConnectionFilters } from '@/types/connection';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const connectionsApi = {
    // GET /api/connections
    async getConnections(filters?: ConnectionFilters): Promise<Connection[]> {
        const params = new URLSearchParams();
        if (filters?.sourceProvider) params.append('sourceProvider', filters.sourceProvider);
        if (filters?.targetProvider) params.append('targetProvider', filters.targetProvider);
        if (filters?.search) params.append('search', filters.search);

        const response = await fetch(`${API_BASE_URL}/api/connections?${params}`);
        if (!response.ok) throw new Error('Failed to fetch connections');
        return response.json();
    },

    // POST /api/connections
    async createConnection(connection: Omit<Connection, '_id'>): Promise<Connection> {
        const response = await fetch(`${API_BASE_URL}/api/connections`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(connection),
        });
        if (!response.ok) throw new Error('Failed to create connection');
        return response.json();
    },

    // PUT /api/connections/:id
    async updateConnection(id: string, connection: Partial<Connection>): Promise<Connection> {
        const response = await fetch(`${API_BASE_URL}/api/connections/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(connection),
        });
        if (!response.ok) throw new Error('Failed to update connection');
        return response.json();
    },

    // DELETE /api/connections/:id
    async deleteConnection(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/connections/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete connection');
    },
};
