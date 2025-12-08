import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://kumar:Kumar2992@chatapp.3he0vbd.mongodb.net/chat_app?retryWrites=true&w=majority';
let db;

async function connectToDatabase() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('chat_app'); // Updated database name
    console.log('Connected to MongoDB database: chat_app');

    // Create indexes
    await db.collection('channels').createIndex({ channel_id: 1 });
    await db.collection('channels').createIndex({ 'routes.graph_channel_id': 1 });
    await db.collection('channels').createIndex({ provider: 1 });
    await db.collection('channels').createIndex({ 'routes.provider': 1 });
    console.log('Indexes created for channels collection');
}

// GET /api/connections
app.get('/api/connections', async (req, res) => {
    try {
        const { sourceProvider, targetProvider, search } = req.query;

        let query = {};

        if (sourceProvider) {
            query.provider = sourceProvider;
        }

        if (targetProvider) {
            query['routes.provider'] = targetProvider;
        }

        if (search) {
            query.$or = [
                { channel_id: { $regex: search, $options: 'i' } },
                { outgoing_space: { $regex: search, $options: 'i' } },
                { graph_channel_id: { $regex: search, $options: 'i' } },
                { 'routes.channel_id': { $regex: search, $options: 'i' } },
                { 'routes.outgoing_space': { $regex: search, $options: 'i' } },
                { 'routes.graph_channel_id': { $regex: search, $options: 'i' } },
            ];
        }

        const connections = await db.collection('channels').find(query).toArray();
        res.json(connections);
    } catch (error) {
        console.error('Error fetching connections:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch connections' });
    }
});

// POST /api/connections
app.post('/api/connections', async (req, res) => {
    try {
        const connection = req.body;

        // Validation
        if (!connection.provider) {
            return res.status(400).json({ success: false, error: 'Missing required field: provider' });
        }

        if (!connection.channel_id) {
            return res.status(400).json({ success: false, error: 'Missing required field: channel_id' });
        }

        if (!connection.routes || !connection.routes.provider || !connection.routes.to) {
            return res.status(400).json({ success: false, error: 'Missing required field: routes with provider and to' });
        }

        // Provider-specific validation
        if (connection.provider === 'google' && !connection.outgoing_space) {
            return res.status(400).json({ success: false, error: 'Google connections require outgoing_space' });
        }

        if (connection.provider === 'slack' && !connection.team_id) {
            return res.status(400).json({ success: false, error: 'Slack connections require team_id' });
        }

        if (connection.provider === 'teams' && !connection.graph_channel_id) {
            return res.status(400).json({ success: false, error: 'Teams connections require graph_channel_id' });
        }

        // Route-specific validation
        if (connection.routes.provider === 'teams' && !connection.routes.graph_channel_id) {
            return res.status(400).json({ success: false, error: 'Teams routes require graph_channel_id' });
        }

        if (connection.routes.provider === 'google' && !connection.routes.outgoing_space) {
            return res.status(400).json({ success: false, error: 'Google routes require outgoing_space' });
        }

        if (connection.routes.provider === 'slack' && !connection.routes.channel_id) {
            return res.status(400).json({ success: false, error: 'Slack routes require channel_id' });
        }

        const result = await db.collection('channels').insertOne({
            ...connection,
            created_at: new Date(),
            updated_at: new Date(),
        });

        const newConnection = await db.collection('channels').findOne({ _id: result.insertedId });
        res.status(201).json({
            success: true,
            message: 'Connection created successfully',
            data: newConnection
        });
    } catch (error) {
        console.error('Error creating connection:', error);
        res.status(500).json({ success: false, error: error.message || 'Failed to create connection' });
    }
});

// PUT /api/connections/:id
app.put('/api/connections/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        delete updates._id; // Prevent _id modification

        const result = await db.collection('channels').findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    ...updates,
                    updated_at: new Date(),
                },
            },
            { returnDocument: 'after' }
        );

        if (!result.value) {
            return res.status(404).json({ success: false, error: 'Connection not found' });
        }

        res.json({ success: true, message: 'Connection updated successfully', data: result.value });
    } catch (error) {
        console.error('Error updating connection:', error);
        res.status(500).json({ success: false, error: 'Failed to update connection' });
    }
});

// DELETE /api/connections/:id
app.delete('/api/connections/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.collection('channels').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, error: 'Connection not found' });
        }

        res.json({ success: true, message: 'Connection deleted successfully' });
    } catch (error) {
        console.error('Error deleting connection:', error);
        res.status(500).json({ success: false, error: 'Failed to delete connection' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', database: 'chat_app', collection: 'channels' });
});

// Start server
connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`API server running on http://localhost:${PORT}`);
            console.log(`Using MongoDB: chat_app.channels collection`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    });
