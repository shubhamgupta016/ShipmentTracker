import pool from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    let response = await request.json();
    if(!response.customername || !response.destinationaddress || !response.shipmentstatus || !response.assigneddriverid || !response.planneddeliverydate){
        return NextResponse.json({result:"All Fields Not Found"},{status:400})
    }
    try{
        const client = await pool.connect();
        const value = [response.customername,response.destinationaddress,response.shipmentstatus,response.assigneddriverid,response.planneddeliverydate,response.actualdeliverydate];
        const query = `Insert INTO Shipments(customername,destinationaddress,shipmentstatus,assigneddriverid,planneddeliverydate,actualdeliverydate) values ('${value[0]}' ,'${value[1]}' ,'${value[2]}' ,${value[3]} ,'${value[4]}',${value[5]})`
        
        const result  = await client.query(query);
        const query1 = `select * from Shipments where customername = '${value[0]}' and destinationaddress = '${value[1]}' and assigneddriverid = '${value[3]}' and planneddeliverydate = '${value[4]}'`
        const result2  = await client.query(query1);
        if (result.rowCount) {
            return NextResponse.json(
              {
                data:  {shipmentid:result2.rows[0]['shipmentid']},
                result: "Shipment made Successfully",
                success: true,
                },
              {status: 201,}
        );
            }else {
            return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
          }
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
    }
}