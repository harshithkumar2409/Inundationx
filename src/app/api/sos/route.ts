import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const requests = await prisma.sOSRequest.findMany({
    include: { district: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(requests);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sos = await prisma.sOSRequest.create({
    data: {
      name: body.name,
      phone: body.phone,
      districtId: parseInt(body.districtId),
      latitude: body.latitude || 0,
      longitude: body.longitude || 0,
      address: body.address,
      severity: body.severity,
      peopleCount: parseInt(body.peopleCount) || 1,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(sos, { status: 201 });
}
