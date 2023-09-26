import pool from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    let response = await request.json();
    
    try{
        const client = await pool.connect();
        const value = [response.shipmentid,response.customername,response.customeraddress,response.shipmentstatus,response.assigneddriverid,response.planneddeliverydate,response.actualdeliverydate];
        if(response.customername == ''){
            response.customername = null;
        }
        if(response.customeraddress == ''){
            response.customeraddress = null;
        }
        if(response.shipmentstatus == ''){
            response.shipmentstatus = null;
        }
        if(response.assigneddriverid == ''){
            response.assigneddriverid = 0;
        }
        if(response.planneddeliverydate == ''){
            response.planneddeliverydate = null;
        }
        if(response.actualdeliverydate == '' || response.actualdeliverydate == null){
            // response.actualdeliverydate = null;
            const query = `UPDATE shipments set customername = '${value[1]}', destinationaddress = '${value[2]}', shipmentstatus = '${value[3]}', assigneddriverid = ${value[4]}, planneddeliverydate = '${value[5]}' where shipmentid = '${response.shipmentid}'`
            const result  = await client.query(query);
            if (result.rowCount) {
                return NextResponse.json(
                  {
                    data:  result.rows,
                    result: "Shipment update Successfully",
                    success: true,
                    },
                  {status: 201,}
            );
                }else {
                return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
              }
        }else{
            const query = `UPDATE shipments set customername = '${value[1]}', destinationaddress = '${value[2]}', shipmentstatus = '${value[3]}', assigneddriverid = ${value[4]}, planneddeliverydate = '${value[5]}', actualdeliverydate = '${value[6]}' where shipmentid = '${response.shipmentid}'`
            const result  = await client.query(query);
            if (result.rowCount) {
                return NextResponse.json(
                  {
                    data:  result.rows,
                    result: "Shipment update Successfully",
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