import { NextResponse } from 'next/server'
import { boardService } from '@kanban/services'
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return new NextResponse("No autorizado", { status: 401 });
  }
  const boards = await boardService.getAll(userId)
  return NextResponse.json(boards)
}

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) {
    return new NextResponse("No autorizado", { status: 401 });
  }
  const body = await request.json()
  const { name, description } = body

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const newBoard = await boardService.create(name, userId, description)

  return NextResponse.json(newBoard, { status: 201 })
} 
