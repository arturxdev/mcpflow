import { NextResponse } from 'next/server'
import { boardService } from '@repo/core'
import { auth } from '@clerk/nextjs/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ boardId: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return new NextResponse("No autorizado", { status: 401 });
  }
  const { boardId } = await params
  const board = boardService.getById(boardId)

  if (!board) {
    return NextResponse.json({ error: 'Board not found' }, { status: 404 })
  }

  return NextResponse.json(board)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ boardId: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return new NextResponse("No autorizado", { status: 401 });
  }
  const { boardId } = await params
  const board = boardService.getById(boardId)

  if (!board) {
    return NextResponse.json({ error: 'Board not found' }, { status: 404 })
  }

  // Remove board and its tasks
  boardService.delete(boardId)

  return NextResponse.json({ success: true })
}
