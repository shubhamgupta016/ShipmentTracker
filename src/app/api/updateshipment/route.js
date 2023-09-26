import pool from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    let response = await request.json();
    if(!response.shipmentid || !response.shipmentstatus){
        return NextResponse.json({result:"All Fields Not Found"},{status:400})
    }
    try{
        const client = await pool.connect();
        const value = [response.shipmentid,response.shipmentstatus];
        if(response.shipmentstatus == 'delivered'){
            const query = `UPDATE shipments set shipmentstatus = '${value[1]}', actualdeliverydate = CURRENT_TIMESTAMP where shipmentid = '${response.shipmentid}'`
            const result  = await client.query(query);
            if (result.rowCount) {
                return NextResponse.json(
                  {
                    data:  result.rows,
                    result: "Shipment made Successfully",
                    success: true,
                    },
                  {status: 201,}
            );
                }else {
                return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
              }
        }else{
            const query = `UPDATE shipments set shipmentstatus = '${value[1]}' where shipmentid = '${response.shipmentid}'`
            const result  = await client.query(query);
            if (result.rowCount) {
                return NextResponse.json(
                  {
                    data:  result.rows,
                    result: "Shipment made Successfully",
                    success: true,
                    },
                  {status: 201,}
            );
                }else {
                return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
              }
        }
        
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
    }
}