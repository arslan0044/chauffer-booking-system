import { connect } from "../../../dbConfig/dbConfig";
import Service from "../../../models/fleetModel";

connect();
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await Service.find();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { doors, model, price, seats, type, img } = data;
    console.log(data);

    const newService = new Service({
      doors,
      model,
      price,
      seats,
      type,
      img,
    });
    const savedService = await newService.save();
    console.log(savedService);

    return NextResponse.json({
      message: "Service created successfully",
      success: true,
      savedService,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
