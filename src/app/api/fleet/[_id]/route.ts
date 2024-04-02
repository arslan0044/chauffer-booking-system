import { connect } from "../../../../dbConfig/dbConfig";
import Service from "../../../../models/fleetModel";

connect();
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: String }
) {
  try {
    const data = await Service.findOne({ _id: params });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: String }
) {
  try {
    const service = await Service.findOne({ _id: params });

    if (!service) {
      throw new Error("Service not found");
    }
    const data = await request.json();
    console.log(data);
    const updateService = await service.updateOne(data);

    return NextResponse.json({
      message: "Service Update successfully",
      success: true,
      updateService,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: String }
) {
  try {
    const service = await Service.findOne({ _id: params });
    if (!service) {
      throw new Error("Service not found");
    }
    const deleteService = await service.deleteOne();
    return NextResponse.json({
      message: "Service delete successfully",
      success: true,
      deleteService,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
