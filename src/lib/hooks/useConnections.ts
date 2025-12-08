import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Connection, ConnectionFilters } from '@/types/connection';
import { connectionsApi } from '@/lib/api/connections';
import { useToast } from '@/hooks/use-toast';

export function useConnections(filters?: ConnectionFilters) {
    return useQuery({
        queryKey: ['connections', filters],
        queryFn: () => connectionsApi.getConnections(filters),
    });
}

export function useCreateConnection() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (connection: Omit<Connection, '_id'>) =>
            connectionsApi.createConnection(connection),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['connections'] });
            toast({
                title: 'Connection created',
                description: 'The connection has been successfully created.',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to create connection',
                variant: 'destructive',
            });
        },
    });
}

export function useUpdateConnection() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Connection> }) =>
            connectionsApi.updateConnection(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['connections'] });
            toast({
                title: 'Connection updated',
                description: 'The connection has been successfully updated.',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to update connection',
                variant: 'destructive',
            });
        },
    });
}

export function useDeleteConnection() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (id: string) => connectionsApi.deleteConnection(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['connections'] });
            toast({
                title: 'Connection deleted',
                description: 'The connection has been successfully deleted.',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to delete connection',
                variant: 'destructive',
            });
        },
    });
}
