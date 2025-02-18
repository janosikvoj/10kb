import { deleteProject } from '@/actions/deleteProject';
import { ActionState } from '@/types/ActionState';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const result: ActionState = await deleteProject({ id });

    if (result && result.status === 'error') {
      return NextResponse.json({ message: result.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { message: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
