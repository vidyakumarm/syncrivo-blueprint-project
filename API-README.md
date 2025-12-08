# SyncRivo Connections API Server

Backend API for managing cross-platform channel connections in the SyncRivo dashboard.

## Database Configuration

- **Database**: `chat_app`
- **Collection**: `channels`
- **MongoDB URI**: Configured in api-server.js

## Installation

```bash
npm install express cors mongodb
```

## Running the Server

```bash
node api-server.js
```

The server will start on `http://localhost:3001`

## API Endpoints

### GET /api/connections
Retrieve all connections with optional filtering.

**Query Parameters:**
- `sourceProvider` (optional): Filter by source platform (google|teams|slack)
- `targetProvider` (optional): Filter by target platform (google|teams|slack)
- `search` (optional): Search across channel IDs

**Response:**
```json
[
  {
    "_id": "...",
    "provider": "google",
    "channel_id": "AAQAWWyiEBo",
    "outgoing_space": "spaces/AAQAWWyiEBo",
    "routes": {
      "to": "teams",
      "provider": "teams",
      "graph_channel_id": "19:F8MV8qb..."
    },
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST /api/connections
Create a new connection.

**Request Body:**
```json
{
  "provider": "google",
  "channel_id": "AAQAWWyiEBo",
  "outgoing_space": "spaces/AAQAWWyiEBo",
  "routes": {
    "to": "teams",
    "provider": "teams",
    "graph_channel_id": "19:F8MV8qb..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Connection created successfully",
  "data": { ... }
}
```

### PUT /api/connections/:id
Update an existing connection.

**Request Body:** Partial connection object

**Response:**
```json
{
  "success": true,
  "message": "Connection updated successfully",
  "data": { ... }
}
```

### DELETE /api/connections/:id
Delete a connection.

**Response:**
```json
{
  "success": true,
  "message": "Connection deleted successfully"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "database": "chat_app",
  "collection": "channels"
}
```

## MongoDB Indexes

The following indexes are created automatically on startup:
- `{ channel_id: 1 }`
- `{ 'routes.graph_channel_id': 1 }`
- `{ provider: 1 }`
- `{ 'routes.provider': 1 }`

## Validation Rules

### Google Connections
- Required: `provider`, `channel_id`, `outgoing_space`

### Slack Connections
- Required: `provider`, `channel_id`, `team_id`

### Teams Connections
- Required: `provider`, `channel_id`, `graph_channel_id`

### Routes
- Always required: `provider`, `to`
- Teams routes require: `graph_channel_id`
- Google routes require: `outgoing_space`
- Slack routes require: `channel_id`

## Error Responses

All errors follow the format:
```json
{
  "success": false,
  "error": "Error message description"
}
```

## Production Deployment

1. Set environment variable: `PORT` (default: 3001)
2. Ensure MongoDB connection string is updated
3. Deploy to Node.js hosting (Heroku, Railway, DigitalOcean, etc.)
4. Update frontend `VITE_API_URL` to point to deployed API

## Development

For development with auto-reload:
```bash
npm install -g nodemon
nodemon api-server.js
```
