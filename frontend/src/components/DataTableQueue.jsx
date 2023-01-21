import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

// firebase imports
import { db } from "../firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";

const columns = [
  { field: "id", headerName: "ID", flex: 0.1 },
  {
    field: "address",
    headerName: "Address",
    type: "string",
    width: 400,
  },
  {
    field: "timestamp",
    headerName: "Last Seen",
    flex: 1,
  },
];

export default function DataTableQueue() {
  const [row, setRow] = useState([]);
  const addressCollectionRef = collection(db, "addresses");

  useEffect(() => {
    const getAddresses = async () => {
      //console.log(data);
      let addrs = [];
      const querySnapshot = await getDocs(addressCollectionRef);
      querySnapshot.forEach((address) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        addrs.push({ ...address.data(), id: address.id });
      });
      console.log("addrs:", addrs);
      setRow(addrs);
    };
    getAddresses();
  }, []);

  // const uniqueNames = Array.from(new Set(row));
  // setRow(uniqueNames);

  return (
    <div style={{ height: 400, width: "100%", marginBottom: "10px" }}>
      <DataGrid
        getRowId={(row) => Math.floor(Math.random() * 100000000)}
        rows={row}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
