import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const reports = await prisma.citizenReport.findMany({
    include: { district: true },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
  return NextResponse.json(reports);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const report = await prisma.citizenReport.create({
    data: {
      name: body.name,
      phone: body.phone,
      districtId: parseInt(body.districtId),
      latitude: body.latitude || 0,
      longitude: body.longitude || 0,
      address: body.address,
      floodSeverity: body.floodSeverity,
      waterLevel: body.waterLevel ? parseFloat(body.waterLevel) : null,
      description: body.description,
    },
  });
  return NextResponse.json(report, { status: 201 });
}
