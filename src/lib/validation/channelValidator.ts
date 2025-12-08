import { ChannelPayload, Provider, ValidationError } from '@/types/channel';

export function validateChannelPayload(payload: any): ValidationError[] {
    const errors: ValidationError[] = [];

    // Parse JSON if string
    let data: any;
    try {
        data = typeof payload === 'string' ? JSON.parse(payload) : payload;
    } catch (e) {
        errors.push({ field: 'json', message: 'Invalid JSON format' });
        return errors;
    }

    // Required fields
    if (!data.channel_id || typeof data.channel_id !== 'string') {
        errors.push({ field: 'channel_id', message: 'channel_id is required (string)' });
    }

    if (!data.name || typeof data.name !== 'string') {
        errors.push({ field: 'name', message: 'name is required (string)' });
    }

    if (!data.provider || !['google', 'slack', 'teams'].includes(data.provider)) {
        errors.push({ field: 'provider', message: 'provider must be one of: google, slack, teams' });
    }

    if (!data.routes || typeof data.routes !== 'object') {
        errors.push({ field: 'routes', message: 'routes object is required' });
        return errors;
    }

    if (!data.routes.to || !['google', 'slack', 'teams'].includes(data.routes.to)) {
        errors.push({ field: 'routes.to', message: 'routes.to must be one of: google, slack, teams' });
    }

    if (!data.routes.provider || !['google', 'slack', 'teams'].includes(data.routes.provider)) {
        errors.push({ field: 'routes.provider', message: 'routes.provider must be one of: google, slack, teams' });
    }

    // Provider-specific validation
    const provider = data.provider as Provider;

    if (provider === 'google') {
        if (!data.outgoing_space || typeof data.outgoing_space !== 'string') {
            errors.push({ field: 'outgoing_space', message: 'outgoing_space is required for provider=google' });
        }
    }

    if (provider === 'slack') {
        // team_id and slack_signing_secret are optional but validate types if provided
        if (data.team_id && typeof data.team_id !== 'string') {
            errors.push({ field: 'team_id', message: 'team_id must be a string' });
        }
        if (data.slack_signing_secret && typeof data.slack_signing_secret !== 'string') {
            errors.push({ field: 'slack_signing_secret', message: 'slack_signing_secret must be a string' });
        }
    }

    if (provider === 'teams') {
        if (!data.graph_channel_id || typeof data.graph_channel_id !== 'string') {
            errors.push({ field: 'graph_channel_id', message: 'graph_channel_id is required for provider=teams' });
        }
    }

    // Route destination validation
    const destination = data.routes.to as Provider;

    if (destination === 'google') {
        if (!data.routes.outgoing_space || typeof data.routes.outgoing_space !== 'string') {
            errors.push({ field: 'routes.outgoing_space', message: 'routes.outgoing_space is required when routes.to=google' });
        }
    }

    if (destination === 'slack') {
        if (!data.routes.channel_id || typeof data.routes.channel_id !== 'string') {
            errors.push({ field: 'routes.channel_id', message: 'routes.channel_id is required when routes.to=slack' });
        }
    }

    if (destination === 'teams') {
        if (!data.routes.graph_channel_id || typeof data.routes.graph_channel_id !== 'string') {
            errors.push({ field: 'routes.graph_channel_id', message: 'routes.graph_channel_id is required when routes.to=teams' });
        }
    }

    return errors;
}

export function isValidChannelPayload(payload: any): boolean {
    return validateChannelPayload(payload).length === 0;
}
