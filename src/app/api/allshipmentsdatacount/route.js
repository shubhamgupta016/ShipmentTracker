import pool from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    let response = await request.json();
    if(!response){
        return NextResponse.json({result:"All Fields Not Found"},{status:400})
    }
    try{
        // const value = [response];
        const pending = `select count(*) from shipments where shipmentstatus = 'pending'`;
        const pendingclient = await pool.connect();
        const pendingresult  = await pendingclient.query(pending);
        const intransit = `select count(*) from shipments where shipmentstatus = 'in-transit'`;
        const intransitclient = await pool.connect();
        const intransitresult  = await intransitclient.query(intransit);
        const delivered = `select count(*) from shipments where shipmentstatus = 'delivered'`;
        const deliveredclient = await pool.connect();
        const deliveredresult  = await deliveredclient.query(delivered);
        if (pendingresult.rows.length >= 1 && intransitresult.rows.length >= 1 && deliveredresult.rows.length >= 1) {
            return NextResponse.json(
              {
                data: {pending:pendingresult.rows[0]['count'], intransit:intransitresult.rows[0]['count'], delivered:deliveredresult.rows[0]['count']},
                result: "All data fetch Successfully",
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