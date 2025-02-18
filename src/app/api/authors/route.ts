import { deleteAuthor } from '@/actions/deleteAuthor';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'Invalid author ID' },
        { status: 400 }
      );
    }

    const result = await deleteAuthor({ id });

    if (result && result.status === 'error') {
      return NextResponse.json({ message: result.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Author deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting author:', error);
    return NextResponse.json(
      { message: 'Failed to delete author' },
      { status: 500 }
    );
  }
}
