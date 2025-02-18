'use client';

import React, { useEffect, useTransition, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DeleteProjectButton = ({ projectId }: { projectId: number }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Failure',
        description: error,
        variant: 'destructive',
      });
      setError(null);
    }
    if (success) {
      toast({
        title: 'Success',
        description: success,
      });
      setSuccess(null);
      router.refresh();
    }
  }, [error, success, router]);

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/projects`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: projectId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to delete project');
        } else {
          setSuccess('Project deleted successfully');
        }
      } catch (e) {
        setError((e as Error).message || 'Failed to delete project');
      }
    });
  };

  return (
    <Button
      variant="ghost"
      className="text-error hover:bg-error"
      onClick={onDelete}
      disabled={isPending}
    >
      {isPending ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
      Delete
    </Button>
  );
};

export default DeleteProjectButton;
