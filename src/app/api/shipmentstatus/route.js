import pool from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    let response = await request.json();
    if(!response.inputValue){
        return NextResponse.json({result:"All Fields Not Found"},{status:400})
    }
    try{
        const value = [response.inputValue];
        const query = "select * from shipments where shipmentid=$1";
        const client = await pool.connect();
        const result  = await client.query(query,value);
        
        if (result.rows.length >= 1) {
            return NextResponse.json(
              {
                data: {shipmentid:result.rows[0]['shipmentid'],customername:result.rows[0]['customername'],destinationaddress:result.rows[0]['destinationaddress'],shipmentstatus:result.rows[0]['shipmentstatus'],planneddeliverydate:result.rows[0]['planneddeliverydate'],actualdeliverydate:result.rows[0]['actualdeliverydate']},
                result: "data fetch successfully",
                success: true
                },
              {status: 201}
        );
            }else {
            return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
          }
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
    }
}